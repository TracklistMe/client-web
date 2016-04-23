import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import { connect } from 'react-redux';
import { logout, loadAuthCookie, loadPersonalInfo } from 'redux/modules/auth';
import { load as loadGenre } from 'redux/modules/genre';
import { loadCartInformations, loadCartEntries } from 'redux/modules/cart';
import Helmet from 'react-helmet';
import { routeActions } from 'react-router-redux';
// import { asyncConnect } from 'redux-async-connect'; how to handle async redux connection
import ga from 'react-ga';

const logo = require('./../../img/logoAphextwin.png');

const NavbarLink = ({to, children}) => (
  <Link key={to} to={to}>
  {children}
  </Link>
);

@connect(
  state => ({
    user: state.auth.user,
    selectGenre: state.genre.selectGenre,
    genres: state.genre.genres,
    logged: state.auth.logged,
    totalBasketItems: state.cart.totalBasketItems
  }),
  {logout, loadGenre, loadPersonalInfo, loadAuthCookie, loadCartInformations, loadCartEntries, pushState: routeActions.push})

/* Example of async connection in redux
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    genres: PropTypes.array,
    selectGenre: PropTypes.object,
    totalBasketItems: PropTypes.number,
    logged: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    loadAuthCookie: PropTypes.func.isRequired,
    loadPersonalInfo: PropTypes.func.isRequired,
    loadGenre: PropTypes.func.isRequired,
    loadCartInformations: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    loadCartEntries: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    // Load overall informations.
    this.props.loadGenre();
    // Authentication
    this.props.loadAuthCookie();
    if (this.props.logged) {
      this.props.loadPersonalInfo();
      this.props.loadCartInformations();
      this.props.loadCartEntries();
    }
  }

  componentDidMount() {
    ga.initialize('UA-41334661-1', { debug: true });
    ga.pageview(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const isLogged = this.props.logged;
    const nextStateIsLogged = nextProps.logged;
    if (isLogged === false && nextStateIsLogged === true) {
      // I just got logged in succesffuly.
      // If there were a query parameter next, move to that location,
      // otherwise go to the user profile page.
      this.props.loadPersonalInfo();
      this.props.loadCartInformations();
      this.props.loadCartEntries();
      // process to change the route.
      const redirectRoute = nextProps.location.query.next || '/me';
      this.props.pushState(redirectRoute);
    } else if (this.props.logged && !nextProps.logged) {
      // logout
      this.props.pushState(null, '/beta');
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      ga.pageview(nextProps.location.pathname);
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user, logged, genres, totalBasketItems} = this.props;
    const styles = require('./less/aphextwin.less');
    return (
      <div className={styles}>
      <Helmet {...config.app.head}/>
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
            <Link to="/beta"> <img src={logo} /></Link>
            <ul>
              <li><NavbarLink to="/track/77">Go to track 77</NavbarLink></li>
              <li><NavbarLink to="/track/80">Go to track 80</NavbarLink></li>
              <li><NavbarLink to="/release/257">Go to release 257</NavbarLink></li>
              <li><NavbarLink to="/tracklist/1">Tracklist</NavbarLink></li>
              <li><NavbarLink to="/artist/58">Artist (Siwell)</NavbarLink></li>
              <li><a href="#">Labels</a></li>
            </ul>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="divider-vertical"></li>
          <li className="dropdownBackground dropdownBorder">
          <a href="#">{this.props.selectGenre && this.props.selectGenre.name || 'Genres'}
          <span className="pull-right basic-pictosimply-down icon"></span></a>
          <ul>
            {genres && genres.map((genre) =>
              <li>
                <NavbarLink key={genre.id} to={'/genre/' + genre.id}>{genre.name}</NavbarLink>
              </li>
            )}
            <li><a href="#">Techno</a></li>
            <li><a href="#">House</a></li>
            {user && <li><Link to="/chat">Chat</Link></li>}
            <li><Link to="/widgets">Widgets</Link></li>
            <li><Link to="/survey">Survey</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/me">User Page</Link></li>
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
          <li className="navbar-text">
             <icon className="basic-pictohead icon"></icon>
              {!logged && <span><NavbarLink to="/login">Login</NavbarLink> or Register</span>}
              {logged && <span><a onClick={::this.handleLogout}>Logout</a></span>}
          </li>
          <li className="divider-vertical"></li>
          <li>
            <Link to="/cart">
              <span className="basic-pictoshop icon"></span>{totalBasketItems}
            </Link>
          </li>
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
