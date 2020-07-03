import { isObject , isFunction } from 'lodash'
import {createElement} from "react";
import {InjectorComponent, InjectorContext} from "../components/injector.component";
import hoistNonReactStatics  from 'hoist-non-react-statics';
import {addBindings} from "../util/bindings";
import {InjectFactoryInterface, InjectUseClassInterface, InjectValueInterface} from "@framework-like-angular/core";
import {Injector} from "@framework-like-angular/core";

export type ModuleOptions = {
  provider?: Array<InjectFactoryInterface<any> | InjectUseClassInterface<any> | InjectValueInterface<any> | ObjectConstructor>
}

/**
 * @param options
 * @constructor
 */
export function Module(options?: ModuleOptions) {
  return function ModuleDecorator(Wrapped: any) {

    const injector = new Injector();

    /** @type {Map<Token, Function>} */
    const bindingMap: any = new Map<any, any>();

    injector.provide(...(options && options.provider || []));

    // ts-ignore
    class Provider<P, S> extends InjectorComponent<P, S> {

      private _parent = this.context;

      private _injector = injector;

      private _instanceMap = new Map();

      componentWillUnmount() {
        this._instanceMap.forEach((instance: any) => {
          if (isObject(instance) && isFunction((instance as any).dispose)) {
            (instance as any).dispose();
          }
        });
      }

      render() {
        return createElement(
          InjectorContext.Provider,
          { value: this } as any,
          createElement(Wrapped, this.props)
        );
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
    return hoistNonReactStatics(Provider, Wrapped);
  }

}
