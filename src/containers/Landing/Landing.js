import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';

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
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class Landing extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
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

  sendEmail(event) {
    event.preventDefault();
    console.log(event);
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
              <div id="position">In queue at position <span className="highlight">1234</span>.
                <br />Thank you, an email has been sent. Please confirm it.
                <br /> Want to skip the queue?
                <br /><span id="inviteFriend"> Invite your friends! </span>
              </div>
              <div id="positionFriend">An email has been sent to your friend.
                <br />Once confirmed, you will notified and your beta will be closer!
                <br />For now you are still in position <span className="highlight">1234</span>.
                <br /><span id="inviteMoreFriend"> Invite more friends! </span>
              </div>
              <div id="registration" className="container-4">
                <div id="emailBlock">
                  <input type="email" id="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email'" placeholder="Email" />
                  <button id="sendButton" className="icon"  onClick={this.sendEmail}>
                    <span id="send" className="basic-pictosimply-right"></span>
                    <span id="loading" className="basic-pictoloader iconSpin"></span>
                  </button>
                </div>
                <div id="inviteFriendBlock">
                  <input type="email" id="friendEmail" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Friend\'s Email'" placeholder="Friend's Email" />
                  <button id="sendFriendButton" className="icon">
                    <span id="sendFriend" className="basic-pictosimply-right"></span>
                    <span id="loadingFriend" className="basic-pictoloader iconSpin"></span>
                  </button>
                </div>
                <div id="artistBlock">
                  <span className="question"> Are you an Artist? </span>
                  <button id="yesArtist" className="icon">
                    <span id="send" className="basic-pictocheck"></span>
                  </button>
                  <button id="noArtist" className="icon">
                    <span id="send" className=" basic-pictocross"></span>
                  </button>
                </div>
                <div id="labelBlock">
                  <span className="question"> Are you a Label? </span>
                  <button id="yesLabel" className="icon">
                    <span id="send" className="basic-pictocheck"></span>
                  </button>
                  <button id="noLabel" className="icon">
                    <span id="send" className=" basic-pictocross"></span>
                  </button>
                </div>
              </div>
              <div id="validationError"> Invalid email address </div>
            </div>
          </register_panel>
        </div>
      </div>
    );
  }
}
