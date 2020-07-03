import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import {App} from './views/App';
import {Provider, ReactReduxContext } from 'react-redux';
import {store} from './store';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store";

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
