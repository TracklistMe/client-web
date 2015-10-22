import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import BetaOnboardingForm from './../../components/Onboarding/BetaOnboardingForm';
import {initialize} from 'redux-form';

const title = 'TracklistMe';
const description = 'Fair for the artists, fair for you.';
const logo = require('./../../img/logoAphextwin.png');

 

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': logo,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@tracklistme',
      'twitter:creator': '@tracklistme',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': logo,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};


export default class Landing extends Component {
  static propTypes = {
    user: PropTypes.object, 
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  
  handleSubmit(data) {
    console.log('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  handleInitialize() {
    this.props.initialize('survey', {
      email: 'test@gmail.com'
    });
  }

  render() {
    const {user} = this.props;
    const styles = require('./../App/less/aphextwin.less');
    const logoImage = require('./logo_big.png');

    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div id="landingPage">
          <div className="landingPage">
          </div>
          <register_panel>
            <h1><a href="/"><img src={logoImage} alt="Tracklist.me" /></a></h1>
            <h2> Your Music Hub </h2>
            <h3> fair for the artists, fair for you. </h3>
            <p> Buy, Sell and Stream Music. Find out who plays it. <br />
              <span id="registerMessage"> Register now and get early beta access </span>
            </p>
            <div className="box"> 
              <BetaOnboardingForm currentState={'1'} />
            </div>
          </register_panel>
        </div>
      </div>
    )
  }
}
