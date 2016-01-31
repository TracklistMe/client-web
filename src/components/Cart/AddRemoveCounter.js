import React, {Component, PropTypes } from 'react';

export default class AddRemoveCounter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    addHandler: PropTypes.func.isRequired,
    removeHandler: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd() {
    this.props.addHandler();
  }

  handleRemove() {
    this.props.removeHandler();
  }
  render() {
    return (
      <addRemoveCounter>
        <button onClick={this.handleAdd} >+</button>
        <span>{this.props.counter}</span>
        <button onClick={this.handleRemove} >-</button>
      </addRemoveCounter>
    );
  }
}
