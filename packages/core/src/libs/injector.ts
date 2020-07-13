import { INJECTABLE_KEY, INJECTOR_KEY, OPTIONAL_KEY } from '../constant';
import { IInjectorMapValue, InjectFactoryInterface, InjectParamsType, InjectToken, Type } from '../interfaces';
import { CircleDependenceException, NotInjectableException } from '../exceptions';
import { InjectReflectOptionalInterface, InjectReflectValueInterface } from '../decorator';
import { keyBy } from 'lodash';
import { getInjectName } from '../util';
import { getProviders } from '../util/tools';

export class Injector {
  /**
   * 需要注入的配置信息
   */
  protected readonly injectMap: Map<InjectToken, IInjectorMapValue<any>> = new Map();

  /**
   * 实例化之后，形成单例模式的内容
   */
  protected readonly instanceMap: Map<InjectToken, any> = new Map();

  /**
   * 获取某个实例
   * @param token
   */
  public get<T>(token: InjectToken<T>): T {
    const injectorKey = this.injectMap.get(token);
    if (!injectorKey) {
      throw new Error(`${getInjectName(token)} can not be inject!`);
    }
    return this.factory(injectorKey);
  }

  /**
   * 单例缓存
   * @param token
   * @param fn
   */
  protected cachedFactory<T>(token: InjectToken<T>, fn: () => T): T {
    const instance = this.instanceMap.get(token);
    if (instance) {
      return instance;
    }
    const getInstance = fn();
    this.instanceMap.set(token, getInstance);
    return getInstance;
  }

  /**
   *
   * @param target
   */
  protected getNeedInjectParams<T>(target: Type<T> | InjectFactoryInterface<T>): InjectParamsType<T>[] {
    if ('factory' in target) {
      return (target.inject || []).map((it) => {
        return {
          optional: false,
          dep: it,
        };
      });
    }

    const inject: Array<Type<T> | undefined> = Reflect.getMetadata('design:paramtypes', target) || [];
    if (!inject.length) {
      return [];
    }
    const paramInject: Record<string | number, InjectReflectValueInterface> = keyBy(
      Reflect.getMetadata(INJECTOR_KEY, target) || [],
      'index'
    );
    const optionInject: Record<string, InjectReflectOptionalInterface> = keyBy(
      Reflect.getMetadata(OPTIONAL_KEY, target) || [],
      'index'
    );

    return inject.map((value, index: number) => {
      const currentInjectAble = paramInject && paramInject[index.toString()];
      const currentInjectOptional = optionInject && optionInject[index.toString()];
      const result: InjectParamsType<T> = {
        dep: value,
        optional: false,
      };
      if (currentInjectAble) {
        // 可能直接传入了构造函数
        result.dep = currentInjectAble.use;
      }
      if (currentInjectOptional) {
        result.optional = true;
      }

      return result;
    });
  }

  /**
   *
   * @param key
   */
  private getValueFromMappingWithException(key: string | symbol | Type<any>): IInjectorMapValue<any> {
    const injectMapping = this.injectMap.get(key);
    if (injectMapping) {
      return injectMapping;
    } else if (Reflect.getMetadata(INJECTABLE_KEY, key)) {
      return key as Type<any>;
    } else {
      throw new NotInjectableException(key.toString());
    }
  }

  /**
   *
   * @param target
   * @param reference
   * @param deps
   */
  protected factory<T>(
    target: IInjectorMapValue<T>,
    reference?: Type<T> | InjectFactoryInterface<T>,
    deps: any[] = []
  ): T {
    const token = 'token' in target ? target.token : target;
    let realTarget: Type<T> | InjectFactoryInterface<T> | undefined;
    let isFactory = false;

    if ('token' in target) {
      if ('useValue' in target) {
        return this.cachedFactory(target.token, () => target.useValue);
      }
      if ('useClass' in target) {
        realTarget = target.useClass;
      }
      if ('factory' in target) {
        realTarget = target;
        isFactory = true;
      }
    }
    if (realTarget === undefined) {
      realTarget = target as Type<T>;
    }

    return this.cachedFactory(token, () => {
      const innerTarget = realTarget as Type<T> | InjectFactoryInterface<T>;

      if (!isFactory && !Reflect.getMetadata(INJECTABLE_KEY, innerTarget)) {
        let referenceMessage = undefined;
        if (reference) {
          if ('__inject' in target) {
            referenceMessage = 'variable';
          } else if ('name' in reference) {
            referenceMessage = reference.name;
          }
        }
        throw new NotInjectableException(getInjectName(target), referenceMessage);
      }

      // 获取target类的构造函数参数providers
      const providers = this.getNeedInjectParams(innerTarget) || [];

      /*if (!providers.length) {
        let targetResult;
        if ('factory' in innerTarget) {
          targetResult = innerTarget.factory();
        } else {
          targetResult = Reflect.construct(innerTarget, []);
        }
        return targetResult;
      }*/

      // 将参数依次实例化
      const args = providers.map((provider, index) => {
        const { dep, optional } = provider;
        const realDep = dep ? this.injectMap.get(dep) : undefined;
        if (!realDep) {
          if (optional) {
            return undefined;
          }
          throw new Error(
            `${getInjectName(innerTarget)} can not inject ${index}: undefined, you can use @Optional to prevent error`
          );
        }

        // circle deps test
        if (deps.includes(realDep)) {
          if (optional) {
            return undefined;
          } else {
            throw new CircleDependenceException(getInjectName(innerTarget), getInjectName(realDep));
          }
        }

        return this.factory(realDep, realTarget, [...deps, realTarget]);
      });

      // 将实例化的数组作为target类的参数，并返回target的实例

      let targetResult;
      if ('factory' in innerTarget) {
        targetResult = innerTarget.factory(...args);
      } else {
        targetResult = Reflect.construct(innerTarget, args);
      }
      return targetResult;
    });
  }

  public provide(...providers: IInjectorMapValue<any>[]): void {
    getProviders(providers).forEach((provider) => {
      if ('token' in provider) {
        this.injectMap.set(provider.token, provider);
      } else {
        this.injectMap.set(provider, provider as IInjectorMapValue<any>);
      }
    });
  }

  /**
   * 注册 provider
   * @param providers
   */
  public static create(providers: IInjectorMapValue<any>[]): Injector {
    const injector = new Injector();
    injector.provide(...providers);
    return injector;
  }
}
