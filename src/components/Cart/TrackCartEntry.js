import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { AddRemoveCounter } from 'components';
import {addTrackToCart, removeTrackFromCart} from 'redux/modules/cart';

@connect(
    state => ({cart: state.cart}),
    dispatch => bindActionCreators({addTrackToCart, removeTrackFromCart}, dispatch))

export default class TrackCartEntry extends Component {
  static propTypes = {
    key: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string,
    item: PropTypes.object,
    addTrackToCart: PropTypes.func.isRequired,
    removeTrackFromCart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
  }

  handleAddTrack() {
    this.props.addTrackToCart(this.props.item.data.id);
  }

  handleRemoveTrack() {
    this.props.removeTrackFromCart(this.props.item.data.id);
  }

  render() {
    return (
      <tr className="cartEntry trackCartEntry" key={this.props.key}>
        <td className="coverTD">
          <img className="cover" src={apiEndPoint() + '/images/' + this.props.item.data.cover} />
        </td>
        <td>{this.props.item.data.title + ' (' + this.props.item.data.version + ')'}</td>
        <td>Artists</td>
        <td>
        {this.props.item.data.Releases[0].Labels[0].displayName}
        </td>
        <td>genre</td>
        <td>Length</td>
        <td><AddRemoveCounter addHandler={this.handleAddTrack} removeHandler={this.handleRemoveTrack} /></td>
        <td className="costTD">{this.props.item.total} {this.props.currencySymbol}</td>
      </tr>
    );
  }
}
