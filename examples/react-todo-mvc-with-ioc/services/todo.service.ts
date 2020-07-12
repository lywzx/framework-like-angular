import { Action, State } from '@framework-like-angular/redux-adapter';
import { Reducer } from '@framework-like-angular/redux-adapter';
import { TodoInterface } from '../interfaces/todo.interface';

let index = 0;
@State({
  stateName: 'todos',
  defaultState: [],
})
export class TodoService {
  /**
   * 注入对象
   */
  // @State() protected state: TodoInterface[] = [];

  @Action('add-todo')
  addTodo(todo: string) {
    return {
      todo,
    };
  }

  @Reducer('add-todo')
  addTodoReducer(state: TodoInterface[] = [], { todo }: { todo: string }) {
    return [
      ...state,
      {
        id: index++,
        text: todo,
        completed: false,
      },
    ];
  }

  @Action('toggle-todo')
  toggleTodo(id: number) {
    return {
      id,
    };
  }

  @Reducer('toggle-todo')
  toggleTodoReducer(state: TodoInterface[], { id }: { id: number }) {
    return state.map(todo => {
      if (todo.id === id) {
        return Object.assign({}, todo, {
          completed: !todo.completed,
        });
      }
      return todo;
    });
  }

  @Action('delete-item')
  deleteItem(id: number) {
    return {
      id,
    };
  }

  @Reducer('delete-item')
  deleteItemReducer(state: TodoInterface[], { id }: { id: number }) {
    return state.filter(todo => todo.id !== id);
  }

  @Action('change-item')
  editItem(edit: { id: number; text: string }) {
    return edit;
  }

  @Reducer('change-item')
  editItemReducer(state: TodoInterface[], edit: { id: number; text: string }) {
    return state.map(todo => {
      if (todo.id === edit.id) {
        return Object.assign({}, todo, {
          text: edit.text,
        });
      }
      return todo;
    });
  }

  @Action('toggle-list')
  listToggleComplete(completed: boolean) {
    return {
      completed,
    };
  }

  @Reducer('toggle-list')
  listToggleCompleteReducer(state: TodoInterface[], action: { completed: boolean }) {
    return state.map(todo => ({
      ...todo,
      completed: action.completed,
    }));
  }

  @Action('clear-complete')
  clearCompleted() {
    return {};
  }

  @Reducer('clear-complete')
  clearCompleteReducer(state: TodoInterface[]) {
    return state.filter(todo => !todo.completed);
  }
}
