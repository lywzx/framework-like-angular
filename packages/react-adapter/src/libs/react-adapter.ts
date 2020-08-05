import { BootstrapAdapter, Inject, INJECT_EXISTS_MODULE_KEY, InjectConfig } from '@framework-like-angular/core';
import { getInjectorContext, getInjectorComponent } from '../components/injector.component';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import once from 'lodash/once';
import { addBindings } from '../util/bindings';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import ReactDom from 'react-dom';

/**
 * 导出react-adapter
 * @param react
 * @param reactDom
 */
export const reactAdapter = once((react: typeof React, reactDom: typeof ReactDom) => {
  ReactAdapter.react = react;
  ReactAdapter.reactDom = reactDom;
  return ReactAdapter;
});

/**
 * react 相关的信息
 */
const injectConfig: InjectConfig = (Inject as any)[INJECT_EXISTS_MODULE_KEY] as any;
class ReactAdapter extends BootstrapAdapter {
  /**
   * react
   */
  public static react?: typeof React = undefined;

  /**
   * react dom
   */
  public static reactDom?: typeof ReactDom = undefined;

  bootstrap(): any {
    /** @type {Map<Token, Function>} */
    const bindingMap: any = new Map<any, any>();

    const module = this.module;
    const Wrapped = this.target;
    const options = this.options;

    const { react, reactDom } = ReactAdapter;

    if (!react || !reactDom) {
      throw new Error('can not find react or react-dom');
    }

    injectConfig.set(module);

    // ts-ignore
    class Provider<P, S> extends getInjectorComponent(React)<P, S> {
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
        if (react) {
          return react.createElement(
            getInjectorContext(react).Provider,
            { value: this } as any,
            react.createElement(Wrapped, this.props)
          );
        }
        return null;
      }

      static WrappedComponent = Wrapped;

      static register(...definitions: any[]) {
        addBindings(bindingMap, definitions);
      }
    }

    Provider.contextType = getInjectorContext(react);

    // static fields from component should be visible on the generated Consumer
    const App = hoistNonReactStatics(Provider, Wrapped);
    if (options && options.bootstrap && reactDom && react) {
      reactDom.render(react.createElement(App), document.querySelector(options.bootstrap));
    }
  }
}
