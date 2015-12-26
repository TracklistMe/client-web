import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';

export default class ReleaseCartEntry extends Component {
  render() {
    console.log(this.props.item);
    return (
      <tr className="cartEntry trackCartEntry" key={this.props.key}>
        <td className="cover">
          +
          <img src={apiEndPoint() + '/images/' + this.props.item.data.cover} />
          -
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

ReleaseCartEntry.propTypes = {
  key: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string,
  item: PropTypes.object
};
