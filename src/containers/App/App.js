import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';

const title = 'React Redux Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';
const logo = require('./../../img/logoAphextwin.png');


const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@tracklistme',
      'twitter:creator': '@tracklistme',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators({logout}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.history.pushState(null, '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.history.pushState(null, '/');
    }
  }

  static fetchData(store) {
    const promises = [];
    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()));
    }
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    const styles = require('./less/aphextwin.less');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="navbar-background"> </div>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <ul className="nav navbar-nav">
              <li className="dropdownBackground dropdownBorder">
                <Link to="/"> <img src={logo} /></Link>
                <ul>
                  <li><Link to="/track/77"> Artists &amp; bands </Link></li>
                  <li><Link to="/track/80"> Genres </Link></li>
                  <li><a href="#">Labels</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="divider-vertical"></li>
              <li className="dropdownBackground dropdownBorder">
                <a href="#">Genres
                <span className="pull-right basic-pictosimply-down icon"></span></a>
                <ul>
                  <li><a href="#">Deep House</a></li>
                  <li><a href="#">Progressive House</a></li>
                  <li><a href="#">Techno</a></li>
                  <li><a href="#">House</a></li>
                  {user && <li><Link to="/chat">Chat</Link></li>}

                  <li><Link to="/widgets">Widgets</Link></li>
                  <li><Link to="/survey">Survey</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  {!user && <li><Link to="/login">Login</Link></li>}
                  {user && <li className="logout-link"><a href="/logout" onClick={::this.handleLogout}>Logout</a></li>}
                </ul>
              </li>
              <li className="divider-vertical"></li>
              <li>
                <search_component>
                  <span className="basic-pictosearch icon"></span>
                  <input type="search" id="search" placeholder="Search..." />
                </search_component>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="divider-vertical"></li>
              <li>
                <a href="#"> <span className="basic-pictohead icon"></span> Login or Register </a>
              </li>
              <li className="divider-vertical"></li>
              <li><a href="#"><span className="basic-pictoshop icon"></span>2</a></li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <footer className="row darkestrow">
          <div className="pull-right col-xs-4 col-sm-4col-md-4 col-lg-4">
            <a href="#"><img src={logo} /></a>
            <p>2014 - 2016</p>
          </div>
        </footer>
      </div>
    );
  }
}
