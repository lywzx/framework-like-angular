import { ModuleOptionsInterface, Type } from '../interfaces';
import { Injector } from '../libs';
import { MODULE_INIT } from '../constant';

export function Module(options?: ModuleOptionsInterface) {
  return function(target: Type<any>) {
    // eslint-disable-next-line no-unused-vars
    return class InnerModule extends target {
      public injector: Injector;

      constructor(...args: any[]) {
        super(...args);
        this.injector = Injector.create((options && options.provider) || []);
      }

      /**
       * 模块初始时调用代码
       */
      init() {
        if (typeof super.init === 'function') {
          super.init();
        }
        try {
          const appInitService = this.injector.get<{ onModuleInit?: () => void }>(MODULE_INIT);
          if (typeof appInitService.onModuleInit === 'function') {
            appInitService.onModuleInit();
          }
        } catch (e) {
          throw e;
        }
      }
    };
  };
}
