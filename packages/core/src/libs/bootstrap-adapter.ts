import { InnerModule } from './inner-module';
import { ModuleOptions, Type } from '../interfaces';

export abstract class BootstrapAdapter {
  constructor(protected module: InnerModule, protected target: Type<any>, protected options?: ModuleOptions) {}
  public abstract bootstrap(): any;
}
