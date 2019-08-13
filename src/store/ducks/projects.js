import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import map from 'lodash/map';
import find from 'lodash/find';
import { goBack } from 'connected-react-router';
import getApi from '../../services/api';
import { convertFromBackend } from '../../utils/projects';

const types = {
  SET_PROJECTS: 'projects/LIST',
  ADD_PROJECT: 'projects/ADD',
  UPDATE_PROJECT: 'projects/UPDATE',
  DELETE_PROJECT: 'projects/DELETE',
};

const INITIAL_STATE = {
  projects: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_PROJECTS: {
      const { projects } = action.payload;
      return { ...state, projects: projects.map(convertFromBackend) };
    }
    case types.ADD_PROJECT: {
      const { project } = action.payload;
      return { ...state, projects: [...state.projects, convertFromBackend(project)] };
    }
    case types.UPDATE_PROJECT: {
      const { project } = action.payload;
      return {
        ...state,
        projects: map(state.projects, (original) => {
          return original.id === project.id
            ? convertFromBackend(project)
            : original;
        }),
      };
    }
    case types.DELETE_PROJECT: {
      const { id: deletedId } = action.payload;
      return { ...state, projects: filter(state.projects, ({ id }) => id !== deletedId) };
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

export function updateProject({ id, name, projectType, startAt, endAt }) {
  return (dispatch) => {
    return getApi().projects.update(id, name, projectType, startAt, endAt)
      .then((project) => dispatch({
        type: types.UPDATE_PROJECT,
        payload: { project },
      }))
      .then(() => dispatch(goBack()));
  };
}

export function deleteProject(id) {
  return (dispatch) => {
    return getApi().projects.delete(id)
      .then(() => dispatch({
        type: types.DELETE_PROJECT,
        payload: { id },
      }));
  };
}

const getProjectsStore = state => state.projects;

export const getProjects = createSelector(
  getProjectsStore,
  projectsStore => get(projectsStore, 'projects'),
);

function getProjectIdFromProps(state, props) {
  return Number(props.id);
}

export const getProject = createSelector(
  getProjectIdFromProps,
  getProjects,
  (projectId, projects) => find(projects, { id: projectId }),
);