/*
Ducks for User onboarding

1) Lockup if the email is available
2) ask if the user is an artist
3) ask if the user is a label and register the user on the answer received
// TODO (bortigon): decouple the setState of the IsLabel and the call to register the email


 */

import md5 from 'md5';

const EMAIL_REGISTRATION = 'EMAIL_REGISTRATION';
const EMAIL_REGISTRATION_SUCCESS = 'EMAIL_REGISTRATION_SUCCESS';
const EMAIL_REGISTRATION_FAILURE = 'EMAIL_REGISTRATION_FAILURE';

const EMAIL_LOOKUP = 'EMAIL_LOOKUP';
const EMAIL_LOOKUP_SUCCESS = 'EMAIL_LOOKUP_SUCCESS';
const EMAIL_LOOKUP_FAILURE = 'EMAIL_LOOKUP_FAILURE';

const EMAIL_CONFIRMATION = 'EMAIL_CONFIRMATION';
const EMAIL_CONFIRMATION_SUCCESS = 'EMAIL_CONFIRMATION_SUCCESS';
const EMAIL_CONFIRMATION_FAILURE = 'EMAIL_CONFIRMATION_FAILURE';

const REQUEST_CONFIRMATION_EMAIL = 'REQUEST_CONFIRMATION_EMAIL';
const REQUEST_CONFIRMATION_EMAIL_SUCCESS = 'REQUEST_CONFIRMATION_EMAIL_SUCCESS';
const REQUEST_CONFIRMATION_EMAIL_FAILURE = 'REQUEST_CONFIRMATION_EMAIL_FAILURE';

const SEND_FRIEND_INVITATION = 'SEND_FRIEND_INVITATION';
const SEND_FRIEND_INVITATION_SUCCESS = 'SEND_FRIEND_INVITATION_SUCCESS';
const SEND_FRIEND_INVITATION_FAILURE = 'SEND_FRIEND_INVITATION_FAILURE';

const IS_ARTIST = 'IS_ARTIST';
const IS_LABEL = 'IS_LABEL';

const INVITE_FRIEND = 'INVITE_FRIEND';

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
      return {
        // at the moment i'm not using this for anything
        ...state,
        phase: 9,
        registering: false
      };
    case EMAIL_LOOKUP_FAILURE:
      return {
        ...state,
        registering: false,
        registrationError: action.error,
        phase: 1,
        earlyUser: {
          ...state.earlyUser,
          email: action.email
        }
      };
    case EMAIL_REGISTRATION:
      console.log('registering');
      return {
        ...state,
        registering: true
      };
    case EMAIL_REGISTRATION_SUCCESS:
      console.log('success');
      return {
        ...state,
        earlyUser: action.result,
        phase: 4,
        registering: false
      };
    case EMAIL_REGISTRATION_FAILURE:
      return {
        ...state,
        registering: false,
        registrationError: action.error
      };
    case EMAIL_CONFIRMATION:
      return {
        ...state,
        registering: false
      };
    case EMAIL_CONFIRMATION_SUCCESS:
      console.log('receive fetching');
      return {
        ...state,
        phase: 7
      };
    case EMAIL_CONFIRMATION_FAILURE:
      return {
        ...state,
        phase: 8,
        confirmationError: action.error
      };
    case SEND_FRIEND_INVITATION:
      return {
        ...state,
        registering: true,
        confirmationError: null
      };
    case SEND_FRIEND_INVITATION_SUCCESS:
      return {
        ...state,
        phase: 11,
        registering: false
      };
    case SEND_FRIEND_INVITATION_FAILURE:
      return {
        ...state,
        registering: false,
        confirmationError: action.error
      };
    case REQUEST_CONFIRMATION_EMAIL:
      return {...state};
    case REQUEST_CONFIRMATION_EMAIL_SUCCESS:
      return {
        ...state,
        phase: 10
      };
    case REQUEST_CONFIRMATION_EMAIL_FAILURE:
      return {
        ...state,
        phase: -1
      };
    case IS_ARTIST:
      return {
        ...state,
        phase: 2,
        earlyUser: {
          ...state.earlyUser,
          isArtist: action.isArtist
        }
      };
    case IS_LABEL:
      return {
        ...state,
        phase: 3,
        earlyUser: {
          ...state.earlyUser,
          isLabel: action.isLabel
        }
      };
    case INVITE_FRIEND:
      return {
        ...state,
        phase: 5,
        confirmationError: null
      };
    default:
      return state;
  }
}

// API calls
export function lookupEmail(data) {
  return {
    types: [EMAIL_LOOKUP, EMAIL_LOOKUP_SUCCESS, EMAIL_LOOKUP_FAILURE],
    email: data.email,
    promise: client => client.get('/earlyUsers/search/' + data.email)
  };
}


export function registerUser(earlyUser) {
  return {
    types: [EMAIL_REGISTRATION, EMAIL_REGISTRATION_SUCCESS, EMAIL_REGISTRATION_FAILURE],
    promise: (client) => client.post('/earlyUsers', {
      data: earlyUser
    })
  };
}

export function confirmUser(verificationCode, id, password) {
  return {
    types: [EMAIL_CONFIRMATION, EMAIL_CONFIRMATION_SUCCESS, EMAIL_CONFIRMATION_FAILURE],
    promise: client => client.put('/earlyUsers/' + id + '/verify/', {
      data: {verificationCode, password: md5(password)}
    })
  };
}


export function requestConfirmationEmail(email) {
  return {
    types: [REQUEST_CONFIRMATION_EMAIL, REQUEST_CONFIRMATION_EMAIL_SUCCESS, REQUEST_CONFIRMATION_EMAIL_FAILURE],
    promise: client => client.post('/earlyUsers/' + email + '/requestVerificationEmail')
  };
}

export function inviteFriendEmail(inviterId, FriendEmail) {
  return {
    types: [SEND_FRIEND_INVITATION, SEND_FRIEND_INVITATION_SUCCESS, SEND_FRIEND_INVITATION_FAILURE],
    promise: client => client.post('/earlyUsers/' + inviterId + '/inviteFriend/' + FriendEmail)
  };
}

// Simple changes in status
export function setIsArtist(isArtist) {
  return { type: IS_ARTIST, isArtist };
}
export function setIsLabel(isLabel) {
  return { type: IS_LABEL, isLabel };
}

export function inviteMoreFriend() {
  return { type: INVITE_FRIEND };
}
