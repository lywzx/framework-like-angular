import { ModuleInterface, ModuleOptions } from '../../src';
import { InnerModule } from '../../src/libs/inner-module';

/**
 * 模块测试类
 */
export class TestModule {
  static createTestModule(options?: ModuleOptions): ModuleInterface {
    return new InnerModule(TestModule, options);
  }
}
