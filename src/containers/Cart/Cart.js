import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { TrackCartEntry, ReleaseCartEntry } from 'components';

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
      <div className="row cart">
          <table className="col-lg-12">
            <thead>
              <tr>
                <th>Cover </th>
                <th>Name</th>
                <th>Artists</th>
                <th>Label</th>
                <th>Amount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Tax Number%:</td>
                  <td>Tax cost</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Shipping:</td>
                  <td>Shipping cost? </td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td> total money</td>
              </tr>
              <tr>
                  <td>
                      <button className="btn m-b-xs w-xs btn-primary">Buy</button>

                  </td>
              </tr>
            </tfoot>
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
    );
  }
}
