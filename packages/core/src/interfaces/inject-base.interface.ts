import { Type } from './type';

export interface InjectBaseInterface {
  provide: string | symbol | Type<any>;
}
