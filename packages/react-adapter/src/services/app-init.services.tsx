import { Inject, Injectable, OnModuleInitInterface } from '@framework-like-angular/core';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MODULE_ROOT_APP_COMPONENT } from '../constant';

@Injectable
export class AppInitService implements OnModuleInitInterface {
  constructor(@Inject(MODULE_ROOT_APP_COMPONENT) protected App: typeof Component) {}

  onModuleInit(): void {
    this.renderApp();
  }

  renderApp() {
    const App = this.App;
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}
