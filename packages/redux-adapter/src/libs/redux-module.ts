import { FactoryCore, Module, MODULE_INIT, ModuleOptions, Type } from '@framework-like-angular/core';
import { flatten, isFunction } from 'lodash';
import { DEFAULT_REDUCER, REDUX_SERVICE_TOKEN, REDUX_STORE } from '../constant';
import { ReduxBootstrapService } from '../services/redux-bootstrap.service';
import { createStore, Reducer, Store } from 'redux';
import { REDUX_SERVICE } from '../decorator/redux-service.decorator';

@Module()
export class ReduxModule {
  public static forRoot(options: ModuleOptions & { store?: Store; reducers: Record<string, Reducer<any, any>> }) {
    const imports = options.imports || [];
    const module = imports.map((it) => FactoryCore.create(it));
    const providers = flatten(module.map((m) => (m.options && m.options.providers) || []))
      .filter((m) => isFunction(m))
      .filter((it) => Reflect.getMetadata(REDUX_SERVICE, it));

    const newModule = FactoryCore.create(ReduxModule as Type<any>);
    newModule.options = {
      imports: module,
      providers: providers,
    };
    newModule.injector.provide(
      {
        provide: REDUX_SERVICE_TOKEN,
        useValue: providers,
      },
      {
        provide: MODULE_INIT,
        useClass: ReduxBootstrapService,
      },
      {
        provide: REDUX_STORE,
        factory() {
          if (options && options.store) {
            return options.store;
          }
          const w = window as any;
          return createStore((state) => state, w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__());
        },
      },
      {
        provide: DEFAULT_REDUCER,
        useValue: options.reducers,
      }
    );
    return newModule;
  }
}
