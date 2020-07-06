import { createStore } from 'redux';
import { TodoInterface } from '../interfaces/todo.interface';
import { createHashHistory } from 'history';
import createRootReducer from './reducers';

export const history = createHashHistory({
  basename: '',
});

const w: any = window;

export interface StateInterface {
  todos: TodoInterface[];
}

export const store = createStore(
  createRootReducer(history),
  w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__()
);
