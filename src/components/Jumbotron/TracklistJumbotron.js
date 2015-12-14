import React, {Component, PropTypes } from 'react';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';

export default class TracklistJumbotron extends Component {
  static propTypes = {
    tracklist: PropTypes.shape({
      Genres: PropTypes.array
    })
  }
  render() {
    const data = [{
      label: 'somethingA',
      values: []
    }];
    /* Absolute values of a sin waveform. We do expect only values within [0,1] */
    for (let index = 0; index < 720; index++) {
      data[0].values.push({x: '' + index, y: Math.abs(Math.sin(index / 18) + Math.cos(index / 10))});
    }
    const {tracklist} = this.props; // eslint-disable-line no-shadow
    console.log(this.props);
    if (!tracklist || !tracklist.Genres) {
      return (<div>Loading Tracklist</div>);
    }
    return (
      <div className="tracklistJumbotron">
        <MainHeaderBackground image="http://www.global-sets.com/wp-content/uploads/2014/05/adam-beyer-live-660x330.jpg" />
        <div className="headerContent">
          <div className="row trackJumbotronContainer">
            <div className="hidden-xs hidden-sm col-sub-xs-5 col-sub-sm-6 col-sub-md-6 col-sub-lg-5 overflowHidden">
              <img className="cover" src="http://www.sorstu.ca/wp-content/uploads/artistes/square/adam-beyer.jpg" />
            </div>
            <div className="col-sub-xs-18 col-sub-sm-18 col-sub-md-12 col-sub-lg-13">
              <div className="row">
                <div className="col-lg-6 text-left trackDescriptionSpace">
                  <div className="titleContainer">
                      <h1>Adam Beyer</h1>
                      <h4>Stockholm, Sweden</h4>
                  </div>
                  <div className="dateHolder">
                   asd
                  </div>
                </div>
                <div className="col-lg-6 text-right">
                  sharing Stats
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
