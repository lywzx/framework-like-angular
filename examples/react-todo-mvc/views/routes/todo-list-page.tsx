import { connect } from 'react-redux';
import React from 'react';
import { TodoInterface } from '../../interfaces/todo.interface';
import { TodoList } from '../../components/todo-list';
import { changeTodo, deleteTodo, toggleTodo, toggleTodoListCompleteState } from '../../store/actions';
import { filterTodoByRouteName } from '../../util';

interface TodoListPagePropsInterface {
  todos: TodoInterface[];
  onDeleteItem: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onTodoEdit: (id: number, text: string) => void;
  onToggleTodoListComplete: (completed: boolean) => void;
  completedAll: boolean;
}
function todoListPage(props: TodoListPagePropsInterface) {
  return (
    <React.Fragment>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={props.completedAll}
        onChange={() => {
          props.onToggleTodoListComplete(!props.completedAll);
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList
        todos={props.todos}
        onTodoDelete={props.onDeleteItem}
        onToggleComplete={props.onToggleComplete}
        onTodoEdit={props.onTodoEdit}
      />
    </React.Fragment>
  );
}

export const TodoListPage = connect<
  { todos: TodoInterface[]; completedAll: boolean },
  Omit<TodoListPagePropsInterface, 'todos' | 'completedAll'>
>(
  (state: any) => {
    const pathname = state.router.location.pathname;
    const renderTodos = filterTodoByRouteName(state.todos, pathname);
    const completedTodos = pathname === '/completed' ? renderTodos : filterTodoByRouteName(state.todos, '/completed');
    return {
      todos: filterTodoByRouteName(state.todos, state.router.location.pathname),
      completedAll: state.todos.length === completedTodos.length && completedTodos.length != 0,
    };
  },
  (dispatch) => {
    return {
      onDeleteItem: (id: number) => {
        dispatch(deleteTodo(id));
      },
      onToggleComplete: (id: number) => {
        dispatch(toggleTodo(id));
      },
      onTodoEdit: (id: number, text: string) => {
        dispatch(changeTodo(id, text));
      },
      onToggleTodoListComplete: (completed: boolean) => {
        dispatch(toggleTodoListCompleteState(completed));
      },
    };
  }
)(todoListPage);
