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
      update: (id, name, projectType, startAt, endAt) => authJsonFetch(`/projects/${id}`, {
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
      })
    }
  }
}
