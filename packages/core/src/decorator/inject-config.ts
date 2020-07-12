import { InnerModule } from '@framework-like-angular/core';

/**
 * 内容设置module
 */
export class InjectConfig {
  protected module: InnerModule | null = null;

  /**
   * 设置注入器
   * @param module
   */
  set(module: InnerModule) {
    this.module = module;
  }

  /**
   * 获取注入器
   */
  get(): InnerModule | null {
    return this.module;
  }
}
