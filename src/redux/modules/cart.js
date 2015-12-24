// Load cart informations
const CART_LOAD_CURRENCY_INFORMATIONS = 'CART_LOAD_CURRENCY_INFORMATIONS';
const CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS = 'CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS';
const CART_LOAD_CURRENCY_INFORMATIONS_FAILURE = 'CART_LOAD_CURRENCY_INFORMATIONS_FAILURE';

const initialState = {
  currency: {
  	ISOName: '',   // the ISO name of the currency
  	symbol: '', // the currency symbol
  	id: -1, // the currency Id
  	shortname: '', // the 3 letters short name of the currency (ie.: $ -> USD)
  },
  convertedPriceTable: []
};

// you didn't name this reducer like the spec says!!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CART_INFORMATIONS_LOAD:
      return {
        ...state,
        registering: true
      };
    case CART_INFORMATIONS_LOAD_SUCCESS:
      return {
        // at the moment i'm not using this for anything
        ...state,
        phase: 9,
        registering: false
      };
    case CART_INFORMATIONS_LOAD_FAILURE:
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
    default:
      return state;
  }
}

// API calls
export function loadCartInformations() {
  return {
    types: [CART_LOAD_CURRENCY_INFORMATIONS, CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS, CART_LOAD_CURRENCY_INFORMATIONS_FAILURE],
    email: data.email,
    promise: client => client.get('/me/cart/currency' + data.email)
  };
}
