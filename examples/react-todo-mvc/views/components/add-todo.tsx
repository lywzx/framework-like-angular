import React, { KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { addTodo as addTodoAction } from '../../store/actions';

const addTodo = ({ dispatch }: { dispatch: Dispatch<AnyAction> }) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const code = e.key;
    const input = e.currentTarget;
    if (code === 'Enter' && input.value) {
      dispatch(addTodoAction(input.value));
      input.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" onKeyDown={onKeyDown} autoFocus />
    </header>
  );
};

export const AddTodo = connect()(addTodo);
