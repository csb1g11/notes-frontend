import React from 'react';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { setCurrentUser } from './redux/reducers/loginReducer';

import "./styles/mainSheet/site.scss";
import routes from './redux/routes';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser({ ...jwtDecode(localStorage.jwtToken), token: localStorage.jwtToken}));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('root'));