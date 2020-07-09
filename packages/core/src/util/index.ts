import {
  InjectFactoryInterface,
  InjectUseClassInterface,
  InjectValueInterface,
  Type,
} from '@framework-like-angular/core';

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

/**
 * 获取待注入的名称
 * @param dep
 */
export function getInjectName(
  dep: InjectFactoryInterface<any> | InjectValueInterface | InjectUseClassInterface<any> | Type<any>
): string {
  if ('token' in dep) {
    return dep.token.toString();
  }
  return dep.name.toLowerCase();
}
