import 'reflect-metadata';
import { Type } from '../interfaces';

export const INJECTABLEKEY = Symbol('INJECTABLE');

export function Injectable<T>(target: Type<T>) {
  Reflect.defineMetadata(INJECTABLEKEY, true, target);
}
