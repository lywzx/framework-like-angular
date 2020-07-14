import { Type } from './type';

export interface InjectBaseInterface {
  token: string | symbol | Type<any>;
}
