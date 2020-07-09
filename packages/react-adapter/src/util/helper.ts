import { isObject, isFunction, isString, isSymbol } from 'lodash';
import { Type } from '@framework-like-angular/core';

export type Token = Type<any> | string | symbol;

export function isToken(arg: any): arg is Token {
  return isFunction(arg) || isObject(arg) || isString(arg) || isSymbol(arg);
}
