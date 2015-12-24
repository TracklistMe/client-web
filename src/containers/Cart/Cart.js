import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

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
      <div>
        <DocumentMeta title="Tracklist.me : Cart" />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h1>Cart Name: {cart.currency.name} - </h1>
      </div>
    );
  }
}
