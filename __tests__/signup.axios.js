jest.mock('config');

import react from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import expect from 'expect';

const middlewares = [thunk]	
const mockStore = configureMockStore(middlewares)

import * as types from '../client/redux/actions/types';
import * as signupActions from '../client/redux/actions/signupActions';


describe('signup action tests', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it(`should create an action after successful create user request`, () => {
    let user = { 'username': 'user', 'password': '123'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { user: [] },
      });
    });
    const expectedActions = [
      { type: types.CREATE_USER_REQUEST, user },
      { type: types.SUCCESSFUL_ACTION, text: "Added user " + user.username }
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(signupActions.createNewUser(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should notify of problem when cannot create a new user`, () => {
    let user = { 'username': 'user', 'password': '123'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { error: [] },
      });
    });
    const expectedActions = [
      { type: types.CREATE_USER_REQUEST, user },
      { type: types.REJECTED_ACTION, text: "Please try again" }
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(signupActions.createNewUser(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should sign up a user by posting to /users`, () => {
    let user = { 'username': 'user', 'password': '123'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {},
      });
    });
    const expectedActions = [
      { type: types.SIGNUP_REQUEST, user },
      { type: types.REJECTED_ACTION, text: "A user exists with these credentials"}
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(signupActions.userSignupRequest(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create SIGNUP_REQUEST when successfully create new user`, () => {
    let user = { 'username': 'user', 'password': '123'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });
    const expectedActions = [
      { type: types.SIGNUP_REQUEST, user },
      { type: types.SUCCESSFUL_ACTION, text: "All signed up!" }
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(signupActions.userSignupRequest(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});