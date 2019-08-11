import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './ducks';

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = applyMiddleware(routerMiddleware(history), thunk);
  return createStore(rootReducer(history), initialState, composeEnhancers(middleware));
}
