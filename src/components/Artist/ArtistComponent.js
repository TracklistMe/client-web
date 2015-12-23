import React, {Component, PropTypes } from 'react';
import {ArtistAvatarComponent} from 'components';
import { LinkContainer } from 'react-router-bootstrap';

export default class ArtistComponent extends Component {
  render() {
    return (
      <LinkContainer to={'/artist/' + this.props.id}>
        <artist_component>
          <artist_name>{this.props.displayName}</artist_name>
          <ArtistAvatarComponent avatar={this.props.avatar}/>
        </artist_component>
      </LinkContainer>
    );
  }
}

ArtistComponent.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};
