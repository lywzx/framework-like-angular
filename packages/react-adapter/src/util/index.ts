import { Injector } from '@framework-like-angular/core';
import { INJECTOR } from '../constant';

let currentInjector: Injector | null = null;

export function getInjector(target: any): Injector | null {
  let injector = target[INJECTOR];
  if (injector) {
    return injector;
  }
  injector = currentInjector || target.context;
  if (injector instanceof Injector) {
    target[INJECTOR] = injector;
    return injector;
  }
  return null;
}

const registrationQueue: any[] = [];
export function getInstance(injector: any, token: any) {
  if (registrationQueue.length > 0) {
    registrationQueue.forEach((registration) => {
      registration();
    });
    registrationQueue.length = 0;
  }
  while (injector) {
    let instance = injector._instanceMap.get(token);
    if (instance !== undefined) {
      return instance;
    }
    const binding = injector._bindingMap.get(token);
    if (binding) {
      const prevInjector = currentInjector;
      currentInjector = injector;
      try {
        instance = binding(injector);
      } finally {
        currentInjector = prevInjector;
      }
      injector._instanceMap.set(token, instance);
      return instance;
    }
    injector = injector._parent;
  }
  return undefined;
}
