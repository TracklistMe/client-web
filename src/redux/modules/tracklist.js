const LOAD = 'tracklist/LOAD';
const LOAD_SUCCESS = 'tracklist/LOAD_SUCCESS';
const LOAD_FAIL = 'tracklist/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function tracklist(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('LOADED CORRECTLY');
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.tracklist && globalState.tracklist.loaded;
}

export function load(tracklistId) {
  console.log('Requestin tracklist ' + tracklistId);
  return {
    promise: (client) => client.get('/spotifyTracklist/' + tracklistId),
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL]
  };
}
