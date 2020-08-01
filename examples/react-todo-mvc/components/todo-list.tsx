import React from 'react';
import { Todo } from './todo';
import { TodoInterface } from '../interfaces/todo.interface';

export interface ITodoListPropsInterface {
  todos: TodoInterface[];
  onToggleComplete: (id: number, checked: boolean) => void;
  onTodoDelete: (id: number) => void;
  onTodoEdit: (id: number, text: string) => void;
}

export function TodoList({ todos, onToggleComplete, onTodoDelete, onTodoEdit }: ITodoListPropsInterface) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onToggleComplete={(checked: boolean) => onToggleComplete(todo.id, checked)}
          onTodoDelete={() => onTodoDelete(todo.id)}
          onTodoEdit={(text: string) => onTodoEdit(todo.id, text)}
        />
      ))}
    </ul>
  );
}
