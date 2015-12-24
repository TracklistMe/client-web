// Load cart informations
const CART_LOAD_CURRENCY_INFORMATIONS = 'CART_LOAD_CURRENCY_INFORMATIONS';
const CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS = 'CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS';
const CART_LOAD_CURRENCY_INFORMATIONS_FAILURE = 'CART_LOAD_CURRENCY_INFORMATIONS_FAILURE';

const initialState = {
  currency: {
    name: '', // currency Name
    ISOName: '',   // the ISO name of the currency (ie.: $ -> USD)
    symbol: '', // the currency symbol
    id: -1 // the currency Id
  },
  convertedPriceTable: []
};

// you didn't name this reducer like the spec says!!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CART_LOAD_CURRENCY_INFORMATIONS:
      return state;
    case CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        currency: {
          name: action.result.name,
          id: action.result.id,
          ISOName: action.result.shortname,
          symbol: action.result.symbol
        },
        convertedPriceTable: action.result.ConvertedPrices
      };
    case CART_LOAD_CURRENCY_INFORMATIONS_FAILURE:
      return state;
    default:
      return state;
  }
}

// API calls
export function loadCartInformations() {
  return {
    types: [CART_LOAD_CURRENCY_INFORMATIONS, CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS, CART_LOAD_CURRENCY_INFORMATIONS_FAILURE],
    promise: client => client.get('/me/cart/currency')
  };
}
