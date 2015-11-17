import React, {Component, PropTypes } from 'react';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import TimeDuration from '../Utilities/TimeDuration';

export default class ReleaseJumbotron extends Component {
  static propTypes = {
    release: PropTypes.object
  }
  render() {
    const release = this.props.release; // eslint-disable-line no-shadow
    const height = Math.max(570, 400 + (release.Tracks.length * 40));
    if (!release) {
      return (<div></div>);
    }
    return (
      <div className="releaseJumbotron">
        <MainHeaderBackground image={release ? release.cover : ''} height={height}/>
        <div className="headerContent" style={{height: height + 'px'}} >
          <div className="row trackJumbotronContainer">
            <div className="col-sub-xs-10 col-sub-xs-offset-4 col-sub-sm-offset-0 hidden-sm col-sub-sm-6 col-sub-md-5 col-sub-lg-4 overflowHidden">
              <img className="cover" src={release ? release.cover : ''} />
            </div>
            <div className="col-sub-xs-18 col-sub-sm-18 col-sub-md-13 col-sub-lg-14">
              <div className="row hidden-xs">
                <div className="col-lg-6 text-left trackDescriptionSpace">
                  <div className="labelContainer">
                    Label: <strong>{release.Labels[0].displayName}</strong>
                  </div>
                  <div>
                    Artist position
                  </div>
                </div>
                <div className="col-lg-6 text-right">
                  Album
                </div>
                <div className="col-lg-12 titleContainer">
                      <h1>{release ? release.title : ''} </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 hidden-xs">
                  {release.Tracks.map((track, index) =>
                  <div className="col-sub-lg-18 trackInPlaylist">
                    <div className="col-sub-lg-1 hidden-sm hidden-md hidden-sm">
                      {index + 1}
                    </div>
                    <div className="col-sub-lg-5 col-sub-sm-6">
                      {track.title} ({track.version})
                    </div>
                    <div className="col-sub-lg-4 col-sub-sm-4">
                    {track.Producer.map((producer) =>
                      <span>{producer.displayName}</span>
                    )}
                    </div>
                    <div className="col-sub-lg-3 col-sub-sm-3">
                    {track.Remixer.map((remixer) =>
                      <span>{remixer.displayName}</span>
                    )}
                    </div>
                    <div className="col-sub-lg-2 col-sub-sm-2">
                    {track.Genres.map((genre) =>
                      <span>{genre.name}</span>
                    )}
                    </div>
                    <div className="col-sub-lg-3 col-sub-sm-3">
                      <span>{track.Price}$ </span>
                      <TimeDuration length={track.lengthInSeconds} />
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
