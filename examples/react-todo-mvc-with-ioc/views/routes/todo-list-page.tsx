import { connect } from 'react-redux';
import React from 'react';
import { TodoInterface } from '../../interfaces/todo.interface';
import { TodoList } from '../../components/todo-list';
import { filterTodoByRouteName } from '../../util';
import { TodoService } from '../../services/todo.service';
import { Inject } from '@framework-like-angular/react-adapter';

interface TodoListPagePropsInterface {
  todos: TodoInterface[];
  completedAll: boolean;
}

export class todoListPage extends React.Component<TodoListPagePropsInterface, any> {
  @Inject() public todoService!: TodoService;

  protected onToggleComplete = (id: number) => {
    this.todoService.toggleTodo(id);
  };

  protected deleteItem = (id: number) => {
    this.todoService.deleteItem(id);
  };

  protected editItem = (id: number, text: string) => {
    this.todoService.editItem({
      id,
      text,
    });
  };

  protected todoListToggleComplete(completed: boolean) {
    this.todoService.listToggleComplete(completed);
  }

  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={props.completedAll}
          onChange={() => {
            this.todoListToggleComplete(!props.completedAll);
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todos={props.todos}
          onTodoDelete={this.deleteItem}
          onToggleComplete={this.onToggleComplete}
          onTodoEdit={this.editItem}
        />
      </React.Fragment>
    );
  }
}

export const TodoListPage = connect<
  { todos: TodoInterface[]; completedAll: boolean },
  Omit<TodoListPagePropsInterface, 'todos' | 'completedAll'>
>((state: any) => {
  const pathname = state.router.location.pathname;
  const renderTodos = filterTodoByRouteName(state.todos, pathname);
  const completedTodos = pathname === '/completed' ? renderTodos : filterTodoByRouteName(state.todos, '/completed');
  return {
    todos: filterTodoByRouteName(state.todos, state.router.location.pathname),
    completedAll: state.todos.length === completedTodos.length && completedTodos.length != 0,
  };
})(todoListPage);
