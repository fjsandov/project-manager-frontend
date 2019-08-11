import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './ducks';

export const history = createBrowserHistory();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

let store;

export default function configureStore(initialState) {
  if (store) return store;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
