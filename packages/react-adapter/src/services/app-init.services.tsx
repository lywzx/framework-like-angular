import { Inject, Injectable, OnModuleInitInterface } from '@framework-like-angular/core';
import { MODULE_ROOT_APP_COMPONENT } from '../decorator';
import { Component } from 'react';

@Injectable
export class AppInitService implements OnModuleInitInterface {
  constructor(@Inject(MODULE_ROOT_APP_COMPONENT) protected App: Component) {}

  onModuleInit(): void {
    this.renderApp();
  }

  renderApp() {
    ReactDOM.render(this.App, document.getElementById('root'));
  }
}
