import { REDUX_SERVICE } from './redux-service.decorator';
import { Injectable, Type } from '@framework-like-angular/core';

export const STATE_CONSTANT = Symbol('__state_constant__');

export function State(options: { stateName: string; defaultState: any }) {
  return function(target: Type<any>) {
    Injectable(target);
    Reflect.defineMetadata(REDUX_SERVICE, true, target);
    Reflect.defineMetadata(STATE_CONSTANT, options, target);
  };
}
