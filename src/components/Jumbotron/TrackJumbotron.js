import React, {Component, PropTypes } from 'react';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import ArtistComponent from '../Artist/ArtistComponent';
import CustomButton from '../Buttons/CustomButton';

export default class TrackJumbotron extends Component {
  static propTypes = {
    track: PropTypes.shape({
      Genres: PropTypes.array
    })
  }
  render() {
    const {track} = this.props; // eslint-disable-line no-shadow
    if (!track || !track.Genres) {
      return (<div> not loaded</div>);
    }
    return (
      <div className="trackJumbotron">
        <MainHeaderBackground image={track ? track.cover : ''} />
        <div className="headerContent">
          <div className="row trackJumbotronContainer">
            <div className="col-sub-xs-5 col-sub-sm-5 col-sub-md-4 col-sub-lg-4 overflowHidden">
              <img className="cover" src={track ? track.cover : ''} />
            </div>
            <div className="col-sub-xs-14 col-sub-sm-14 col-sub-md-14 col-sub-lg-14">
              <div className="row">
                <div className="col-lg-6 text-left trackDescriptionSpace">
                  <div className="genreContainer">
                      {track.Genres.map((genre, index) =>
                        <CustomButton key={index} {...genre} />
                      )}
                  </div>
                  <div>
                      {track.Producer.map((producer, index) =>
                       <ArtistComponent key={index} {...producer}/>
                      )}
                  </div>
                  <div className="titleContainer">
                      <h1>{track ? track.title + ' (' + track.version + ')' : ''} </h1>
                  </div>
                </div>
                <div className="col-lg-6 text-right"> sharing Stats </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-left">
                    <div className="waveForm" />
                </div>
                <div className="col-lg-3 text-left">
                  Released: <strong>20/12/2014</strong>
                </div>
                <div className="col-lg-3 text-left">
                  BPM: <strong>134</strong>
                </div>
                <div className="col-lg-3 text-left">
                  Key: <strong>F#</strong>
                </div>
                <div className="col-lg-3 text-left">
                  Label: <strong>Label Woop Woop</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
