import React from 'react';
import {Route} from 'react-router';
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
    Landing
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState) => {
    const { auth: { user }} = store.getState();
    if (!user) {
      // oops, not logged in, so can't be here!
      replaceState(null, '/');
    }
  };

  return (
    <Route>
      <Route>
        <Route path="/landing" component={Landing}/>
      </Route>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/widgets" component={Widgets}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
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
