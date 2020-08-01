import isArray from 'lodash/isArray';
import { INJECTOR } from '../constant';
import { Token } from '../interfaces';
/* istanbul ignore next */
const IS_BINDING = typeof Symbol === 'function' ? Symbol() : '__binding__';

/**
 * Add bindings to bindings Map
 * @internal
 * @param {Map<Token, Function>} bindingMap
 * @param {Definition[]} definitions
 */
export function addBindings(bindingMap: Map<Token, (...args: any[]) => any>, definitions: any[]) {
  definitions.forEach((definition) => {
    let token, binding;
    if (isArray(definition)) {
      [token, binding = token] = definition;
    } else {
      token = binding = definition;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    bindingMap.set(token, binding[IS_BINDING] ? binding : toClass(binding));
  });
}

export function toClass(constructor: any) {
  return asBinding((injector: any) => {
    const instance = new constructor();
    if (!instance[INJECTOR]) {
      instance[INJECTOR] = injector;
    }
    return instance;
  });
}

/**
 * Mark function as binding function.
 * @internal
 * @param {Function} binding
 * @returns {Function}
 */
function asBinding(binding: any) {
  binding[IS_BINDING] = true;
  return binding;
}
