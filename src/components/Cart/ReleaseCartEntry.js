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
    currencySymbol: PropTypes.string,
    isExpanded: PropTypes.bool,
    item: PropTypes.object,
    addReleaseToCart: PropTypes.func.isRequired,
    removeReleaseFromCart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
    this.handleAddRelease = this.handleAddRelease.bind(this);
    this.handleRemoveRelease = this.handleRemoveRelease.bind(this);
    this.expandToggle = this.expandToggle.bind(this);
  }

  handleAddRelease() {
    console.log('handler cliekced');
    this.props.addReleaseToCart(this.props.item.data.id);
  }

  handleRemoveRelease() {
    this.props.removeReleaseFromCart(this.props.item.data.id, this.props.item.data.Tracks.length);
  }

  expandToggle() {
    this.setState({isExpanded: !this.state.isExpanded});
  }
  render() {
    // Each Row is 36px high
    const lineHeightPerRow = 36;
    // There is a space between the cover and the end of that row
    const lineForReleaseRow = 10;
    return (
      <tr className="cartEntry">
        <td colSpan="8">
          <table>
            <tbody>
              <tr>
                <td rowSpan={this.state.isExpanded && this.props.item.data.Tracks.length + 1 || '0'} className="coverTD tdNoCover">
                  <img className="cover" src={apiEndPoint() + '/images/' + this.props.item.data.cover} />
                  {this.state.isExpanded && <span className="verticalLine" style={{height: ((this.props.item.data.Tracks.length - 1) * lineHeightPerRow + lineHeightPerRow / 2 + lineForReleaseRow) + 'px'}}></span>}
                </td>
                <td className="titleTD forceHeight">{this.props.item.data.title}</td>
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
              {this.state.isExpanded && this.props.item.data.Tracks.map((track, index) =>
                <tr key={index}>
                  <td className="titleTD">{track.title} ({track.version})</td>
                  <td className="artistTD">Artists</td>
                  <td className="labelTD">
                    {this.props.item.data.Labels[0].displayName}
                  </td>
                  <td className="genreTD">genre</td>
                  <td className="lengthTD">Length</td>
                  <td className="addRemoveButtonTD">
                  </td>
                  <td className="costTD">{this.props.item.total} {this.props.currencySymbol}</td>
                </tr>
              )}
              <tr onClick={this.expandToggle}>
                <td className="expandItem" colSpan="8">
                  {this.state.isExpanded && <span className="basic-pictosimply-up"></span>}
                  {!this.state.isExpanded && <span className="basic-pictosimply-down"></span>}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}
