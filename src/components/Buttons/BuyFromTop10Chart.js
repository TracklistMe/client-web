import React, {Component, PropTypes} from 'react';

export default class BuyFromTop10Chart extends Component {
  static defaultProps = {
    name: '',
    icon: true
  }

  render() {
    return (
      <add_to_cart_from_top10_chart>
      <span>
        <text>{this.props.name}</text>
      </span>
      {this.props.icon &&
        <icon className="basic-pictoshop pictoFont"></icon>
      }
      </add_to_cart_from_top10_chart>
    );
  }
}

BuyFromTop10Chart.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.bool
};
