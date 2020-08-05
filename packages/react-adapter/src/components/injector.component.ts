import once from 'lodash/once';
import React from 'react';

/**
 * 获取一个injector相关
 */
export const getInjectorContext = once((react: typeof React) => {
  return react.createContext(null);
});

/** React Context for Injector */
export const getInjectorComponent = once((react: typeof React) => {
  return class InjectorComponent<P, S> extends react.Component<P, S> {};
});
