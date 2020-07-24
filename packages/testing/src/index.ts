import { ModuleInterface, ModuleOptions } from '@framework-like-angular/core';
import { InnerModule } from '@framework-like-angular/core';

/**
 * 模块测试类
 */
export class TestingModule {
  static createTestingModule(options?: ModuleOptions): ModuleInterface {
    return new InnerModule(TestingModule, options);
  }
}
