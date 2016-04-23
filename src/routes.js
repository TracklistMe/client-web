import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Track,
    Tracklist,
    Login,
    NotFound,
    Landing,
    Genre,
    Release,
    Artist,
    Cart,
    Me,
    AdminTracklists,
    AdminTracklist
  } from 'containers';
import {requireAuthentication} from 'components/AuthenticationComponent/AuthenticationComponent';


export default () => {
  /*
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
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
 */

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
        <Route path="/cart" component={Cart}/>
        <Route path="/login" component={Login}/>
        <Route path="/genre/:id" component={Genre}/>
        <Route path="/widgets" component={Widgets}/>
        <Route path="/about" component={About}/>
        <Route path="/tracklist/:id" component={Tracklist}/>
        <Route path="/release/:id" component={Release}/>
        <Route path="/track/:id" component={Track}/>
        <Route path="/artist/:id" component={Artist}/>
        <Route path="/chat" component={Chat}/>
        {/* render the user related pages */}
        <Route path="/me" component={requireAuthentication(Me)}/>
        <Route path="/me/tracklists" component={requireAuthentication(AdminTracklists)}/>
        <Route path="/me/tracklists/:id" component={requireAuthentication(AdminTracklist)}/>
        {/* catch all the other routes */}
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Route>
  );
};
