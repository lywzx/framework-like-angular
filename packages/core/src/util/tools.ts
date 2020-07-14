import { InjectValueInterface, InjectUseClassInterface, Type, InjectFactoryInterface } from '../interfaces';
import { MODULE_INIT } from '../constant';

/**
 *
 * @param providers
 */
export function getProviders(
  providers: Array<Type<any> | InjectUseClassInterface<any> | InjectValueInterface | InjectFactoryInterface<any>> = []
): Array<Type<any> | InjectUseClassInterface<any> | InjectValueInterface | InjectFactoryInterface<any>> {
  const moduleInitProvider = [];
  const commonProvider = [];

  for (let i = 0, j = providers.length; i < j; i++) {
    const currentProvider = providers[i];
    if ('token' in currentProvider) {
      if (currentProvider.token === MODULE_INIT) {
        if ('useClass' in currentProvider) {
          moduleInitProvider.push(currentProvider.useClass);
          commonProvider.push(currentProvider.useClass);
        }
        continue;
      }
    }
    commonProvider.push(currentProvider);
  }
  commonProvider.push({
    token: MODULE_INIT,
    useValue: moduleInitProvider,
  });
  return commonProvider;
}
