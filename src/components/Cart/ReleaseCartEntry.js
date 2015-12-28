import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addReleaseToCart, removeReleaseFromCart} from 'redux/modules/cart';

@connect(
    state => ({cart: state.cart}),
    dispatch => bindActionCreators({addReleaseToCart, removeReleaseFromCart}, dispatch))
export default class ReleaseCartEntry extends Component {
  static propTypes = {
    key: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string,
    item: PropTypes.object,
    addReleaseToCart: PropTypes.func.isRequired,
    removeReleaseFromCart: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleAddRelease = this.handleAddRelease.bind(this);
    this.handleRemoveRelease = this.handleRemoveRelease.bind(this);
  }

  handleAddRelease() {
    console.log('handler cliekced');
    this.props.addReleaseToCart(this.props.item.data.id);
  }

  handleRemoveRelease() {
    this.props.removeReleaseFromCart(this.props.item.data.id, this.props.item.data.Tracks.length);
  }
  render() {
    return (
      <tr className="cartEntry trackCartEntry" key={this.props.key}>
        <td className="cover">
          <button onClick={this.handleAddRelease} >+</button>
          <img src={apiEndPoint() + '/images/' + this.props.item.data.cover} />
          <button onClick={this.handleRemoveRelease} >-</button>
        </td>
        <td>{this.props.item.data.title}</td>
        <td>Artists</td>
        <td>
          {this.props.item.data.Labels[0].displayName}
        </td>
        <td>{this.props.item.price} {this.props.currencySymbol}</td>
        <td>{this.props.item.total} {this.props.currencySymbol}</td>
      </tr>
    );
  }
}
