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
      logout: (jwtToken) => authJsonFetch('logout', {
        method: 'DELETE',
      }, jwtToken),
    },
  }
}
