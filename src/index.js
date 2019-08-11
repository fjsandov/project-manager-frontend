import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore, { history } from './store';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root'),
);

