import { ModuleOptionsInterface } from '../interfaces';
import { InnerModule } from '../libs';
import { MODULE_APP } from '../constant';

/**
 * 定议模块
 * @param options
 * @constructor
 */
export function Module(options?: ModuleOptionsInterface): ClassDecorator {
  return function(target) {
    // eslint-disable-next-line no-unused-vars
    Object.defineProperty(target, MODULE_APP, {
      enumerable: false,
      writable: false,
      value: new InnerModule(target as any, options),
    });

    return target;
  };
}
