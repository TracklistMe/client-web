import React, {Component, PropTypes } from 'react';
import ArtistComponent from '../ArtistComponent/ArtistComponent';
import Headline from '../Headline/Headline';

export default class ArtistSection extends Component {
  render() {
    return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Headline title={this.props.title} playAllVisible />
      </div>
        {this.props.artists.map((artist) =>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2 ">
          <ArtistComponent {...artist}/>
          </div>
        )}
    </div>
    );
  }
}

ArtistSection.propTypes = {
  title: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    artistPicture: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired
  }).isRequired).isRequired
};
