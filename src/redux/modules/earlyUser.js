const EMAIL_REGISTRATION = 'EMAIL_REGISTRATION';
const EMAIL_REGISTRATION_SUCCESS = 'EMAIL_REGISTRATION_SUCCESS';
const EMAIL_REGISTRATION_FAILURE = 'EMAIL_REGISTRATION_FAILURE';

const initialState = {
  phase: 0,   // I would just make this what "page" you are on in the multistep process
  user: null  // Better null or undefined than {} if no data
};

// you didn't name this reducer like the spec says!!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
        user: action.result, // result is set by client middleware
        phase: 1,            // shows this step is done and ready for next step
        registering: false   // hide indicator
      };
    case EMAIL_REGISTRATION_FAILURE:
      console.log('fail');
      return {
        ...state,
        registering: false,             // hide indicator
        registrationError: action.error // error is set by client middleware
      };
    default:
      return state;
  }
}

export function registerEmail(data) {
  console.log('redux called ');
  console.log(data);
  return {
    types: [EMAIL_REGISTRATION, EMAIL_REGISTRATION_SUCCESS, EMAIL_REGISTRATION_FAILURE],
    promise: client => client.post('/earlyUsers/', {data})
  };
}
