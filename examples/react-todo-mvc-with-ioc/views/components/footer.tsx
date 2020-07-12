import { Inject, Injectable } from '@framework-like-angular/core';
import React from 'react';
import { connect } from 'react-redux';
import { FooterLink } from '../../components/footerLink';
import { filterTodoByRouteName } from '../../util';
import { TodoService } from '../../services/todo.service';

interface IFooterInterface {
  total: number;
}

@Injectable()
export class footer extends React.Component<IFooterInterface, any> {
  @Inject() public todoService!: TodoService;

  protected clearCompleted = () => {
    this.todoService.clearCompleted();
  };

  render() {
    const props = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{props.total}</strong> item left
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
        <button className="clear-completed" onClick={this.clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export const Footer = connect((state: any) => {
  return {
    total: filterTodoByRouteName(state.todos, state.router.location.pathname).length,
  };
})(footer);
