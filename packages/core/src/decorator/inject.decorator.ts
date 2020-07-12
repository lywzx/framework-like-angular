import 'reflect-metadata';
import { INJECT_EXISTS_MODULE_KEY, INJECT_KEY } from '../constant';
import { InjectToken, JsCoreObject } from '../interfaces';
import { defineProperty, getComponentInjector } from '../util';
import { InjectConfig } from './inject-config';

export interface InjectReflectValueInterface<T = any> {
  index: number;
  use: InjectToken<T>;
}

/**
 * 注入某个对象
 * @param inject
 * @constructor
 */
export function Inject(inject?: InjectToken): ParameterDecorator & PropertyDecorator {
  return function(target: JsCoreObject, propertyKey: string | symbol, index?: number) {
    inject = typeof inject === 'undefined' ? Reflect.getMetadata('design:type', target, propertyKey) : inject;
    if (!inject) {
      throw new Error('');
    }
    // 参数装饰器
    if (typeof index === 'number') {
      const old: InjectReflectValueInterface[] = Reflect.getMetadata(INJECT_KEY, target, propertyKey) || [];
      const newValue = [
        ...old,
        {
          use: inject,
          index,
        },
      ];
      Reflect.defineMetadata(INJECT_KEY, newValue, target, propertyKey);
    } else {
      const isOptional = true;
      const old = (target as any)[propertyKey];
      // 属性装饰器
      Object.defineProperty(target, propertyKey, {
        get() {
          const realInjector = inject as InjectToken;
          const injector = getComponentInjector(this, (Inject as any)[INJECT_EXISTS_MODULE_KEY] as InjectConfig);
          // const injector: Injector = this[INJECTOR_KEY];
          if (!injector) {
            if (isOptional) {
              return old;
            }
            throw new Error('');
          }
          const instance = injector.get(realInjector);

          defineProperty(this, propertyKey, { enumerable: true, writable: false, value: instance });

          return instance;
        },
        set(instance) {
          defineProperty(this, propertyKey, {
            enumerable: true,
            writable: true,
            value: instance,
          });
        },
      });
    }
  };
}

Object.defineProperty(Inject, INJECT_EXISTS_MODULE_KEY, {
  enumerable: false,
  configurable: false,
  writable: false,
  value: new InjectConfig(),
});
