// Load cart informations
const CART_LOAD_CURRENCY_INFORMATIONS = 'CART_LOAD_CURRENCY_INFORMATIONS';
const CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS = 'CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS';
const CART_LOAD_CURRENCY_INFORMATIONS_FAILURE = 'CART_LOAD_CURRENCY_INFORMATIONS_FAILURE';

// Load the element in the cart
const CART_LOAD_ENTRIES = 'CART_LOAD_ENTRIES';
const CART_LOAD_ENTRIES_SUCCESS = 'CART_LOAD_ENTRIES_SUCCESS';
const CART_LOAD_ENTRIES_FAILURE = 'CART_LOAD_ENTRIES_FAILURE';

// Add a release or a track to the cart
const CART_ADD_RELEASE = 'CART_ADD_RELEASE';
const CART_ADD_RELEASE_SUCCESS = 'CART_ADD_RELEASE_SUCCESS';
const CART_ADD_RELEASE_FAILURE = 'CART_ADD_RELEASE_FAILURE';
const CART_ADD_TRACK = 'CART_ADD_TRACK';
const CART_ADD_TRACK_SUCCESS = 'CART_ADD_TRACK_SUCCESS';
const CART_ADD_TRACK_FAILURE = 'CART_ADD_TRACK_FAILURE';

// Remove a release or a track from the cart
const CART_REMOVE_RELEASE = 'CART_REMOVE_RELEASE';
const CART_REMOVE_RELEASE_SUCCESS = 'CART_REMOVE_RELEASE_SUCCESS';
const CART_REMOVE_RELEASE_FAILURE = 'CART_REMOVE_RELEASE_FAILURE';
const CART_REMOVE_TRACK = 'CART_REMOVE_TRACK';
const CART_REMOVE_TRACK_SUCCESS = 'CART_REMOVE_TRACK_SUCCESS';
const CART_REMOVE_TRACK_FAILURE = 'CART_REMOVE_TRACK_FAILURE';


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

function calculateReleasePrice(release, conversionTable) {
  let totalPrice;
  if (release.Price) {
    // I have a price for the bundle;
    totalPrice = conversionTable[release.Price];
  } else {
    totalPrice = 0;
    for (const track of release.Tracks) {
      totalPrice += conversionTable[track.Price];
    }
  }
  return totalPrice;
}

function addItemToBasket(basket, itemToAdd) {
  // Verify if the item is not already available in the current snapshot of the store, otherwise just add it.
  let found = false;
  for (let indexElement = 0; indexElement < basket.length; indexElement++) {
    console.log(basket[indexElement].id, itemToAdd.id);
    if (basket[indexElement].id === itemToAdd.id) {
      found = true;
      basket[indexElement].quantity += itemToAdd.quantity;
    }
  }
  if (!found) {
    basket.push(itemToAdd);
  }
  return basket;
}

function removeItemFromBasket(basket, itemToRemove) {
  for (let indexElement = 0; indexElement < basket.length; indexElement++) {
    if (basket[indexElement].id === itemToRemove.id) {
      basket[indexElement].quantity -= 1;
      if (basket[indexElement].quantity === 0) {
        basket.splice(indexElement, 1);
      }
    }
  }
  return basket;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CART_ADD_RELEASE:
      return state;
    case CART_ADD_RELEASE_SUCCESS:
      const addedRelease = action.result.Release;
      let price = calculateReleasePrice(
            addedRelease,
            state.convertedPriceTable);
      let item = new BasketItem(
            'release-' + addedRelease.id,
            price,
            1,
            addedRelease
          );
      let basket = addItemToBasket(state.basket, item);
      let totalBasketItems = state.totalBasketItems + addedRelease.Tracks.length;
      return {
        ...state,
        basket: basket,
        totalBasketItems: totalBasketItems
      };
    case CART_ADD_RELEASE_FAILURE:
      return state;
    case CART_ADD_TRACK:
      return state;
    case CART_ADD_TRACK_SUCCESS:
      console.log('acction adding track');
      const addedTrack = action.result.Track;
      price = state.convertedPriceTable[addedTrack.Price];
      item = new BasketItem(
            'track-' + addedTrack.id,
            price,
            1,
            addedRelease
          );
      basket = addItemToBasket(state.basket, item);
      totalBasketItems = state.totalBasketItems + 1;
      return {
        ...state,
        basket: basket,
        totalBasketItems: totalBasketItems
      };
    case CART_ADD_TRACK_FAILURE:
      console.log('there were an error');
      return state;
    case CART_REMOVE_RELEASE:
      return state;
    case CART_REMOVE_RELEASE_SUCCESS:
      item = new BasketItem('release-' + action.id);
      basket = removeItemFromBasket(state.basket, item);
      totalBasketItems = state.totalBasketItems - action.quantity;
      return {
        ...state,
        basket: basket,
        totalBasketItems: totalBasketItems
      };
    case CART_REMOVE_RELEASE_FAILURE:
      return state;
    case CART_REMOVE_TRACK:
      return state;
    case CART_REMOVE_TRACK_SUCCESS:
      item = new BasketItem('track-' + action.id);
      basket = removeItemFromBasket(state.basket, item);
      totalBasketItems = state.totalBasketItems - 1;
      return {
        ...state,
        basket: basket,
        totalBasketItems: totalBasketItems
      };
    case CART_REMOVE_TRACK_FAILURE:
      return state;
    case CART_LOAD_CURRENCY_INFORMATIONS:
      return state;
    case CART_LOAD_CURRENCY_INFORMATIONS_SUCCESS:
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
      let remoteBasket = [];
      totalBasketItems = 0;
      for (let index = 0; index < action.result.length; index++) {
        const unifiedId = (action.result[index].TrackId) ?
          'track-' + action.result[index].TrackId :
          'release-' + action.result[index].ReleaseId;
        item = null;
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
          const totalPrice = calculateReleasePrice(
            action.result[index].Release,
            state.convertedPriceTable);

          item = new BasketItem(
            unifiedId,
            totalPrice,
            1,
            action.result[index].Release
          );
          totalBasketItems += action.result[index].Release.Tracks.length;
        }
        // Verify if the item is not already available in the current snapshot of the store, otherwise just add it.
        remoteBasket = addItemToBasket(remoteBasket, item);
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
    types: [CART_ADD_RELEASE, CART_ADD_RELEASE_SUCCESS, CART_ADD_RELEASE_FAILURE],
    promise: client => client.post('/me/cart/release/' + id)
  };
}

export function removeReleaseFromCart(id, quantity) {
  return {
    types: [CART_REMOVE_RELEASE, CART_REMOVE_RELEASE_SUCCESS, CART_REMOVE_RELEASE_FAILURE],
    id: id,
    quantity: quantity,
    promise: client => client.del('/me/cart/release/' + id)
  };
}

export function addTrackToCart(id) {
  return {
    types: [CART_ADD_TRACK, CART_ADD_TRACK_SUCCESS, CART_ADD_TRACK_FAILURE],
    promise: client => client.post('/me/cart/track/' + id)
  };
}

export function removeTrackFromCart(id, quantity) {
  return {
    types: [CART_REMOVE_TRACK, CART_REMOVE_TRACK_SUCCESS, CART_REMOVE_TRACK_FAILURE],
    id: id,
    quantity: quantity,
    promise: client => client.del('/me/cart/track/' + id)
  };
}
