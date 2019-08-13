import {
  authJsonFetchBuilder,
  jsonFetch,
} from './fetch';
import configureStore from '../store';
import { getJwtToken } from '../store/ducks/session';

export default function getApi() {
  const store = configureStore();
  const authJsonFetch = authJsonFetchBuilder(store, getJwtToken);

  return {
    session: {
      signUp: (email, password, passwordConfirmation) => jsonFetch('signup', {
        method: 'POST',
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      }),
      login: (email, password) => jsonFetch('login', {
        method: 'POST',
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      }),
      logout: () => authJsonFetch('logout', {
        method: 'DELETE',
      }),
    },
    projects: {
      list: () => authJsonFetch('projects'),
      create: (name, projectType, startAt, endAt) => authJsonFetch('projects', {
        method: 'POST',
        body: JSON.stringify({
          project: {
            name,
            project_type: projectType,
            start_at: startAt,
            end_at: endAt,
          },
        }),
      }),
      update: (id, name, projectType, startAt, endAt) => authJsonFetch(`projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          project: {
            name,
            project_type: projectType,
            start_at: startAt,
            end_at: endAt,
          },
        }),
      }),
      delete: (id) => authJsonFetch(`projects/${id}`, {
        method: 'DELETE',
      }),
      comments: {
        list: (projectId) => authJsonFetch(`projects/${projectId}/comments`),
        create: (projectId, body) => authJsonFetch(`projects/${projectId}/comments`, {
          method: 'POST',
          body: JSON.stringify({
            comment: { body },
          }),
        }),
        delete: (projectId, id) => authJsonFetch(`projects/${projectId}/comments/${id}`, {
          method: 'DELETE',
        }),
      }
    },
    tasks: {
      list: (projectId) => authJsonFetch(`projects/${projectId}/tasks`),
      create: (projectId, title, description, status, priority, deadline) => authJsonFetch(`projects/${projectId}/tasks`, {
        method: 'POST',
        body: JSON.stringify({
          task: { title, description, status, priority, deadline },
        }),
      }),
      update: (projectId, id, title, description, status, priority, deadline) => authJsonFetch(`projects/${projectId}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          task: { title, description, status, priority, deadline },
        }),
      }),
      delete: (projectId, id) => authJsonFetch(`projects/${projectId}/tasks/${id}`, {
        method: 'DELETE',
      }),
      comments: {
        list: (projectId, taskId) => authJsonFetch(`projects/${projectId}/tasks/${taskId}/comments`),
        create: (projectId, taskId, body) => authJsonFetch(`projects/${projectId}/tasks/${taskId}/comments`, {
          method: 'POST',
          body: JSON.stringify({
            comment: { body },
          }),
        }),
        delete: (projectId, taskId, id) => authJsonFetch(`projects/${projectId}/tasks/${taskId}/comments/${id}`, {
          method: 'DELETE',
        }),
      }
    }
  }
}
