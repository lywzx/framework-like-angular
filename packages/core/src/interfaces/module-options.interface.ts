import { Type } from './type';
import { InjectUseClassInterface } from './inject-use-class.interface';
import { InjectValueInterface } from './inject-value.interface';
import { InjectFactoryInterface } from './inject-factory.interface';

export interface ModuleOptionsInterface {
  // 需要导入的模块
  import?: [];
  provider?: Array<Type<any> | InjectUseClassInterface<any> | InjectValueInterface | InjectFactoryInterface<any>>;
  // 需要导出的模块
  export?: [];
}
