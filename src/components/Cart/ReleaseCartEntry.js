import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AddRemoveCounter} from 'components';
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
      <tr className="cartEntry" key={this.props.key}>
        <td colSpan="8">
          <table>
            <tr>
              <td className="coverTD">
                <img className="cover" src={apiEndPoint() + '/images/' + this.props.item.data.cover} />
              </td>
              <td className="titleTD">{this.props.item.data.title}</td>
              <td className="artistTD">Artists</td>
              <td className="labelTD">
                {this.props.item.data.Labels[0].displayName}
              </td>
              <td className="genreTD">genre</td>
              <td className="lengthTD">Length</td>
              <td className="addRemoveButtonTD">
                <AddRemoveCounter addHandler={this.handleAddRelease}
                                    counter={this.props.item.quantity}
                                    removeHandler={this.handleRemoveRelease} />
              </td>
              <td className="costTD">{this.props.item.total} {this.props.currencySymbol}</td>
            </tr>
          </table>
        </td>
      </tr>
    );
  }
}
