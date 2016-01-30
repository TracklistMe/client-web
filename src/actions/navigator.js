
import * as types from '../constants/ActionTypes';
import {constructUrl, parseUrl} from '../utils/RouteUtils';

export function changePath(route) {
  return {
    type: types.CHANGE_PATH,
    route: route
  };
}

function pushState(route) {
  history.pushState({route}, '', '#/' + constructUrl(route));
}

export function navigateTo(route, shouldPushState = true) {
  return (dispatch, getState) => {
    const {navigator} = getState();
    if (constructUrl(route) !== constructUrl(navigator.route)) {
      if (shouldPushState) {
        pushState(route);
      }
      return dispatch(changePath(route));
    }
  };
}

export function navigateBack(event) {
  return dispatch => {
    if (event.state) {
      return dispatch(navigateTo(event.state.route, false));
    }
  };
}

export function initNavigator() {
  return dispatch => {
    window.onpopstate = event => {
      dispatch(navigateBack(event));
    };
    if (window.location.hash !== '') {
      dispatch(navigateTo(parseUrl(window.location.hash)));
    }
  };
}
