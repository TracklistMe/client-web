// Load cart informations
const CART_LOAD_CURRENCY_INFORMATIONS = 'CART_LOAD_CURRENCY_INFORMATIONS';
const CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS = 'CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS';
const CART_LOAD_CURRENCY_INFORMATIONS_FAILURE = 'CART_LOAD_CURRENCY_INFORMATIONS_FAILURE';

// Load the element in the cart
const CART_LOAD_ENTRIES = 'CART_LOAD_ENTRIES';
const CART_LOAD_ENTRIES_SUCCESS = 'CART_LOAD_ENTRIES_SUCCESS';
const CART_LOAD_ENTRIES_FAILURE = 'CART_LOAD_ENTRIES_FAILURE';

const initialState = {
  currency: {
    name: '', // currency Name
    ISOName: '',   // the ISO name of the currency (ie.: $ -> USD)
    symbol: '', // the currency symbol
    id: -1 // the currency Id
  },
  convertedPriceTable: {},
  totalBasketItems: 0,
  basket: []
};

class BasketItem {
  constructor(id, price, quantity, data) {
    console.log('Create a new element');
    this.id = id;
    this.price = price;
    this._quantity = quantity;
    this.data = data;
  }
  get total() {
    return this._quantity * this.price;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(value) {
    this._quantity = value;
  }
}

// you didn't name this reducer like the spec says!!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CART_LOAD_CURRENCY_INFORMATIONS:
      return state;
    case CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS:
      console.log(action.result);
      const convertedPriceTableArray = [];
      for (let index = 0; index < action.result.ConvertedPrices.length; index++) {
        convertedPriceTableArray[action.result.ConvertedPrices[index].MasterPrice] =
        action.result.ConvertedPrices[index].price;
      }
      return {
        ...state,
        currency: {
          name: action.result.name,
          id: action.result.id,
          ISOName: action.result.shortname,
          symbol: action.result.symbol
        },
        convertedPriceTable: convertedPriceTableArray
      };
    case CART_LOAD_CURRENCY_INFORMATIONS_FAILURE:
      return state;
    case CART_LOAD_ENTRIES:
      return state;
    case CART_LOAD_ENTRIES_SUCCESS:
      const remoteBasket = [];
      let totalBasketItems = 0;
      for (let index = 0; index < action.result.length; index++) {
        const unifiedId = (action.result[index].TrackId) ?
          'track-' + action.result[index].TrackId :
          'release-' + action.result[index].ReleaseId;
        let item = null;
        if (action.result[index].TrackId) {
          // it's a track
          item = new BasketItem(
            unifiedId,
            state.convertedPriceTable[action.result[index].Track.Price],
            1,
            action.result[index].Track
          );
          totalBasketItems++;
        } else {
          // It's a release.
          // We need to calculate the price. The price can be either a bundle
          // or the sum of all the prices of the single tracks included in the release.
          let totalPrice;
          if (action.result[index].Release.Price) {
            // I have a price for the bundle;
            console.log('this release has price');
            totalPrice = state.convertedPriceTable[action.result[index].Release.Price];
          } else {
            totalPrice = 0;
            for (const track of action.result[index].Release.Tracks) {
              totalPrice += state.convertedPriceTable[track.Price];
            }
          }

          item = new BasketItem(
            unifiedId,
            totalPrice,
            1,
            action.result[index].Release
          );
          totalBasketItems += action.result[index].Release.Tracks.length;
        }
        // Verify if the item is not already available in the current snapshot of the store, otherwise just add it.
        let found = false;
        for (let indexElement = 0; indexElement < remoteBasket.length; indexElement++) {
          console.log('comparing', remoteBasket[indexElement].id, item.id);
          if (remoteBasket[indexElement].id === item.id) {
            found = true;
            remoteBasket[indexElement].quantity += item.quantity;
          }
        }
        if (!found) {
          remoteBasket.push(item);
        }
      }
      return {
        ...state,
        basket: remoteBasket,
        totalBasketItems: totalBasketItems
      };
    case CART_LOAD_ENTRIES_FAILURE:
      return state;
    default:
      return state;
  }
}

export function loadCartInformations() {
  return {
    types: [CART_LOAD_CURRENCY_INFORMATIONS, CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS, CART_LOAD_CURRENCY_INFORMATIONS_FAILURE],
    promise: client => client.get('/me/cart/currency')
  };
}

export function loadCartEntries() {
  return {
    types: [CART_LOAD_ENTRIES, CART_LOAD_ENTRIES_SUCCESS, CART_LOAD_ENTRIES_FAILURE],
    promise: client => client.get('/me/cart')
  };
}

export function addReleaseToCart(id) {
  return {
    types: [CART_LOAD_ENTRIES, CART_LOAD_ENTRIES_SUCCESS, CART_LOAD_ENTRIES_FAILURE],
    promise: client => client.get('/me/cart/release/' + id)
  };
}

export function addTrackToCart(id) {
  return {
    types: [CART_LOAD_ENTRIES, CART_LOAD_ENTRIES_SUCCESS, CART_LOAD_ENTRIES_FAILURE],
    promise: client => client.get('/me/cart/track/' + id)
  };
}
