import { InjectFactoryInterface } from './inject-factory.interface';
import { InjectValueInterface } from './inject-value.interface';
import { InjectUseClassInterface } from './inject-use-class.interface';

export interface FactoryFunctionInjectInterface<T> {
  // 表示被注入的
  __inject: boolean;

  use: InjectFactoryInterface<T> | InjectValueInterface<T> | InjectUseClassInterface<T>;
}
