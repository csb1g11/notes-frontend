import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import SignupPage from '../components/signup/signupPage';
import LoginPage from '../components/login/loginPage';
import Welcome from '../components/common/welcomePage';
import requireAuth from '../utils/requireAuth';
import NewNotePage from '../components/notes/newNotePage';
import NoteList from '../components/notes/noteList';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="note" component={NewNotePage} />
    <Route path="notes" component={requireAuth(NoteList)} />
  </Route>
)