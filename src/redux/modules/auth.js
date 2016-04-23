import md5 from 'md5';
import cookie from 'react-cookie';
const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const LOAD_AUTH_COOKIE = 'LOAD_AUTH_COOKIE';
const LOAD_PERSONAL_TRACKLIST = 'LOAD_PERSONAL_TRACKLIST';
const LOAD_PERSONAL_TRACKLIST_SUCCESS = 'LOAD_PERSONAL_TRACKLIST_SUCCESS';
const LOAD_PERSONAL_TRACKLIST_FAIL = 'LOAD_PERSONAL_TRACKLIST_FAIL';

const initialState = {
  loaded: false,
  token: null,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        logged: false,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      // Token in action.result.token;
      cookie.save('loginResult', action.result);
      return {
        ...state,
        logged: true,
        loggingIn: false,
        token: action.result.token,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logged: false,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      cookie.remove('loginResult');
      return {
        ...state,
        loggingOut: false,
        logged: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case LOAD_AUTH_COOKIE:
      console.log('AUTH COOKIE');
      const loginResult = cookie.load('loginResult');
      const isLogged = loginResult ? true : false;
      const user = isLogged ? loginResult.user : null;
      return {
        ...state,
        user,
        logged: isLogged
      };
    case LOAD_PERSONAL_TRACKLIST:
      return state;
    case LOAD_PERSONAL_TRACKLIST_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          tracklists: action.result
        }
      };
    case LOAD_PERSONAL_TRACKLIST_FAIL:
      return state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  // This is invoked by routees.
  // globalState.auth is the state of this current reducer.
  // we are checking if it does exists, and we should check if we have
  // the token
  return globalState.auth && globalState.auth.token;
}

export function loadAuthCookie() {
  return {
    type: LOAD_AUTH_COOKIE
  };
}

export function loadPersonalInfo() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/me')
  };
}

export function loadPersonalTracklists() {
  return {
    types: [LOAD_PERSONAL_TRACKLIST, LOAD_PERSONAL_TRACKLIST_SUCCESS, LOAD_PERSONAL_TRACKLIST_FAIL],
    promise: (client) => client.get('/me/tracklists')
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {
      data: {
        email: email,
        password: md5(password)
      }
    })
  };
}

export function logout() {
  return { type: LOGOUT_SUCCESS };
  // Logout with remote API call
  /*
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
  */
}
