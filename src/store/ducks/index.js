import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './session';

const rootReducer = (history) => combineReducers({
  session,
  router: connectRouter(history),
});

export default rootReducer;