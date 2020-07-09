import { Type } from '@framework-like-angular/core';

export interface InjectBaseInterface {
  token: string | symbol | Type<any>;
}
