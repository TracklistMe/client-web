import React, {Component, PropTypes} from 'react';

export default class CustomButton extends Component {
  render() {
    return (
      <play_all_button>
        <text>{this.props.name}</text>
      </play_all_button>
    );
  }
}

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired
};
