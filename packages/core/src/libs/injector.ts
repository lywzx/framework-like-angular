import {InjectFactoryInterface} from "../interfaces";
import {InjectValueInterface} from "../interfaces";
import {InjectUseClassInterface} from "../interfaces";
import {Constructor} from "../types";
import {CircleDependenceException, NotInjectableException} from "../exceptions";
import {INJECTABLE, injectKey} from "../decorator";
import {FactoryFunctionInjectInterface} from "../interfaces/factory-function-inject.interfact";
import { keyBy} from 'lodash';


type IInjectorMapValue = InjectFactoryInterface<any> |InjectValueInterface<any>| InjectUseClassInterface<any> | ObjectConstructor;

export class Injector {

  /**
   * 需要注入的配置信息
   */
  protected readonly injectMap: Map<string | Symbol | Object, IInjectorMapValue> = new Map();

  /**
   * 实例化之后，开成单例模式的内容
   */
  protected readonly instanceMap: Map<string | Symbol | Object, any> = new Map<string|Symbol|Object, any>();

  constructor() {}

  public get(token: any): any {
    return this.factory(token);
  }

  /**
   * 单例缓存
   * @param realTarget
   * @param fn
   */
  protected cachedFactory(realTarget: any, fn: Function) {
    const instance = this.instanceMap.get(realTarget);
    if (instance) {
      return instance;
    }
    let getInstance = fn();
    this.instanceMap.set(realTarget, getInstance);
    return getInstance;
  }

  protected getNeedInjectParams<T>(target: Constructor<T> | InjectFactoryInterface<T>): Array<IInjectorMapValue> {
    if ('factory' in target) {
      if (target.inject) {
        return target.inject.map((item) => {
          if (typeof item === 'string' || typeof item === 'symbol') {
            return this.getValueFromMappingWithException(item);
          }
          return item as ObjectConstructor;
        });
      } else {
        return [];
      }
    }

    const inject = Reflect.getMetadata('design:paramtypes', target) || [];
    if (!inject.length) {
      return [];
    }
    const paramInject = keyBy(Reflect.getMetadata(injectKey, target) || [], 'index');

    return inject.map((value: any, index: number) => {
      if (paramInject && paramInject[index]) {

        // 可能直接传入了构造函数
        const use = paramInject[index].use;

        if (typeof use === 'function') {
          return use;
        }

        const injectMapping = this.injectMap.get(use);
        if (injectMapping) {
          return {
            __inject: true,
            use: injectMapping
          }
        } else {
          throw new NotInjectableException(paramInject[index].use);
        }
      }
      return value;
    });
  }

  private getValueFromMappingWithException(key: string | symbol | ObjectConstructor ): IInjectorMapValue {
    const injectMapping = this.injectMap.get(key);
    if (injectMapping) {
      return injectMapping;
    } else if (Reflect.getMetadata(INJECTABLE, key)) {
      return key as ObjectConstructor;
    } else {
      throw new NotInjectableException(key.toString());
    }
  }



  protected factory<T>(target: Constructor<T> | FactoryFunctionInjectInterface<T>, reference?: Constructor<T> | FactoryFunctionInjectInterface<T>, deps: any[] = []): T {
      let realTarget: Constructor<T> | InjectFactoryInterface<T> | undefined;

      if ((target as FactoryFunctionInjectInterface<T>).__inject) {
        const use = (target as FactoryFunctionInjectInterface<T>).use;

        if ( 'useValue' in use) {
          return use.useValue as T;
        }

        if ('factory' in use) {
          realTarget = use;
        }

        if ('useClass' in use) {
          realTarget = use.useClass;
        }
      }
      if (realTarget === undefined) {
        realTarget = target as Constructor<T>;
      }

      return this.cachedFactory(realTarget, () => {
        const innerTarget = realTarget as Constructor<T> | InjectFactoryInterface<T>;
        if (deps.includes(target)) {
          let targetName = '';
          if ('name' in target) {
            targetName = target.name;
          }
          throw new CircleDependenceException(targetName || target.toString(), deps[deps.length - 1]);
        }

        if (!('factory' in innerTarget) && !Reflect.getMetadata(INJECTABLE, innerTarget)) {
          let referenceMessage = undefined;
          if (reference) {
            if ('__inject' in target) {
              referenceMessage = 'variable';
            } else if ('name' in reference) {
              referenceMessage = reference.name;
            }
          }
          throw new NotInjectableException(innerTarget.name, referenceMessage);
        }

        // 获取target类的构造函数参数providers
        const providers = this.getNeedInjectParams(innerTarget);

        if (!providers.length) {
          let targetResult;
          if ('factory' in innerTarget) {
            targetResult = innerTarget.factory();
          } else {
            targetResult = Reflect.construct(innerTarget, []);
          }
          return targetResult;
        }

        // 将参数依次实例化
        const args = providers.map((provider) => {
          return this.get(provider);
        });

        // 将实例化的数组作为target类的参数，并返回target的实例
        let targetResult;
        if ('factory' in innerTarget ) {
          targetResult = innerTarget.factory(...args);
        } else {
          targetResult = Reflect.construct(innerTarget, args);
        }
        return targetResult;
      });

  }


  public provide(...providers: IInjectorMapValue[]): void {
    providers.forEach((provider) => {
      if ('token' in provider) {
        this.injectMap.set(provider.token, provider);
      } else {
        this.injectMap.set(provider, provider);
      }
    })
  }

}
