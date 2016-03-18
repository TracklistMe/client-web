import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

export function requireAuthentication(Component) {
  class AuthenticationComponent extends React.Component {
    static propTypes = {
      token: PropTypes.string,
      userName: PropTypes.string,
      logged: PropTypes.bool,
      location: PropTypes.shape({
        pathname: PropTypes.string
      }),
      dispatch: PropTypes.func
    };

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      console.log('CHECKING AUTH');
      if (!this.props.logged) {
        const redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push('/login?next=' + redirectAfterLogin));
      }
    }

    render() {
      return (
        <div>
          {this.props.logged === true ? <Component {...this.props}/> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    userName: state.auth.userName,
    logged: state.auth.logged
  });

  return connect(mapStateToProps)(AuthenticationComponent);
}
