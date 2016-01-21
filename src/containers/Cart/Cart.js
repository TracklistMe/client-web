import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { TrackCartEntry, ReleaseCartEntry} from 'components';

@connect(
  state => ({cart: state.cart})
  )
export default class Cart extends Component {
  static propTypes = {
    cart: PropTypes.object
  }
  render() {
    const {cart} = this.props;
    if (!cart) {
      return (
        <div></div>
      );
    }
    return (
      <div className="cartPage">
        <div className="row cart">
          <h1>Your shopping cart</h1>
          <h3>{cart.totalBasketItems} tracks added</h3>
          <table className="col-sm-12">
            <tbody>
            {cart.basket.map(function createEntries(item, index) {
              if (!item.data.Tracks) {
                // this is a track
                return <TrackCartEntry key={index} item={item} currencySymbol={cart.currency.symbol} />;
              }
              if (item.data.Tracks) {
                // this is a release
                return <ReleaseCartEntry key={index} item={item} currencySymbol={cart.currency.symbol} />;
              }
            }
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
