import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import Events from './components/events/events';
import Profile from './components/profile/profile';
import Login from './components/loginSignup/login';
import ImageUpload from './components/upload/imageUpload';
import Template from './template';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default () => {
  injectTapEventPlugin();
  return (
    <Router history={ browserHistory }>
      <Route path='/' component={ Template }>
        <IndexRoute component={ Dashboard }/>
        <Route path='/home' component={ Home }/>
        <Route path='/dashboard' component={ Dashboard }/>
        <Route path='/events' component={ Events }/>
        <Route path='/profile' component={ Profile }/>
        <Route path='/upload' component={ ImageUpload }/>
      </Route>
    </Router>
  )
}
