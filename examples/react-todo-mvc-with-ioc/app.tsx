import { App } from './views/app';
import { FactoryCore } from '@framework-like-angular/core';
import { ReactAdapter } from '@framework-like-angular/react-adapter';

function bootstrap() {
  const app = FactoryCore.create(App);
  app.bootstrap(ReactAdapter);
}

bootstrap();
