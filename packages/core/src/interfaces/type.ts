import { InjectFactoryInterface } from './inject-factory.interface';
import { InjectValueInterface } from './inject-value.interface';
import { InjectUseClassInterface } from './inject-use-class.interface';

export interface Type<T> {
  new (...args: any[]): T;
}

export type IInjectorMapValue<T> =
  | InjectFactoryInterface<T>
  | InjectValueInterface
  | InjectUseClassInterface<T>
  | Type<T>;

export type InjectParamsType<T> = {
  optional: boolean;
  dep: InjectToken<T> | undefined;
};

/**
 * @description
 *
 * Represents an abstract class `T`, if applied to a concrete class it would stop being
 * instantiatable.
 *
 * @publicApi
 */
export interface AbstractType<T> extends Function {
  prototype: T;
}

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface ClassPrototypeObject<T> {
  constructor: { new (): T };
}

/*export type ClassPrototypeObject<T> = {
  constructor: Type<T>;
  [k: string]: any;
};*/

export type InjectToken<T = any> = string | symbol | Type<T>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type JsCoreObject = Object;
