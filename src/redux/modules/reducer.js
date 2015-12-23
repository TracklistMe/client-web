import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import track from './track';
import release from './release';
import earlyUser from './earlyUser';
import player from './player';
import genre from './genre';
import artist from './artist';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets,
  track,
  release,
  earlyUser,
  player,
  artist,
  genre
});
