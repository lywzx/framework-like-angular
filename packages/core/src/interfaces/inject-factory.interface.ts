import { InjectBaseInterface } from './inject-base.interface';
import { InjectToken } from './type';

export interface InjectFactoryInterface<T> extends InjectBaseInterface {
  inject?: Array<InjectToken<T>>;
  factory: (...args: any[]) => T;
}
