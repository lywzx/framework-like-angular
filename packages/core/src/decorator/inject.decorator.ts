import 'reflect-metadata';
import { Type } from '../interfaces';
import { Injector } from '../libs';

export const injectKey = Symbol('inject:key');

export const injectorKey = Symbol('__injector__');

export interface InjectReflectValueInterface<T = any> {
  index: number;
  use: string | symbol | Type<T>;
}

export function Inject<T>(inject?: string | Type<T> | symbol) {
  return function(target: Record<string, any>, name: string, index?: number) {
    inject = typeof inject === 'undefined' ? Reflect.getMetadata('design:type', target, name) : inject;
    if (!inject) {
      throw new Error('');
    }
    // 参数装饰器
    if (typeof index === 'number') {
      const old: InjectReflectValueInterface[] = Reflect.getMetadata(injectKey, target, name) || [];
      const newValue = [
        ...old,
        {
          use: inject,
          index,
        },
      ];
      Reflect.defineMetadata(injectKey, newValue, target, name);
    } else {
      const isOptional = true;
      const old = target[name];
      // 属性装饰器
      Object.defineProperty(target, name, {
        get() {
          const realInjector = inject as string | symbol | Type<any>;
          const injector: Injector = this[injectorKey] as any;
          if (!injector) {
            if (isOptional) {
              return old;
            }
            throw new Error('');
          }
          const instance = injector.get(realInjector);

          Object.defineProperty(this, name, {
            enumerable: true,
            writable: false,
            value: instance,
          });

          return instance;
        },
        set(instance) {
          Object.defineProperty(this, name, {
            enumerable: true,
            writable: true,
            value: instance,
          });
        },
      });
    }
  };
}
