/*
Ducks for User onboarding

1) Lockup if the email is available
2) ask if the user is an artist
3) ask if the user is a label and register the user on the answer received
// TODO (bortigon): decouple the setState of the IsLabel and the call to register the email


 */


const EMAIL_REGISTRATION = 'EMAIL_REGISTRATION';
const EMAIL_REGISTRATION_SUCCESS = 'EMAIL_REGISTRATION_SUCCESS';
const EMAIL_REGISTRATION_FAILURE = 'EMAIL_REGISTRATION_FAILURE';
const EMAIL_LOOKUP = 'EMAIL_LOOKUP';
const EMAIL_LOOKUP_SUCCESS = 'EMAIL_LOOKUP_SUCCESS';
const EMAIL_LOOKUP_FAILURE = 'EMAIL_LOOKUP_FAILURE';

const IS_ARTIST = 'IS_ARTIST';
const IS_LABEL = 'IS_LABEL';

const initialState = {
  phase: 0,   // I would just make this what "page" you are on in the multistep process
  earlyUser: {}  // Better null or undefined than {} if no data
};

// you didn't name this reducer like the spec says!!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case EMAIL_LOOKUP:
      return {
        ...state,
        registering: true
      };
    case EMAIL_LOOKUP_SUCCESS:
      console.log('email exists ');
      return {
        // at the moment i'm not using this for anything
        ...state,
        registering: false
      };
    case EMAIL_LOOKUP_FAILURE:
      // TODO(bortignon): have a better semanting handling of the code error
      // for now we assueme that it always return a 404 when a error is detected
      return {
        ...state,
        registering: false, // hide indicator
        registrationError: action.error, // error is set by client middleware
        phase: 1, // shows this step is done and ready for next step
        earlyUser: {
          ...state.earlyUser,
          email: action.email
        }
      };
    case EMAIL_REGISTRATION:
      console.log('registering');
      return {
        ...state, // destructuring is AWESOME. Learn it. I much prefer it to
                  // Object.assign, which babel transpiles it down to.
        registering: true // I prefer booleans to keeping action types in state.
                          // booleans also make it easy to do
                          // {registering && <div className="indicator"/>} in jsx
      };
    case EMAIL_REGISTRATION_SUCCESS:
      console.log('success');
      return {
        ...state,
        earlyUser: action.result, // result is set by client middleware
        phase: 3,            // shows this step is done and ready for next step
        registering: false   // hide indicator
      };
    case EMAIL_REGISTRATION_FAILURE:
      console.log('fail');
      return {
        ...state,
        registering: false,             // hide indicator
        registrationError: action.error // error is set by client middleware
      };
    case IS_ARTIST:
      console.log('set is Artist');
      return {
        ...state,
        phase: 2,
        earlyUser: {
          ...state.earlyUser,
          isArtist: action.isArtist
        }
      };
    case IS_LABEL:
      console.log('updating label');
      return {
        ...state,
        earlyUser: {
          ...state.earlyUser,
          isLabel: action.isLabel
        }
      };
    default:
      return state;
  }
}

// API calls
export function lookupEmail(data) {
  console.log('redux called ');
  console.log(data);
  return {
    types: [EMAIL_LOOKUP, EMAIL_LOOKUP_SUCCESS, EMAIL_LOOKUP_FAILURE],
    email: data.email,
    promise: client => client.get('/earlyUsers/search/' + data.email)
  };
}

// API calls
export function registerUser(earlyUser) {
  console.log('ok lets register this user ');
  console.log(earlyUser);
  return {
    types: [EMAIL_REGISTRATION, EMAIL_REGISTRATION_SUCCESS, EMAIL_REGISTRATION_FAILURE],
    promise: (client) => client.post('/earlyUsers', {
      data: earlyUser
    })


  };
}

// Simple changes in status
export function setIsArtist(isArtist) {
  return { type: IS_ARTIST, isArtist };
}
export function setIsLabel(isLabel) {
  return { type: IS_LABEL, isLabel };
}
