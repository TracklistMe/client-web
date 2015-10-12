import React, {Component, PropTypes } from 'react';

export default class ArtistAvatarComponent extends Component {
  render() {
    return (
      <artist_avatar style={{backgroundImage: 'url(' + this.props.avatar + ')'}} />
    );
  }
}

ArtistAvatarComponent.propTypes = {
  avatar: PropTypes.string.isRequired
};
