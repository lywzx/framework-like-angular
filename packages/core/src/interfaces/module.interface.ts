import { BootstrapAdapter } from '../libs';
import { Type } from './type';

export interface ModuleInterface {
  /**
   * 模块的启动
   * @param adapter
   */
  bootstrap<T extends BootstrapAdapter>(adapter?: Type<T>): void;

  /**
   * 通过标识获取某个对象
   * @param token
   */
  get<T>(token: Type<T> | string | symbol): T;
}
