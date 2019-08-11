import { createSelector } from 'reselect';
import get from 'lodash/get';
import getApi from '../../services/api';

const types = {
  SIGN_UP: 'sessions/SIGN_UP',
  LOGIN: 'sessions/LOGIN',
  LOGOUT: 'sessions/LOGOUT',
  SIGN_UP_SUCCESS: 'sessions/SIGN_UP_SUCCESS',
  LOGIN_SUCCESS: 'sessions/LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'sessions/LOGOUT_SUCCESS',
};

const INITIAL_STATE = {
  jwtToken: undefined,
  userId: undefined,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const { jwtToken, userId } = action.payload;
      return { ...state, jwtToken, userId };
    }
    case types.LOGOUT_SUCCESS: {
      return { ...state, ...INITIAL_STATE };
    }
    default:
      return state;
  }
}

export function login({ email, password }) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN });
    return getApi().session.login(email, password)
      .then((response) => {
        console.log('login complete', response);
        const { jwtToken, userId } = response;
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: { jwtToken, userId },
        });
      });
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: types.LOGOUT });
    return getApi().session.logout()
      .then(() => {
        dispatch({ type: types.LOGOUT_SUCCESS });
      });
  };
}

export function signUp({ email, password, passwordConfirmation }) {
  return (dispatch) => {
    dispatch({ type: types.SIGN_UP });
    return getApi().session.signUp(email, password, passwordConfirmation)
      .then((response) => {
        console.log('signUp complete', response);
        const { id: jwtToken, userId } = response;
        dispatch({
          type: types.SIGN_UP_SUCCESS,
          payload: { jwtToken, userId },
        });
      });
  };
}

const getSession = state => state.session;

export const getJwtToken = createSelector(
  getSession,
  session => get(session, 'jwtToken'),
);

export const getCurrentUserId = createSelector(
  getSession,
  session => get(session, 'userId'),
);

export const getIsSignedIn = createSelector(
  getJwtToken,
  jwtToken => Boolean(jwtToken),
);