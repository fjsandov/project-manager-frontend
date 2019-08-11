import { createSelector } from 'reselect';
import get from 'lodash/get';
import getApi from '../../services/api';

const types = {
  SIGN_UP: 'sessions/SIGN_UP',
  LOGIN: 'sessions/LOGIN',
  LOGOUT: 'sessions/LOGOUT',
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
      .then(({ jwtToken, userId }) => {
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
      .then(() => login({ email, password }));
  };
}

const getSession = state => state.session;

export const getJwtToken = createSelector(
  getSession,
  session => get(session, 'jwtToken'),
);

export const getIsSignedIn = createSelector(
  getJwtToken,
  jwtToken => Boolean(jwtToken),
);