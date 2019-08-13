import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import getApi from '../../services/api';
import { convertFromBackend } from '../../utils/comments';

const types = {
  PROJECTS: {
    SET: 'comments/projects/LIST',
    ADD: 'comments/projects/ADD',
    DELETE: 'comments/projects/DELETE',
  },
  TASKS: {
    SET: 'comments/tasks/LIST',
    ADD: 'comments/tasks/ADD',
    DELETE: 'comments/tasks/DELETE',
  },
};

const INITIAL_STATE = {
  projects: {},
  tasks: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.PROJECTS.SET: {
      const { comments, projectId } = action.payload;
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: comments.map(convertFromBackend),
        },
      };
    }
    case types.PROJECTS.ADD: {
      const { comment, projectId } = action.payload;
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: [
            ...state.projects[projectId],
            convertFromBackend(comment),
          ],
        }
      };
    }
    case types.PROJECTS.DELETE: {
      const { id: deletedId, projectId } = action.payload;
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: filter(state.projects[projectId], ({ id: commentId }) => commentId !== deletedId),
        },
      };
    }
    case types.TASKS.SET: {
      const { comments, taskId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: comments.map(convertFromBackend),
        },
      };
    }
    case types.TASKS.ADD: {
      const { comment, taskId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: [
            ...state.tasks[taskId],
            convertFromBackend(comment),
          ],
        }
      };
    }
    case types.TASKS.DELETE: {
      const { id: deletedId, taskId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: filter(state.tasks[taskId], ({ id: commentId }) => commentId !== deletedId),
        },
      };
    }
    default:
      return state;
  }
}

export function fetchProjectComments(projectId) {
  return (dispatch) => {
    return getApi().projects.comments.list(projectId)
      .then((comments) => {
        dispatch({
          type: types.PROJECTS.SET,
          payload: { comments, projectId },
        });
      });
  };
}

export function createProjectComment(projectId, { body }) {
  return (dispatch) => {
    return getApi().projects.comments.create(projectId, body)
      .then((comment) => dispatch({
        type: types.PROJECTS.ADD,
        payload: { projectId, comment },
      }));
  };
}

export function deleteProjectComment(projectId, id) {
  return (dispatch) => {
    return getApi().projects.comments.delete(projectId, id)
      .then(() => dispatch({
        type: types.PROJECTS.DELETE,
        payload: { projectId, id },
      }));
  };
}

export function fetchTaskComments(projectId, taskId) {
  return (dispatch) => {
    return getApi().tasks.comments.list(projectId, taskId)
      .then((comments) => {
        dispatch({
          type: types.TASKS.SET,
          payload: { comments, taskId },
        });
      });
  };
}

export function createTaskComment(projectId, taskId, { body }) {
  return (dispatch) => {
    return getApi().tasks.comments.create(projectId, taskId, body)
      .then((comment) => dispatch({
        type: types.TASKS.ADD,
        payload: { taskId, comment },
      }));
  };
}

export function deleteTaskComment(projectId, taskId, id) {
  return (dispatch) => {
    return getApi().tasks.comments.delete(projectId, taskId, id)
      .then(() => dispatch({
        type: types.TASKS.DELETE,
        payload: { taskId, id },
      }));
  };
}

function getProjectIdFromProps(state, props) {
  return Number(props.projectId);
}

function getTaskIdFromProps(state, props) {
  return Number(props.taskId);
}

const getCommentsStore = state => state.comments;

export const getProjectComments = createSelector(
  getCommentsStore,
  getProjectIdFromProps,
  (commentsStore, projectId) => get(commentsStore, `projects.${projectId}`),
);

export const getTaskComments = createSelector(
  getCommentsStore,
  getTaskIdFromProps,
  (commentsStore, taskId) => get(commentsStore, `tasks.${taskId}`),
);
