import { InjectBaseInterface } from './inject-base.interface';

export interface InjectFactoryInterface<T> extends InjectBaseInterface {
  inject?: Array<string | symbol | ObjectConstructor>;
  factory: (...args: any[]) => T;
}
