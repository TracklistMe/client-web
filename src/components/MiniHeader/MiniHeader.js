import React, {Component, PropTypes } from 'react';

export default class MiniHeader extends Component {
  render() {
    return (
      <mini_header_component onClick={this.props.onClick}>
        <img src={this.props.image}/>
        <description>
          <text_description>
            <author> {this.props.author} </author>
            <title>{this.props.title}</title>
           </text_description>
        </description>
      </mini_header_component>
    );
  }
}

MiniHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
