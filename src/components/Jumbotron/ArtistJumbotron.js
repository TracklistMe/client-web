import React, {Component, PropTypes} from 'react';
import ChartTop10 from '../ChartComponent/ChartTop10';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import DropzoneComponent from 'react-dropzone-component';
import {apiEndPoint} from '../../helpers/ApiClient';
import ReactDOMServer from 'react-dom/server';
export default class ArtistJumbotron extends Component {
  static propTypes = {
    artist: PropTypes.shape({
      avatar: PropTypes.string.isRequired
    })
  }

  render() {
    const djsConfig = {
      addRemoveLinks: true,
      params: {
        myParameter: "I'm a parameter!"
      },
      previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview">
          <div className="dz-details">
            <div className="dz-filename"><span data-dz-name></span></div>
            <img data-dz-thumbnail />
          </div>
          <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress></span></div>
          <div className="dz-success-mark"><span>✔</span></div>
          <div className="dz-error-mark"><span>✘</span></div>
          <div className="dz-error-message">This is an error: <span data-dz-errormessage></span></div>
        </div>
      )
    };

    const callbackArray = [
      function firstCallBack() {
        console.log('Look Ma, I\'m a callback in an array!');
      },
      function secondCallBack() {
        console.log('Wooooow!');
      }
    ];

    const simpleCallBack = function callback() {
      console.log('I\'m a simple callback');
    };

    const eventHandlers = {
      // This one receives the dropzone object as the first parameter
      // and can be used to additional work with the dropzone.js
      // object
      init: null,
      // All of these receive the event as first parameter:
      drop: callbackArray,
      dragstart: null,
      dragend: null,
      dragenter: null,
      dragover: null,
      dragleave: null,
      // All of these receive the file as first parameter:
      addedfile: simpleCallBack,
      removedfile: null,
      thumbnail: null,
      error: null,
      processing: null,
      uploadprogress: null,
      sending: null,
      success: null,
      complete: null,
      canceled: null,
      maxfilesreached: null,
      maxfilesexceeded: null,
      // All of these receive a list of files as first parameter
      // and are only called if the uploadMultiple option
      // in djsConfig is true:
      processingmultiple: null,
      sendingmultiple: null,
      successmultiple: null,
      completemultiple: null,
      canceledmultiple: null,
      // Special Events
      totaluploadprogress: null,
      reset: null,
      queuecompleted: null
    };

    const componentConfig = {
      postUrl: '/uploadHandler',
    };

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
                  <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig} />
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
