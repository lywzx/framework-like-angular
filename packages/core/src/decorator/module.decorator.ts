import { ModuleOptions } from '../interfaces';
import { MODULE_APP } from '../constant';
import { InnerModule } from '../libs/inner-module';

/**
 * 定议模块
 * @param options
 * @constructor
 */
export function Module(options?: ModuleOptions): ClassDecorator {
  return function (target) {
    // eslint-disable-next-line no-unused-vars
    Object.defineProperty(target, MODULE_APP, {
      enumerable: false,
      writable: false,
      value: new InnerModule(target as any, options),
    });

    return target;
  };
}
