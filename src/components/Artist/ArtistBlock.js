import React, {Component, PropTypes } from 'react';

export default class ArtistBlock extends Component {
  render() {
    return (
        <artist_block>
          <artist_image>
            <img src={this.props.artistPicture} />
            <description>
              <artist_name>{this.props.artistName}</artist_name>
              <artist_details>Paris, France</artist_details>
            </description>
          </artist_image>
        </artist_block>
    );
  }
}

ArtistBlock.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number,
  artistPicture: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
