import { AnyAction, combineReducers } from 'redux';
import {
  ADD_TODO,
  CHANGE_TODO,
  CLEAR_COMPLETED_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  TOGGLE_TODO_LIST_COMPLETE_STATE,
} from '../actions';
import { TodoInterface } from '../../interfaces/todo.interface';

let index = 1;
export function todos(state: TodoInterface[] = [], action: AnyAction): TodoInterface[] {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: index++,
          text: action.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    case CHANGE_TODO: {
      return state.map((todo, index) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            text: action.text,
          });
        }
        return todo;
      });
    }
    case DELETE_TODO: {
      return state.filter(todo => todo.id !== action.id);
    }
    case CLEAR_COMPLETED_TODO: {
      return state.filter(todo => !todo.completed);
    }
    case TOGGLE_TODO_LIST_COMPLETE_STATE: {
      return state.map(todo => ({
        ...todo,
        completed: action.completed,
      }));
    }
    default:
      return state;
  }
}
