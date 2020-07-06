import 'reflect-metadata';
import { Constructor } from '../types';

export const injectKey = Symbol('inject:key');

export function Inject<T>(inject: string | Constructor<T> | symbol) {
  return function(target: T, name: string, index: number) {
    const old = Reflect.getMetadata(injectKey, target, name) || [];
    Reflect.defineMetadata(
      injectKey,
      [
        ...old,
        {
          use: inject,
          index,
        },
      ],
      target,
      name
    );
  };
}
