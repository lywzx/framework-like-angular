import { Type } from '@framework-like-angular/core';

export const REDUX_SERVICE = Symbol('__REDUX_SERVICE__');

export function ReduxService() {
  return function(target: Type<any>) {
    Reflect.defineMetadata(REDUX_SERVICE, true, target);
  };
}
