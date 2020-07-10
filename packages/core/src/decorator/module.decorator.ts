import { ModuleOptionsInterface, Type } from '../interfaces';
import { InnerModule } from '../libs';
import { MODULE_APP } from '../constant';

export function Module(options?: ModuleOptionsInterface) {
  return function(target: Type<any> | any) {
    // eslint-disable-next-line no-unused-vars
    Object.defineProperty(target, MODULE_APP, {
      enumerable: false,
      writable: false,
      value: new InnerModule(target, options),
    });

    return target;
  };
}
