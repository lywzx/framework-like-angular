import { getProviders } from '../util/tools';
import extend from 'lodash/extend';
import map from 'lodash/map';
import { ModuleInterface, ModuleOptions, Type } from '../interfaces';
import { Injector, FactoryCore, BootstrapAdapter } from '../libs';
import { MODULE_REF, MODULE_INIT } from '../constant';

export class InnerModule implements ModuleInterface {
  public injector: Injector;

  public options?: ModuleOptions;

  constructor(protected target: Type<any>, options?: ModuleOptions) {
    const provider = getProviders(options && options.providers);
    provider.push({
      provide: MODULE_REF,
      useValue: this,
    });
    this.injector = Injector.create(provider);
    if (options) {
      this.options = extend({}, options, {
        imports: map(options.imports || [], (it) => {
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

    depsModules.forEach((depModule) => {
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
