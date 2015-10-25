import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import BetaOnboardingForm from './../../components/Onboarding/BetaOnboardingForm';

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

  render() {
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
            <h3> fair for the artists, fair for you.</h3>
            <p> Buy, Sell and Stream Music. Find out who plays it. <br />
              <span id="registerMessage">Register now and get early beta access </span>
            </p>
            <div className="box">
                <BetaOnboardingForm />
            </div>
          </register_panel>
        </div>
      </div>
    );
  }
}
