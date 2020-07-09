import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Module } from '@framework-like-angular/react-adapter';
import { TodoListPage } from './views/routes/todo-list-page';
import { AddTodo } from './views/components/add-todo';
import { TodoService } from './services/todo.service';
import { Footer } from './views/components/footer';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';
import 'todomvc-app-css/index.css';

@Module({
  anchor: 'root',
  provider: [TodoService],
})
export class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store} context={ReactReduxContext}>
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
