import { Type } from '@framework-like-angular/core';

export const REDUX_SERVICE = Symbol('__REDUX_SERVICE__');

/**
 *
 * @constructor
 */
export function ReduxService() {
  return function<T>(target: Type<T>) {
    Reflect.defineMetadata(REDUX_SERVICE, true, target);
  };
}
