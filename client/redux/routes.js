import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import SignupPage from '../components/signup/signupPage';
import LoginPage from '../components/login/loginPage';
import Welcome from '../components/welcomePage';
import NotesPage from '../components/note'
import requireAuth from '../utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="notes" component={NotesPage} />
  </Route>
)