import { Inject, Injectable, MODULE_REF, OnModuleInitInterface, Type } from '@framework-like-angular/core';
import { DEFAULT_REDUCER, REDUX_SERVICE_TOKEN, REDUX_STORE } from '../constant';
import { AnyAction, combineReducers, Reducer, ReducersMapObject, Store } from 'redux';
import { ModuleInterface } from '@framework-like-angular/core';
import { ACTION_CONSTANT, IStateInjectInterface, REDUCER_CONSTANT, STATE_CONSTANT, STATE_INJECT } from '../decorator';
import { keyBy } from 'lodash';

@Injectable()
export class ReduxBootstrapService implements OnModuleInitInterface {
  constructor(
    @Inject(REDUX_SERVICE_TOKEN) protected services: Type<any>[],
    @Inject(REDUX_STORE) protected store: Store,
    @Inject(MODULE_REF) protected module: ModuleInterface,
    @Inject(DEFAULT_REDUCER) protected reducers: Record<string, Reducer<any, any>>
  ) {}

  onModuleInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const store = this.store;
    const services = this.services;

    const initReducer: ReducersMapObject<any, any> = {};

    services.forEach((service) => {
      const actions: Array<Record<'type' | 'name', string>> = Reflect.getMetadata(ACTION_CONSTANT, service) || [];
      const reducers: Array<Record<'type' | 'name', string>> = Reflect.getMetadata(REDUCER_CONSTANT, service) || [];
      const reducerOptions: { stateName: string; defaultState: any } = Reflect.getMetadata(STATE_CONSTANT, service);

      const instance = this.module.get(service);

      // 处理state的注入问题
      const injectState: IStateInjectInterface[] = Reflect.getMetadata(STATE_INJECT, service) || [];
      if (injectState.length) {
        injectState.forEach(function (config) {
          const oldValue = instance[config.name];
          if (delete instance[config.name]) {
            Reflect.defineProperty(service.prototype, config.name, {
              get() {
                let reference = config.reference;
                if (typeof reference === 'undefined') {
                  reference = service;
                }
                const referenceName =
                  typeof reference === 'function'
                    ? (Reflect.getMetadata(STATE_CONSTANT, service) || {}).stateName
                    : reference;

                if (!referenceName) {
                  throw new Error('can not find state name');
                }

                const fn = () => store.getState()[referenceName] || oldValue;
                Reflect.defineProperty(this, config.name, {
                  get: fn,
                });
                return fn();
              },
            });
          }
        });
      }

      // 构建action
      actions.forEach((action) => {
        const oldValue: (...args: any) => any = instance[action.name];
        if (delete instance[action.name]) {
          Object.defineProperty(instance, action.name, {
            value: function (...args: any) {
              const result = oldValue.call(instance, ...args);
              self.store.dispatch({
                type: action.type,
                ...result,
              });
            },
          });
        }
      });

      // 构建reducer
      if (reducerOptions && reducerOptions.stateName && reducers.length) {
        const reducersKeyBy = keyBy(reducers, 'type');
        initReducer[reducerOptions.stateName] = (state: any = reducerOptions.defaultState, action: AnyAction) => {
          if (action.type in reducersKeyBy) {
            return instance[reducersKeyBy[action.type]['name']](state, action);
          }
          return state;
        };
      }
    });
    store.replaceReducer(
      combineReducers({
        ...this.reducers,
        ...initReducer,
      })
    );

    // this.store.replaceReducer();
  }
}
