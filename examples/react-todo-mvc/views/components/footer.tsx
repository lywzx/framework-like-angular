import React from 'react';
import { connect } from 'react-redux';
import { FooterLink } from '../../components/footerLink';
import { filterTodoByRouteName } from '../../util';
import { clearCompletedTodo } from '../../store/actions';

interface IFooterInterface {
  total: number;
  clearCompleted: () => void;
}
export function footer({ total, clearCompleted }: IFooterInterface) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{total}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <FooterLink url={'/'} text={'All'} activeOnlyWhenExact={true} />
        </li>
        <li>
          <FooterLink url={'/active'} text={'Active'} activeOnlyWhenExact={true} />
        </li>
        <li>
          <FooterLink url={'/completed'} text={'Completed'} activeOnlyWhenExact={true} />
        </li>
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export const Footer = connect(
  (state: any) => {
    return {
      total: filterTodoByRouteName(state.todos, state.router.location.pathname).length,
    };
  },
  (dispatch) => {
    return {
      clearCompleted: () => {
        dispatch(clearCompletedTodo());
      },
    };
  }
)(footer);
