import React  from "react";
import {AddTodo} from "./components/add-todo";
import {TodoListPage} from "./routes/todo-list-page";
import {Footer} from "./components/footer";
import {
  Switch,
  Route,
} from "react-router-dom";
import {
  Module
} from '@framework-like-angular/react-adapter';

@Module({
  provider: []
})
export class App extends React.Component<any, any>  {
  render() {
    return (
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
          <Footer/>
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
          <p>Created by <a href="http://todomvc.com">you</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </React.Fragment>
    )
  }
}
