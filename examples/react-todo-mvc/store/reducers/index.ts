import * as todoReducer from './todo.reducers';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    ...todoReducer,
  });
export default createRootReducer;
