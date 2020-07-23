import { combineReducers, createStore } from 'redux';
import { TodoInterface } from '../interfaces/todo.interface';
import { createHashHistory } from 'history';
import { ReduxModule } from '@framework-like-angular/redux';
import { ReduxStoreModule } from './redux-store-module';
import { connectRouter } from 'connected-react-router';

export const history = createHashHistory({
  basename: '',
});

const w: any = window;

export interface StateInterface {
  todos: TodoInterface[];
}

const initReducer = {
  router: connectRouter(history),
};

export const StoreModule = ReduxModule.forRoot({
  reducers: initReducer,
  store: createStore(combineReducers(initReducer), w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__()),
  imports: [ReduxStoreModule],
});
