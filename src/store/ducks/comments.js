import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import find from 'lodash/find';
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

function getProjectIdFromProps(state, props) {
  return Number(props.projectId);
}

function getCommentIdFromProps(state, props) {
  return Number(props.id);
}

const getCommentsStore = state => state.comments;

export const getProjectComments = createSelector(
  getCommentsStore,
  getProjectIdFromProps,
  (commentsStore, projectId) => get(commentsStore, `projects.${projectId}`),
);

export const getProjectComment = createSelector(
  getCommentIdFromProps,
  getProjectComments,
  (commentId, projectComments) => find(projectComments, { id: commentId }),
);