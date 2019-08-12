import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './session';
import projects from './projects';

const rootReducer = (history) => combineReducers({
  session,
  projects,
  router: connectRouter(history),
});

export default rootReducer;