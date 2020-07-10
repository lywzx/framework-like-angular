import {
  BootstrapAdapter,
  FactoryCore,
  Injector,
  MODULE_INIT,
  MODULE_REF,
  ModuleOptionsInterface,
  Type,
} from '@framework-like-angular/core';
import { getProviders } from '../util/tools';
import { extend, map } from 'lodash';

export class InnerModule {
  public injector: Injector;

  public options?: ModuleOptionsInterface;

  constructor(protected target: Type<any>, options?: ModuleOptionsInterface) {
    const provider = getProviders(options && options.provider);
    provider.push({
      token: MODULE_REF,
      useValue: this,
    });
    this.injector = Injector.create(provider);
    if (options) {
      this.options = extend({}, options, {
        imports: map(options.imports || [], it => {
          if (it instanceof InnerModule) {
            return it;
          }
          return FactoryCore.create(it);
        }),
      });
    }
  }

  /**
   * 模块初始时调用代码
   */
  protected init<T extends BootstrapAdapter>(adapter?: Type<T>) {
    const depsModules = (this.options && this.options.imports) || [];

    depsModules.forEach(depModule => {
      depModule.bootstrap();
    });

    let appInitServices: Array<Type<any>> = [];
    try {
      appInitServices = this.get<Array<Type<any>>>(MODULE_INIT);
    } catch (e) {}

    if (adapter) {
      const adapterInstance = new adapter(this, this.target, this.options);
      adapterInstance.bootstrap();
    }

    for (let i = 0, j = appInitServices.length; i < j; i++) {
      const instance = this.get<{ onModuleInit?: () => void }>(appInitServices[i]);

      if (instance && typeof instance.onModuleInit === 'function') {
        instance.onModuleInit();
      }
    }
  }

  /**
   * 模块的启动
   * @param adapter
   */
  public bootstrap<T extends BootstrapAdapter>(adapter?: Type<T>) {
    this.init(adapter);
  }

  /**
   *
   * @param token
   */
  public get<T>(token: Type<T> | string | symbol) {
    let err;
    try {
      return this.injector.get(token);
    } catch (e) {
      err = e;
    }
    const depsModules = (this.options && this.options.imports) || [];

    for (let i = 0, j = depsModules.length; i < j; i++) {
      const currentModule = depsModules[i];
      try {
        return currentModule.get(token);
      } catch (e) {
        err = e;
      }
    }

    throw err;
  }
}
