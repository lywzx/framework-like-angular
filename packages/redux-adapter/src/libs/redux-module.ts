import { FactoryCore, Module, MODULE_INIT, ModuleOptionsInterface, Type } from '@framework-like-angular/core';
import { flatten, isFunction } from 'lodash';
import { DEFAULT_REDUCER, REDUX_SERVICE_TOKEN, REDUX_STORE } from '../constant';
import { ReduxBootstrapService } from '../services/redux-bootstrap.service';
import { createStore, Reducer, Store } from 'redux';
import { REDUX_SERVICE } from '../decorator/redux-service.decorator';

@Module()
export class ReduxModule {
  public static forRoot(
    options: ModuleOptionsInterface & { store?: Store; reducers: Record<string, Reducer<any, any>> }
  ) {
    const imports = options.imports || [];
    const module = imports.map((it) => FactoryCore.create(it));
    const providers = flatten(module.map((m) => (m.options && m.options.provider) || []))
      .filter((m) => isFunction(m))
      .filter((it) => Reflect.getMetadata(REDUX_SERVICE, it));

    const newModule = FactoryCore.create(ReduxModule as Type<any>);
    newModule.options = {
      imports: module,
      provider: providers,
    };
    newModule.injector.provide(
      {
        token: REDUX_SERVICE_TOKEN,
        useValue: providers,
      },
      {
        token: MODULE_INIT,
        useClass: ReduxBootstrapService,
      },
      {
        token: REDUX_STORE,
        factory() {
          if (options && options.store) {
            return options.store;
          }
          const w = window as any;
          return createStore((state) => state, w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__());
        },
      },
      {
        token: DEFAULT_REDUCER,
        useValue: options.reducers,
      }
    );

    return newModule;
  }
}
