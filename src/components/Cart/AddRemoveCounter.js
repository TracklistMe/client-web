import React, {Component, PropTypes } from 'react';

export default class AddRemoveCounter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    addHandler: PropTypes.func.isRequired,
    removeHandler: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleAddRelease = this.handleAddRelease.bind(this);
    this.handleRemoveRelease = this.handleRemoveRelease.bind(this);
  }

  handleAddRelease() {
    console.log('handler cliekced');
    this.props.addHandler();
  }

  handleRemoveRelease() {
    this.props.removeHandler();
  }
  render() {
    return (
      <addRemoveCounter>
        <button onClick={this.handleAddTrack} >+</button>
        <span>2</span>
        <button onClick={this.handleRemoveTrack} >-</button>
      </addRemoveCounter>
    );
  }
}
