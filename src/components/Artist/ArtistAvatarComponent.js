import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';

export default class ArtistAvatarComponent extends Component {
  render() {
    return (
      <artist_avatar style={{backgroundImage: 'url(' + apiEndPoint() + '/images/' + this.props.avatar + ')'}} />
    );
  }
}

ArtistAvatarComponent.propTypes = {
  avatar: PropTypes.string.isRequired
};
