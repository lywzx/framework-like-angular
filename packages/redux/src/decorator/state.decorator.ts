import { REDUX_SERVICE } from './redux-service.decorator';
import { Injectable, JsCoreObject, Type } from '@framework-like-angular/core';

// 当前状态管理存储常量
export const STATE_CONSTANT = Symbol('__state_constant__');
// 当前状态注入的数据
export const STATE_INJECT = Symbol('__state_inject__');

export interface IStateInjectInterface {
  // 注入的变量名称
  name: string;
  // 引用的内容
  reference?: string | Type<any>;
}

export function State(options?: string): PropertyDecorator & ParameterDecorator;
export function State(options: { stateName: string; defaultState: any }): ClassDecorator;
export function State(
  options?: { stateName: string; defaultState: any } | string
): ClassDecorator & PropertyDecorator & ParameterDecorator {
  const InjectableCallback = Injectable();
  return function (target: JsCoreObject, name?: string | symbol, index?: number) {
    // 参数装饰器
    if (typeof target === 'object') {
      if (!(typeof options === 'undefined' || typeof options === 'string')) {
        throw new Error('');
      }
      InjectableCallback(target.constructor);
      Reflect.defineMetadata(REDUX_SERVICE, true, target.constructor);
      const oldStateInject: IStateInjectInterface[] = Reflect.getMetadata(STATE_INJECT, target.constructor) || [];
      Reflect.defineMetadata(
        STATE_INJECT,
        [
          ...oldStateInject,
          {
            name,
            reference: options,
          },
        ] as IStateInjectInterface[],
        target.constructor
      );
    }
    if (typeof target === 'function') {
      InjectableCallback(target);
      Reflect.defineMetadata(REDUX_SERVICE, true, target);
      Reflect.defineMetadata(STATE_CONSTANT, options, target);
    }
  };
}
