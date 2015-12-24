import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
      <div className="row">
        <br /><br /><br /><br /><br /><br /><br />
          <table className="col-lg-12 table table-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Quantity</th>
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
            {cart.basket.map((item, index) =>
              <tr key={index}>
                <td><span className="glyphicon glyphicon-remove"></span></td>
                <td>{item.name}</td>
                <td>
                <span className="glyphicon glyphicon-minus"></span>  Number
                    <span className="glyphicon glyphicon-plus"></span>
                </td>
                <td>Item Price / Currency</td>
                <td>Item Total / Currency</td>
              </tr>
            )}
            </tbody>
          </table>
      </div>
    );
  }
}
