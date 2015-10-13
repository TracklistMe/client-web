import React, {Component, PropTypes } from 'react';
import {ArtistAvatarComponent} from 'components';

export default class PlayedBySection extends Component {
  render() {
    return (
    <played_by_section>
      <div className="col-sub-xs-9 col-sub-sm-4 col-sub-md-2 col-sub-lg-3">
        <h2>PLAYED BY</h2>
        view more
      </div>
      <div className="col-sub-xs-9 col-sub-sm-7 col-sub-md-4 col-sub-lg-3">
        <div className="infoContainer">
            <div className="avatar">
             <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/ukggsssa3rx6/1424306652.jpg'}/>
            </div>
            <div className="description">
              <div className="artistName"> Zomboy </div>
              <div className="eventName"> Safe is Sound Festival 2015 events really really long that takes a lot of space, knowville, Us </div>
            </div>
        </div>
      </div>
      <div className="col-sub-lg-3 col-sub-sm-7 col-sub-md-4 hidden-xs">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/s4h5hpbypqpp/1424280343.jpg'} /> asd
      </div>
      <div className="col-sub-lg-3 col-sub-md-4 hidden-sm hidden-xs ">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/japgimb2iezc/1423479550.jpg'} /> asd
      </div>
      <div className="col-sub-lg-3 col-sub-md-4 hidden-sm hidden-xs text-center">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/vwcgqz2kcd5v/1424076016.jpg'} /> asd
      </div>
      <div className="col-sub-lg-3 hidden-sm hidden-xs hidden-md text-center">
        <ArtistAvatarComponent avatar={'https://api-media.beatport.com/590x405/artists/vwcgqz2kcd5v/1424076016.jpg'} /> asd
      </div>
    </played_by_section>
    );
  }
}

PlayedBySection.propTypes = {
  title: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.shape({
    artistPicture: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired
  }))
};
