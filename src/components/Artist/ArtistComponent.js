import React, {Component, PropTypes } from 'react';

export default class ArtistComponent extends Component {
  render() {
    return (
        <artist_component>
          <artist_name>{this.props.displayName}</artist_name>
          <artist_image style={{backgroundImage: 'url(' + this.props.avatar + ')'}}>
          </artist_image>
        </artist_component>
    );
  }
}

ArtistComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};
