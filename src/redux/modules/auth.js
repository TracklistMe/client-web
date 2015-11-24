import md5 from 'md5';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const LOAD_TOKEN_FROM_LOCAL_STORAGE = 'LOAD_TOKEN_FROM_LOCAL_STORAGE';
const initialState = {
  loaded: false,
  token: null,
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
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.result.token);
      return {
        ...state,
        loggingIn: false,
        token: action.result.token,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
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
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case LOAD_TOKEN_FROM_LOCAL_STORAGE:
      return {
        ...state,
        token: action.token,
      };
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

export function loadLocalStorage() {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('found a token localstorage ' + token);
    return { type: LOAD_TOKEN_FROM_LOCAL_STORAGE, token };
  }
}
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/me')
  };
}

export function login(email, password) {
  console.log(password);
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
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
