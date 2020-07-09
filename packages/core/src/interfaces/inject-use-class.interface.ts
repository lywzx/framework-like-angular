import { InjectBaseInterface } from './inject-base.interface';
import { Type } from './type';

export interface InjectUseClassInterface<T> extends InjectBaseInterface {
  useClass: Type<T>;
}
