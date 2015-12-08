import React from 'react';
import {Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, loadLocalStorage as loadLocalStorage} from 'redux/modules/auth';
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
  // try to login at bootstrap ?!
  const attemptAutomaticLogin = () => {
    console.log('Attempt for automatic Login ');
    console.log(store);
    if(store.dispatch){
      store.dispatch(loadLocalStorage());
    }
      store.dispatch(loadLocalStorage());
    
  };

  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    console.log(store.getState());
    // Check if we are already autenticated
    if (isAuthLoaded(store.getState()) === false) {
      // If we don't have a token
    } else {
      // if we have a token
      store.dispatch(loadAuth()).then(checkAuth);
    }
  };

  attemptAutomaticLogin();
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
        <Route path="/login" component={Login}/>
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
