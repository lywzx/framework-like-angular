import { InjectConfig } from '../decorator/inject-config';
import {
  InjectFactoryInterface,
  InjectToken,
  InjectUseClassInterface,
  InjectValueInterface,
  ModuleInterface,
  Type,
} from '../interfaces';
import { INJECTOR_KEY } from '../constant';

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

/**
 * 获取待注入的名称
 * @param dep
 */
export function getInjectName(
  dep: InjectFactoryInterface<any> | InjectValueInterface | InjectUseClassInterface<any> | Type<any> | InjectToken
): string {
  if (typeof dep === 'string') {
    return dep;
  }
  if (typeof dep === 'object' && 'token' in dep) {
    return dep.token.toString();
  }
  if (isType(dep)) {
    return dep.name.toLowerCase();
  }
  return dep.toString();
}

/**
 * 获取当前的注入器
 * @param obj
 * @param injectConfig
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getComponentInjector(obj: any, injectConfig: InjectConfig): ModuleInterface | null {
  if (obj[INJECTOR_KEY]) {
    return obj[INJECTOR_KEY];
  }
  const value = injectConfig.get();
  if (value) {
    defineProperty(obj, INJECTOR_KEY, {
      enumerable: false,
      configurable: false,
      value,
    });
  }
  return injectConfig.get();
}

/**
 * Object.defineProperty
 * @param o
 * @param p
 * @param attributes
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function defineProperty(o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) {
  Object.defineProperty(o, p, attributes);
}
