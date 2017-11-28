import react from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../client/redux/actions/types';
import axios from 'axios';
import moxios from 'moxios';
import expect from 'expect';
import jwtDecode from 'jwt-decode';
import localStorage from 'mock-local-storage';
import * as loginActions from '../client/redux/actions/loginActions';

jest.mock('config');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('login action tests', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it(`should create an action after successful get token`, () => {
    let user = { 'username': 'user', 'password': '123'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { notes: [] },
      });
    });

    const expectedActions = [
      { type: types.GET_TOKEN_REQUEST, user }
    ];

    const store = mockStore({ auth: {} });
    return store.dispatch(loginActions.getToken(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create REJECTED_ACTION after 500 error on get token`, () => {
    let user = { 'username': 'user', 'password': '123'}

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { err: {} },
      });
    });

    const expectedActions = [
    	{ type: types.GET_TOKEN_REQUEST, user },
    	{ type: types.REJECTED_ACTION, text: 'Please login again'}
    ];

    const store = mockStore({ auth: {} });
    return store.dispatch(loginActions.getToken(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  function setGlobalStorage() {
    global.window = {}
    window.localStorage = global.localStorage
  }

  it(`should set current user after successful login`, () => {
    let user = { 'username': 'hi30', 'password': 'hi'};
    let user_decoded = {"email": "", "exp": 1511878363, "orig_iat": 1511705563, "user_id": 25, "username": "hi30"};

    setGlobalStorage();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { token: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNSwidXNlcm5hbWUiOiJoaTMwIiwiZXhwIjoxNTExODc4MzYzLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTExNzA1NTYzfQ.RyHW10Qk3b_7E1xxu9OF8yB6jWqvQp-SXojiXt4dl24' },
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST, user },
      { type: types.SET_CURRENT_USER, user: user_decoded },
      { type: types.SUCCESSFUL_ACTION, text: 'Welcome ' + user.username }
    ];

    const store = mockStore({ auth: {} });
    return store.dispatch(loginActions.login(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

   it(`should reject an invalid token format`, () => {
    let user = { 'username': 'user', 'password': '123'};

    setGlobalStorage();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { token: 'JWT fbkhkbfkd' },
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST, user },
      { type: types.REJECTED_ACTION, text: 'Please try again' }
    ];

    const store = mockStore({ auth: {} });
    return store.dispatch(loginActions.login(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create REJECTED_ACTION after 500 error on login`, () => {
    let user = { 'username': 'notauser', 'password': 'notapassword'};

    setGlobalStorage();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { err: {} },
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST, user },
      { type: types.REJECTED_ACTION, text: "Please try again"}
    ];

    const store = mockStore({ auth: {} });
    return store.dispatch(loginActions.login(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create REJECTED_ACTION after 401 error on login`, () => {
    let user = { 'username': 'notauser', 'password': 'notapassword'};

    setGlobalStorage();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: { err: {} },
      });
    });

    const expectedActions = [
      { type: types.LOGIN_REQUEST, user },
      { type: types.REJECTED_ACTION, text: "Those aren't the details we recognise, please try again!"}
    ];
    
    const store = mockStore({ auth: {} });
    return store.dispatch(loginActions.login(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});