import * as loginActions from '../client/redux/actions/loginActions';
import * as noteActions from '../client/redux/actions/noteActions';
import * as notificationActions from '../client/redux/actions/notificationActions';
import * as signupActions from '../client/redux/actions/signupActions';

import * as types from '../client/redux/actions/types';
jest.mock('config');
jest.mock('axios');

describe('actions creators', () => {
  it('should create an action to set the current user', () => {
    const user = {}
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user
    }
    expect(loginActions.setCurrentUser(user)).toEqual(expectedAction)
  })

  it('should create an action to update a note', () => {
    const note = {
    	'phrase': 'hola',
    	'definition': 'hi',
    	'context': 'hola mi amiga'
    }
    const expectedAction = {
      type: types.UPDATE_NOTE,
      payload: note
    }
    expect(noteActions.updateNote(note)).toEqual(expectedAction)
  })

  it('should create an action to create a note', () => {
    const note = {
    	'phrase': 'hola',
    	'definition': 'hi',
    	'context': 'hola mi neuva amiga'
    }
    const expectedAction = {
      type: types.ADD_NOTE,
      payload: note
    }
    expect(noteActions.createNote(note)).toEqual(expectedAction)
  })

  it('should create an action to set update true for note', () => {
    const note = {
      'phrase': 'hola',
      'definition': 'hi',
      'context': 'hola mi neuva amiga'
    }
    const expectedAction = {
      type: types.SET_UPDATE_NOTE,
      payload: note
    }
    expect(noteActions.setUpdate(note)).toEqual(expectedAction)
  });

  it('should create an action to search through the notes', () => {
    const searchTerm = 'note';

    const expectedAction = {
      type: types.SEARCH_NOTES,
      payload: searchTerm
    }
    expect(noteActions.searchNotes(searchTerm)).toEqual(expectedAction)
  });

  it('should create an action to cancel an update and enable update for other notes', () => {
    const note = {
      'url' : '123.com'
    };

    const expectedAction = {
      type: types.CANCEL_UPDATE,
      payload: note
    }
    expect(noteActions.cancelUpdate(note)).toEqual(expectedAction)
  });

  it('should create an action to notify of a successful action', () => {
    const text = 'Successful';

    const expectedAction = {
      type: types.SUCCESSFUL_ACTION,
      text: text
    }
    expect(notificationActions.notifySuccess(text)).toEqual(expectedAction)
  });

  it('should create an action to notify of a rejected action', () => {
    const text = 'Rejected';

    const expectedAction = {
      type: types.REJECTED_ACTION,
      text: text
    }
    expect(notificationActions.notifyRejected(text)).toEqual(expectedAction)
  });

  it('should create an action to notify of a neutral action', () => {
    const text = 'Info';

    const expectedAction = {
      type: types.INFO_ACTION,
      text: text
    }
    expect(notificationActions.notifyInfo(text)).toEqual(expectedAction)
  });
})