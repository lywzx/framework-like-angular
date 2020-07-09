import { isObject, isFunction } from 'lodash';
import { createElement } from 'react';
import { InjectorComponent, InjectorContext } from '../components/injector.component';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { addBindings } from '../util/bindings';
import { ModuleOptionsInterface, Module as ModuleCore, Type, MODULE_INIT } from '@framework-like-angular/core';
import { AppInitService } from '../services/app-init.services';
import { MODULE_ROOT_APP_COMPONENT } from '../constant';

interface ModuleOptions extends ModuleOptionsInterface {
  anchor: string;
}

class ModuleTemplate {}

/**
 * @param options
 * @constructor
 */
export function Module(options?: ModuleOptions) {
  const moduleCallback = ModuleCore({
    ...options,
    provider: [
      {
        token: MODULE_INIT,
        useClass: AppInitService,
      },
      ...((options && options.provider) || []),
    ],
  });
  return function ModuleDecorator(Wrapped: Type<any>): any {
    /** @type {Map<Token, Function>} */
    const bindingMap: any = new Map<any, any>();

    const module = new (moduleCallback(ModuleTemplate))();

    // ts-ignore
    class Provider<P, S> extends InjectorComponent<P, S> {
      private _parent = this.context;

      private _injector = module.injector;

      private _instanceMap = new Map();

      componentWillUnmount() {
        this._instanceMap.forEach((instance: any) => {
          if (isObject(instance) && isFunction((instance as any).dispose)) {
            (instance as any).dispose();
          }
        });
      }

      render() {
        return createElement(InjectorContext.Provider, { value: this } as any, createElement(Wrapped, this.props));
      }

      static WrappedComponent = Wrapped;

      /**
       * Register dependency injection bindings in scope of decorated class
       * @param {...Definition} definitions Dependency injection configuration
       */
      static register(...definitions: any[]) {
        addBindings(bindingMap, definitions);
      }
    }

    Provider.contextType = InjectorContext;

    // static fields from component should be visible on the generated Consumer
    const ret = hoistNonReactStatics(Provider, Wrapped);
    if (options && options.anchor) {
      module.injector.provide({
        token: MODULE_ROOT_APP_COMPONENT,
        useValue: ret,
      });
      module.init();
    }

    return ret;
  };
}
