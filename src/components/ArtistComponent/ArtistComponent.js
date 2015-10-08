import React, {Component, PropTypes } from 'react';

export default class ArtistComponent extends Component {
  render() {
    return (
        <artist_component>
          <artist_image>
            <img src={this.props.artistPicture} />
            <description>
              <artist_name>{this.props.artistName}</artist_name>
              <artist_details>Paris, France</artist_details>
            </description>
          </artist_image>
        </artist_component>
    );
  }
}

ArtistComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  artistPicture: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
