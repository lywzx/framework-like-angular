import { InjectFactoryInterface } from './inject-factory.interface';
import { InjectValueInterface } from './inject-value.interface';
import { InjectUseClassInterface } from './inject-use-class.interface';

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type IInjectorMapValue<T> =
  | InjectFactoryInterface<T>
  | InjectValueInterface
  | InjectUseClassInterface<T>
  | Type<T>;

export type InjectParamsType<T> = {
  optional: boolean;
  dep: symbol | string | Type<T> | undefined;
};
