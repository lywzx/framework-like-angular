import { InjectBaseInterface } from './inject-base.interface';
import { Type } from './type';

export interface InjectFactoryInterface<T> extends InjectBaseInterface {
  inject?: Array<string | symbol | Type<T>>;
  factory: (...args: any[]) => T;
}
