import { InnerModule } from './inner-module';
import { MODULE_APP } from '../constant';

export class FactoryCore {
  static create(module: any): InnerModule {
    const m = module[MODULE_APP];
    if (m) {
      return m;
    }
    throw new Error('module not found');
  }
}
