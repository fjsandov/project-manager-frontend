import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './session';
import projects from './projects';
import tasks from './tasks';
import comments from './comments';

const rootReducer = (history) => combineReducers({
  session,
  projects,
  tasks,
  comments,
  router: connectRouter(history),
});

export default rootReducer;