import { INJECTABLE_KEY } from '../constant';
import { InjectableInterface } from '../interfaces';

// eslint-disable-next-line no-unused-vars
export function Injectable<T>(options?: InjectableInterface): ClassDecorator {
  return function(target) {
    // 可以被注入
    Reflect.defineMetadata(INJECTABLE_KEY, true, target);
  };
}
