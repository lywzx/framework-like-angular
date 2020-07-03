import {isObject, isFunction, isString, isSymbol} from 'lodash';

export type Token = Function | Object | ObjectConstructor | string | symbol;

export function isToken(arg: any): arg is Token {
  return isFunction(arg) || isObject(arg) || isString(arg) || isSymbol(arg);
}

