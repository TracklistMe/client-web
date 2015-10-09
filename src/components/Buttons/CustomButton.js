import React, {Component, PropTypes} from 'react';

export default class CustomButton extends Component {
  render() {
    return (
      <play_all_button>
      {this.props.icon &&
        <icon className="basic-pictoplay pictoFont"></icon>
      }
        <text>{this.props.name}</text>
      </play_all_button>
    );
  }
}

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.bool
};
