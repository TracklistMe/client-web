import React, {Component, PropTypes} from 'react';
import ChartTop10 from '../ChartComponent/ChartTop10';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import {apiEndPoint} from '../../helpers/ApiClient';
import Dropzone from 'react-dropzone';


export default class ArtistJumbotron extends Component {
  static propTypes = {
    artist: PropTypes.shape({
      avatar: PropTypes.string.isRequired
    }),
    onDrop: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    files: ['asd']
  };

  onDrop(files) {
    console.log('DROPPED A FILE BUM! ');
    console.log(files);
    this.setState({
      files: files
    });
    console.log(this.state);
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
                  <div>
                    <Dropzone ref="dropzone" id="dropzone" onDrop={this.onDrop}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                    {this.state.files.length > 0 ? <div>
                    <h2>Uploading {this.state.files.length} files...</h2>
                    <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                    </div> : null}
                  </div>
                  <h1>{artist.displayName}</h1>
                  <h4>{this.state.files.length} Rome, Italy</h4>
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
