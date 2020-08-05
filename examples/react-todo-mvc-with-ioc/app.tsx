import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './views/app';
import { FactoryCore } from '@framework-like-angular/core';
import { reactAdapter } from '@framework-like-angular/react-adapter';

function bootstrap() {
  const app = FactoryCore.create(App);
  app.bootstrap(reactAdapter(React, ReactDOM));
}

bootstrap();
