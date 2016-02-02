import * as types from '../../constants/ActionTypes';
// Load cart informations
const PLAYER_ADD_TRACK = 'PLAYER_ADD_TRACK';
const PLAYER_ADD_TRACK_SUCCESS = 'PLAYER_ADD_TRACK_SUCCESS';
const PLAYER_ADD_TRACK_FAILURE = 'PLAYER_ADD_TRACK_FAILURE';

const initialState = {
  currentSongIndex: null,
  currentTime: 0,
  isPlaying: false,
  selectedPlaylists: [],
  playlist: []
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case PLAYER_ADD_TRACK:
      break;
    case PLAYER_ADD_TRACK_SUCCESS:
      break;
    case PLAYER_ADD_TRACK_FAILURE:
      break;
    case types.CHANGE_CURRENT_TIME:
      console.log(action.time);
      return {
        ...state,
        currentTime: action.time
      };
    case types.CHANGE_PLAYING_SONG:
      return Object.assign({}, state, {
        currentSongIndex: action.songIndex
      });
    case types.CHANGE_SELECTED_PLAYLISTS:
      return Object.assign({}, state, {
        selectedPlaylists: action.playlists
      });
    case types.RESET_AUTHED:
      return Object.assign({}, state, initialState);
    case types.TOGGLE_IS_PLAYING:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying
      });
    default:
      return state;
  }
}

export function addTrack(song, startingTime, waitInQueue) {
  return {
    types: [PLAYER_ADD_TRACK, PLAYER_ADD_TRACK_SUCCESS, PLAYER_ADD_TRACK_FAILURE],
    song: song,
    startingTime: startingTime,
    waitInQueue: waitInQueue
  };
}
