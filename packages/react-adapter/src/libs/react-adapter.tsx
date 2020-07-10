import { BootstrapAdapter } from '@framework-like-angular/core';
import React, { createElement } from 'react';
import { InjectorComponent, InjectorContext } from '../components/injector.component';
import { isFunction, isObject } from 'lodash';
import { addBindings } from '../util/bindings';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ReactDOM from 'react-dom';

export class ReactAdapter extends BootstrapAdapter {
  bootstrap(): any {
    /** @type {Map<Token, Function>} */
    const bindingMap: any = new Map<any, any>();

    const module = this.module;
    const Wrapped = this.target;
    const options = this.options;

    // ts-ignore
    class Provider<P, S> extends InjectorComponent<P, S> {
      private _parent = this.context;

      private _module = module;

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

      static register(...definitions: any[]) {
        addBindings(bindingMap, definitions);
      }
    }

    Provider.contextType = InjectorContext;

    // static fields from component should be visible on the generated Consumer
    const App = hoistNonReactStatics(Provider, Wrapped);
    if (options && options.bootstrap) {
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  }
}
