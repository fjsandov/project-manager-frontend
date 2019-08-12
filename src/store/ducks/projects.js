import { createSelector } from 'reselect';
import get from 'lodash/get';
import { goBack } from 'connected-react-router';
import getApi from '../../services/api';

const types = {
  SET_PROJECTS: 'projects/SET',
  ADD_PROJECT: 'projects/ADD',
};

const INITIAL_STATE = {
  projects: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_PROJECTS: {
      const { projects } = action.payload;
      return { ...state, projects };
    }
    case types.ADD_PROJECT: {
      const { project } = action.payload;
      return { ...state, projects: [...state.projects, project] };
    }
    default:
      return state;
  }
}

export function fetchProjects() {
  return (dispatch) => {
    return getApi().projects.list()
      .then((projects) => {
        dispatch({
          type: types.SET_PROJECTS,
          payload: { projects },
        });
      });
  };
}

export function createProject({ name, projectType, startAt, endAt }) {
  return (dispatch) => {
    return getApi().projects.create(name, projectType, startAt, endAt)
      .then((project) => dispatch({
        type: types.ADD_PROJECT,
        payload: { project },
      }))
      .then(() => dispatch(goBack()));
  };
}

const getProjectsStore = state => state.projects;

export const getProjects = createSelector(
  getProjectsStore,
  projectsStore => get(projectsStore, 'projects'),
);