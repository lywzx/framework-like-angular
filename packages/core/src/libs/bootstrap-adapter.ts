import { InnerModule } from './inner-module';
import { ModuleOptionsInterface, Type } from '../interfaces';

export abstract class BootstrapAdapter {
  constructor(protected module: InnerModule, protected target: Type<any>, protected options?: ModuleOptionsInterface) {}
  public abstract bootstrap(): any;
}
