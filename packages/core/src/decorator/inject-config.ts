import { ModuleInterface } from '../interfaces';

/**
 * 内容设置module
 */
export class InjectConfig {
  protected module: ModuleInterface | null = null;

  /**
   * 设置注入器
   * @param module
   */
  set(module: ModuleInterface) {
    this.module = module;
  }

  /**
   * 获取注入器
   */
  get(): ModuleInterface | null {
    return this.module;
  }
}
