import { Type, Inject as CoreInject, injectorKey } from '@framework-like-angular/core';
import { InjectorContext } from '../components/injector.component';

export function Inject<T>(inject?: string | Type<T> | symbol) {
  const callback = CoreInject(inject);

  return function(target: Record<string, any>, name: string, index?: number) {
    callback(target, name, index);
    if (target && target.constructor) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target.constructor.contextType = InjectorContext;

      Object.defineProperty(target, injectorKey, {
        get(): any {
          return this.context._module;
        },
      });
    }
  };
}
