import React, {Component, PropTypes} from 'react';

export default class BuyFromJumbotronPlaylist extends Component {
  static defaultProps = {
    name: '',
    icon: true
  };

  render() {
    return (
      <add_to_cart_from_jumbotron_playlist onClick={this.props.handler} >
      <span>
        <text>{this.props.name}</text>
      </span>
      {this.props.icon &&
        <icon className="basic-pictoshop pictoFont"></icon>
      }
      </add_to_cart_from_jumbotron_playlist>
    );
  }
}

BuyFromJumbotronPlaylist.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  handler: PropTypes.func
};
