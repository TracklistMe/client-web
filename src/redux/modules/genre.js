const LOAD = 'LOAD';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';
const LOAD_GENRE = 'SELECT_GENRE';
const LOAD_GENRE_SUCCESS = 'LOAD_GENRE_SUCCESS';
const LOAD_GENRE_FAIL = 'LOAD_GENRE_FAIL';
const UNLOAD_GENRE = 'UNLOAD_GENRE';


const initialState = {
  loading: false,
  genres: null,
  selectGenre: null
};

export default function release(state = initialState, action = {}) {
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
        genres: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case LOAD_GENRE:
      return state;
    case LOAD_GENRE_SUCCESS:
      return {
        ...state,
        selectGenre: action.result
      };
    case LOAD_GENRE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case UNLOAD_GENRE:
      console.log('ACTION CALLED FOR UNLOAD');
      return {
        ...state,
        selectGenre: null
      };
    default:
      return state;
  }
}

export function load() {
  return {
    promise: (client) => client.get('/genres/'),
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL]
  };
}

export function loadGenre(id) {
  return {
    promise: (client) => client.get('/genres/' + id),
    types: [LOAD_GENRE, LOAD_GENRE_SUCCESS, LOAD_GENRE_FAIL]
  };
}

export function unloadGenre() {
  console.log(' unload redux called ');
  return {
    type: UNLOAD_GENRE
  };
}
