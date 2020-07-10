import React, { Component, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { TodoService } from '../../services/todo.service';
import { Inject } from '@framework-like-angular/react-adapter';

export class AddTodoComponent extends Component<any, any> {
  @Inject() public todoService!: TodoService;

  private onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const code = e.key;
    const input = e.currentTarget;
    if (code === 'Enter' && input.value) {
      this.todoService.addTodo(input.value);
      // dispatch(addTodoAction(input.value));
      input.value = '';
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" onKeyDown={this.onKeyDown} autoFocus />
      </header>
    );
  }
}

export const AddTodo = connect()(AddTodoComponent);
