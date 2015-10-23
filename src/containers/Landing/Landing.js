import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import BetaOnboardingForm from './../../components/Onboarding/BetaOnboardingForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { save } from 'redux/modules/earlyUser';

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


@connect(
  store => ({
    status: store.earlyUser.data
  }),
  dispatch => bindActionCreators({ save }, dispatch)
)
export default class Landing extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

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
    console.log(this.props.save);
    this.props.save(data);
  }

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
            <h3> fair for the artists, fair for you. </h3>
            <p> Buy, Sell and Stream Music. Find out who plays it. <br />
              <span id="registerMessage"> Register now and get early beta access </span>
            </p>
            <div className="box">
                <BetaOnboardingForm step={'1'} onSubmit={::this.handleSubmit} />
            </div>
          </register_panel>
        </div>
      </div>
    );
  }
}
