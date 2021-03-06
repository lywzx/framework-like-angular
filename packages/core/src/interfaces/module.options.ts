import { Type } from './type';
import { InjectUseClassInterface } from './inject-use-class.interface';
import { InjectValueInterface } from './inject-value.interface';
import { InjectFactoryInterface } from './inject-factory.interface';

export interface ModuleOptions {
  bootstrap?: any;
  // 需要导入的模块
  imports?: any[];
  // 服务提供者
  providers?: Array<Type<any> | InjectUseClassInterface<any> | InjectValueInterface | InjectFactoryInterface<any>>;
  // 需要导出的模块
  exports?: [];
}
