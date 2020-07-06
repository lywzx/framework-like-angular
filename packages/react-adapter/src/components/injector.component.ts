import { Component, createContext } from 'react';

/** React Context for Injector */
export const InjectorContext = createContext(null);

export class InjectorComponent<P, S> extends Component<P, S> {}
