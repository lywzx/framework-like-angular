import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Module } from '@framework-like-angular/core';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history, StoreModule } from '../store';
import 'todomvc-app-css/index.css';
import { AddTodo } from './components/add-todo';
import { TodoListPage } from './routes/todo-list-page';
import { Footer } from './components/footer';
import { Inject } from '@framework-like-angular/react-adapter';
import { Store } from 'redux';
import { REDUX_STORE } from '@framework-like-angular/redux-adapter';

@Module({
  bootstrap: '#root',
  imports: [StoreModule],
})
export class App extends React.Component<any, any> {
  @Inject(REDUX_STORE) store?: Store;

  render() {
    return (
      <Provider store={this.store as Store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          <React.StrictMode>
            <React.Fragment>
              <section className="todoapp">
                <AddTodo></AddTodo>
                <section className="main">
                  <Switch>
                    <Route path="/">
                      <TodoListPage></TodoListPage>
                    </Route>
                    <Route path="/active">
                      <TodoListPage></TodoListPage>
                    </Route>
                    <Route path="/completed">
                      <TodoListPage></TodoListPage>
                    </Route>
                  </Switch>
                </section>
                <Footer />
              </section>
              <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>
                  Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
                </p>
                <p>
                  Created by <a href="http://todomvc.com">you</a>
                </p>
                <p>
                  Part of <a href="http://todomvc.com">TodoMVC</a>
                </p>
              </footer>
            </React.Fragment>
          </React.StrictMode>
        </ConnectedRouter>
      </Provider>
    );
  }
}
