import React, {Component, PropTypes } from 'react';
import {ArtistAvatarComponent} from 'components';

export default class ArtistComponent extends Component {
  render() {
    return (
        <artist_component>
          <artist_name>{this.props.displayName}</artist_name>
          <ArtistAvatarComponent avatar={this.props.avatar}/>
        </artist_component>
    );
  }
}

ArtistComponent.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};
