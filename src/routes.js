import React from 'react';
import {Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Track,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Landing,
    Genre,
    Release
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route>
      <Route>
        <Route path="/" component={Landing}/>
        <Route path="/verifyAccount/:id/:auth" component={Landing}/>
      </Route>
      <Route component={App}>
        <Route path="/beta" component={Home}/>
        <Route path="/genre/" component={Genre}/>
        <Route path="/widgets" component={Widgets}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route path="/release/:id" component={Release}/>
        <Route path="/track/:id" component={Track}/>
        <Route onEnter={requireLogin}>
          <Route path="/chat" component={Chat}/>
          <Route path="/loginSuccess" component={LoginSuccess}/>
        </Route>
        <Route path="/survey" component={Survey}/>
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Route>
  );
};
