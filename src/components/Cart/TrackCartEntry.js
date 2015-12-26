import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';
// import {addTrackToCart} from 'redux/modules/cart';

export default class TrackCartEntry extends Component {
  render() {
    return (
      <tr className="cartEntry trackCartEntry" key={this.props.key}>
        <td className="cover">
          <img src={apiEndPoint() + '/images/' + this.props.item.data.cover} />
        </td>
        <td>{this.props.item.data.title + ' (' + this.props.item.data.version + ')'}</td>
        <td>Artists</td>
        <td>
        {this.props.item.data.Releases[0].Labels[0].displayName}
        </td>
        <td>{this.props.item.price} {this.props.currencySymbol}</td>
        <td>{this.props.item.total} {this.props.currencySymbol}</td>
      </tr>
    );
  }
}

TrackCartEntry.propTypes = {
  key: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string,
  item: PropTypes.object
};
