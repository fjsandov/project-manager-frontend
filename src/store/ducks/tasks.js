import { createSelector } from 'reselect';
import get from 'lodash/get';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { goBack } from 'connected-react-router';
import getApi from '../../services/api';
import { convertFromBackend } from '../../utils/tasks';

const types = {
  SET_TASKS: 'tasks/LIST',
  ADD_TASK: 'tasks/ADD',
  UPDATE_TASK: 'tasks/UPDATE',
  DELETE_TASK: 'tasks/DELETE',
};

const INITIAL_STATE = {
  tasks: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_TASKS: {
      const { tasks, projectId } = action.payload;
      return {
        ...state,
        tasks: { ...state.tasks, [projectId]: tasks.map(convertFromBackend) },
      };
    }
    case types.ADD_TASK: {
      const { task, projectId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: [...state.tasks[projectId], convertFromBackend(task)],
        },
      };
    }
    case types.UPDATE_TASK: {
      const { task, projectId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: state.tasks[projectId].map(originalTask => {
              return originalTask.id === task.id
                ? convertFromBackend(task)
                : originalTask;
            }),
        },
      };
    }
    case types.DELETE_PROJECT: {
      const { id: deletedId, projectId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [projectId]: filter(state.tasks[projectId], ({ id: taskId }) => taskId !== deletedId),
        },
      };
    }
    default:
      return state;
  }
}

export function fetchTasks(projectId) {
  return (dispatch) => {
    return getApi().tasks.list(projectId)
      .then((tasks) => {
        dispatch({
          type: types.SET_TASKS,
          payload: { tasks, projectId },
        });
      });
  };
}

export function createTask({ projectId, title, description, status, priority, deadline }) {
  return (dispatch) => {
    return getApi().tasks.create(projectId, title, description, status, priority, deadline)
      .then((task) => dispatch({
        type: types.ADD_TASK,
        payload: { task, projectId },
      }))
      .then(() => dispatch(goBack()));
  };
}

export function updateTask({ projectId, id, title, description, status, priority, deadline }) {
  return (dispatch) => {
    return getApi().tasks.update(projectId, id, title, description, status, priority, deadline)
      .then((task) => dispatch({
        type: types.UPDATE_TASK,
        payload: { task, projectId },
      }))
      .then(() => dispatch(goBack()));
  };
}

export function deleteTask(projectId, id) {
  return (dispatch) => {
    return getApi().tasks.delete(projectId, id)
      .then(() => dispatch({
        type: types.DELETE_TASK,
        payload: { id, projectId },
      }));
  };
}

function getProjectIdFromProps(state, props) {
  return Number(props.projectId);
}

function getTaskIdFromProps(state, props) {
  return Number(props.id);
}

const getTasksStore = state => state.tasks;

export const getTasks = createSelector(
  getTasksStore,
  getProjectIdFromProps,
  (tasksStore, projectId) => get(tasksStore, `tasks.${projectId}`),
);

export const getTask = createSelector(
  getTaskIdFromProps,
  getTasks,
  (taskId, tasks) => find(tasks, { id: taskId }),
);