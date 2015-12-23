import React, {Component, PropTypes} from 'react';
import ChartTop10 from '../ChartComponent/ChartTop10';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import {apiEndPoint} from '../../helpers/ApiClient';

export default class ArtistJumbotron extends Component {
  static propTypes = {
    artist: PropTypes.shape({
      avatar: PropTypes.string.isRequired
    })
  }

  render() {
    console.log(this.props);
    const {artist} = this.props; // eslint-disable-line no-shadow
    if (!artist) {
      return (<div>Loading Artist Profile</div>);
    }
    return (
      <div className="artistJumbotron">
        <MainHeaderBackground image={apiEndPoint() + '/images/' + artist.avatar} />
        <div className="headerContent">
          <div className="row artistJumbotronContainer">
            <div className="hidden-xs hidden-sm col-sub-xs-5 col-sub-sm-6 col-sub-md-6 col-sub-lg-5 overflowHidden">
              <img className="cover" src={apiEndPoint() + '/images/' + artist.avatar} />
            </div>
            <div className="col-sub-xs-9 col-sub-sm-9 col-sub-md-6 col-sub-lg-7">
              <div className="row">
                <div className="col-lg-12 text-left trackDescriptionSpace">
                  <h1>{artist.displayName}</h1>
                  <h4>Rome, Italy</h4>
                </div>
              </div>
              <div className="row inlineBlock">
                <div className="col-lg-12">
                  <div className="sharingHolder">
                    <div className="sharingIcon">
                      <span className="Socialtwitter"></span>
                    </div>
                    <div className="sharingDivider"></div>
                    <div className="sharingIcon">
                      <span className="Socialfacebook"></span>
                    </div>
                    <div className="sharingDivider"></div>
                    <div className="sharingIcon">
                      <span className="Socialsoundcloud"></span>
                    </div>
                    <div className="sharingDivider"></div>
                    <div className="sharingIcon">
                      <span className="Socialspotify"></span>
                    </div>
                    <div className="sharingDivider"></div>
                    <div className="sharingIcon">
                      <span className="Socialinstagram"></span>
                    </div>
                    <div className="sharingDivider"></div>
                    <div className="sharingIcon">
                      <span className="Socialyoutube"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sub-xs-9 col-sub-sm-9 col-sub-md-6 col-sub-lg-6">
              <ChartTop10 />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
