import React, {Component, PropTypes } from 'react';
import {ArtistAvatarComponent} from 'components';

export default class PlayedBySection extends Component {
  render() {
    return (
    <played_by_section>
      <div className="col-sub-sm-4 col-sub-md-2">
        <h2>PLAYED BY</h2> 
        view more
      </div>
      <div className="col-sub-sm-7 col-sub-md-4">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/ukggsssa3rx6/1424306652.jpg'}/> asd
      </div>
      <div className="col-sub-sm-7 col-sub-md-4">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/s4h5hpbypqpp/1424280343.jpg'} /> asd
      </div>
      <div className="col-sub-md-4 hidden-sm">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/japgimb2iezc/1423479550.jpg'} /> asd
      </div>
      <div className="col-sub-md-4 hidden-sm">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/vwcgqz2kcd5v/1424076016.jpg'} /> asd
      </div>
    </played_by_section>
    );
  }
}

PlayedBySection.propTypes = {
  title: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    artistPicture: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired
  }).isRequired).isRequired
};
