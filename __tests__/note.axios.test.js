jest.mock('config');

import react from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../client/redux/actions/noteActions';
import * as types from '../client/redux/actions/types';
import axios from 'axios';
import moxios from 'moxios';
import expect from 'expect';

const middlewares = [thunk]	
const mockStore = configureMockStore(middlewares)


import * as noteActions from '../client/redux/actions/noteActions';
import * as loginActions from '../client/redux/actions/loginActions';


describe('note action tests', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  it(`should create action FETCH_NOTES_FULFILLED after successful fetch`, () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { notes: [] },
      });
    });
    const expectedActions = [
    	{ type: types.FETCH_NOTES_REQUEST, user: { token: 'JWT aknfkdnbcd' } },
    	{ type: types.FETCH_NOTES_FULFILLED, payload: { notes: [] } },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.fetchNotes({'token': 'JWT aknfkdnbcd'}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action FETCH_NOTES_REJECTED after 500 error on fetch`, () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { err: { "Reason" : "All the things broke"} },
      });
    });
    const expectedActions = [
    	{ type: types.FETCH_NOTES_REQUEST, user: { token: 'JWT aknfkdnbcd' } },
    	{ type: types.FETCH_NOTES_REJECTED, payload: { err: { "Reason" : "All the things broke"} } },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.fetchNotes({'token': 'JWT aknfkdnbcd'}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action NOTIFY_SUCCESS after add note request`, () => {
  	let note = { 'phrase' : 'hola', 'definition': 'hi', 'context': '', 'language': 'en'};
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { note },
      });
    });
    const expectedActions = [
    	{ type: types.ADD_NOTE_REQUEST, phrase: 'hola' },
    	{ type: types.SUCCESSFUL_ACTION, text: "All saved - safe & sound!" },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.addNote(note))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action NOTIFY_REJECTED after add note request`, () => {
  	let note = { 'phrase' : 'hola', 'definition': 'hi', 'context': '', 'language': 'en'};
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { err: {} },
      });
    });
    const expectedActions = [
    	{ type: types.ADD_NOTE_REQUEST, phrase: 'hola' },
    	{ type: types.REJECTED_ACTION, text: "Oh no! We haven't kept that safe just yet, please try again." },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.addNote(note))
    .then(() => {
      	expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action NOTIFY_SUCCESS after update note request`, () => {
  	let note = { 'phrase' : 'hola', 'definition': 'hi', 'context': '', 'language': 'en', 'url': 'bbc.com'};
  	let user = { 'token': 'JWT vihnvkejn'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { note },
      });
    });
    const expectedActions = [
    	{ type: types.UPDATE_NOTE_REQUEST, phrase: 'hola' },
    	{ type: types.SUCCESSFUL_ACTION, text: "Note Saved" },
    	{ type: types.SET_UPDATE_NOTE, payload: false },
    	{ type: types.FETCH_NOTES_REQUEST, user }
    ];
    const store = mockStore({ auth: {}, note: note });
    return store.dispatch(noteActions.saveUpdatedNote(note, user))
    .then(() => {
    	expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action NOTIFY_REJECTED after update note request`, () => {
  	let note = { 'phrase' : 'hola', 'definition': 'hi', 'context': '', 'language': 'en', 'url': 'bbc.com'};
  	let user = { 'token': 'JWT vihnvkejn'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { err: {} },
      });
    });
    const expectedActions = [
    	{ type: types.UPDATE_NOTE_REQUEST, phrase: 'hola' },
    	{ type: types.REJECTED_ACTION, text: "Note update not saved, please try again." },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.saveUpdatedNote(note, user))
    .then(() => {
      	expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action delete note after update note request`, () => {
  	let note = { 'phrase' : 'hola', 'definition': 'hi', 'context': '', 'language': 'en', 'url': 'bbc.com'};
  	let user = { 'token': 'JWT vihnvkejn'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { res: {} },
      });
    });
    const expectedActions = [
    	{ type: types.DELETE_NOTE_REQUEST, phrase: 'hola' },
    	{ type: types.SUCCESSFUL_ACTION, text: "Note removed" },
    	{ type: types.FETCH_NOTES_REQUEST, user }
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.deleteNote(note, user))
    .then(() => {
      	expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`should create action delete note NOTIFY_REJECTED after update note request`, () => {
  	let note = { 'phrase' : 'hola', 'definition': 'hi', 'context': '', 'language': 'en', 'url': 'bbc.com'};
  	let user = { 'token': 'JWT vihnvkejn'};

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { error: {} },
      });
    });
    const expectedActions = [
    	{ type: types.DELETE_NOTE_REQUEST, phrase: 'hola' },
    	{ type: types.REJECTED_ACTION, text: "Couldn't delete that one - please try again." },
    ];
    const store = mockStore({ auth: {} });
    return store.dispatch(noteActions.deleteNote(note, user))
    .then(() => {
      	expect(store.getActions()).toEqual(expectedActions);
    });
  });
});