import noteReducer from '../client/redux/reducers/noteReducer';
import * as types from '../client/redux/actions/types';

jest.mock('config');

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(noteReducer(undefined, {})).toEqual(
      {
        language: '',
        notes: [],
        searchTerm: '',
        fetching: false,
        fetched: false,
        error: null
      }
    )
  })

  it('should handle FETCH_NOTES_REQUEST', () => {
    expect(noteReducer([], {
        type: types.FETCH_NOTES_REQUEST
      })
    ).toEqual(
      {
        fetching: true
      }
    )
  })

  it('should handle FETCH_NOTES_REJECTED', () => {
    let error = { "error" : "oh dear" }
    expect(noteReducer([], {
        type: types.FETCH_NOTES_REJECTED,
        payload: error
      })
    ).toEqual(
      {
        fetching: false,
        error
      }
    )
  })

  it('should handle FETCH_NOTES_FULFILLED', () => {
    let notes = [ { 'phrase': 'hola', 
                    'definition': 'hi', 
                    'language' : 'es'},
                  { 'phrase': 'amigo', 
                    'definition': 'friend', 
                    'language' : 'es'},
                  {'phrase': 'enemigo', 
                   'definition': 'enemy', 
                   'language' : 'es' }];


    expect(noteReducer([], {
        type: types.FETCH_NOTES_FULFILLED,
        payload: notes
      })
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        notes
      }
    )
  })

  it('should handle ADD_NOTE', () => {
    let notes = [ { 'phrase': 'hola', 
                    'definition': 'hi', 
                    'language' : 'es'},
                  { 'phrase': 'amigo', 
                    'definition': 'friend', 
                    'language' : 'es'},
                  { 'phrase': 'enemigo', 
                  'definition': 'enemy', 
                  'language' : 'es' }];
    let newNote = { 'phrase': 'silla', 
                    'definition': 'chair', 
                    'language' : 'es' };
    let newNotes = [...notes, newNote];

    expect(noteReducer({
      notes: notes
    }, {
        type: types.ADD_NOTE,
        payload: newNote
      })
    ).toEqual(
      {
        notes : newNotes
      }
    )
  })

  it('should handle UPDATE_NOTE', () => {
    let notes = [ { 'phrase': 'hola', 
                    'definition': 'hi', 
                    'language' : 'es', 
                    'url': '/1' },
                  { 'phrase': 'amigo', 
                    'definition': 'friend', 
                    'language' : 'es', 
                    'url': '/2' },
                  { 'phrase': 'enemigo', 
                    'definition': 'enemy', 
                    'language' : 'es', 
                    'url': '/3' }];
    let newNote = { 'phrase': 'hola', 
                    'definition': 'hi', 
                    'context': 'hola amigo', 
                    'language' : 'es', 
                    'url': '/1' };

    let newNotes = [  { 'phrase': 'hola', 
                        'definition': 'hi', 
                        'context': 'hola amigo', 
                        'language' : 'es', 
                        'url': '/1', 
                        'update': true },
                      { 'phrase': 'amigo', 
                        'definition': 'friend', 
                        'language' : 'es', 
                        'url': '/2' },
                      { 'phrase': 'enemigo', 
                        'definition': 'enemy', 
                        'language' : 'es', 
                        'url': '/3' }];

    expect(noteReducer({
      notes: notes
    }, {
        type: types.UPDATE_NOTE,
        payload: newNote
      })
    ).toEqual(
      {
        notes : newNotes
      }
    )
  })

  it('should handle SET_UPDATE_NOTE', () => {

    expect(noteReducer({}, {
        type: types.SET_UPDATE_NOTE,
        payload: true
      })
    ).toEqual(
      {
        update: true
      }
    )

    expect(noteReducer({}, {
        type: types.SET_UPDATE_NOTE,
        payload: false
      })
    ).toEqual(
      {
        update: false
      }
    )
  })

  it('should handle DELETE_NOTE', () => {

    let notes = [{ 'phrase': 'hola', 
                   'definition': 'hi', 
                   'language' : 'es', 
                   'url': '/1' },
                 { 'phrase': 'amigo', 
                   'definition': 'friend', 
                   'language' : 'es', 
                   'url': '/2' },
                 { 'phrase': 'enemigo', 
                   'definition': 'enemy', 
                   'language' : 'es', 
                   'url': '/3' }];

    let deleteNote = { 'phrase': 'hola', 
                       'definition': 'hi', 
                       'context': 'hola amigo', 
                       'language' : 'es', 
                       'url': '/1' };

    let newNotes = [{ 'phrase': 'amigo', 
                      'definition': 'friend', 
                      'language' : 'es', 
                      'url': '/2' },
                    { 'phrase': 'enemigo', 
                    'definition': 'enemy', 
                    'language' : 'es', 
                    'url': '/3' }];

    expect(noteReducer({
      notes: notes
    }, {
        type: types.DELETE_NOTE,
        payload: deleteNote
      })
    ).toEqual(
      {
        notes : newNotes
      }
    )
  })

  it('should handle SEARCH_NOTES', () => {
    let searchTerm = 'hi';

    expect(noteReducer({}, {
        type: types.SEARCH_NOTES,
        payload: searchTerm
      })
    ).toEqual(
      {
        searchTerm : searchTerm
      }
    )
  })

  it('should handle CANCEL_UPDATE', () => {
    let notes = [ { 'phrase': 'hola', 
                    'definition': 'hi', 
                    'language' : 'es', 
                    'url': '/1', 
                    'update': true},
                  { 'phrase': 'amigo', 
                    'definition': 'friend', 
                    'language' : 'es', 
                    'url': '/2' },
                  { 'phrase': 'enemigo', 
                    'definition': 'enemy', 
                    'language' : 'es', 
                    'url': '/3' }];
    let newNote = { 'phrase': 'hola', 
                    'definition': 'hi', 
                    'context': 'hola amigo', 
                    'language' : 'es', 
                    'url': '/1' };

    let newNotes = [{ 'phrase': 'hola', 
                      'definition': 'hi', 
                      'context': 'hola amigo', 
                      'language' : 'es', 
                      'url': '/1', 
                      'update': false },
                    { 'phrase': 'amigo', 
                      'definition': 'friend', 
                      'language' : 'es', 
                      'url': '/2' },
                    { 'phrase': 'enemigo', 
                      'definition': 'enemy', 
                      'language' : 'es', 
                      'url': '/3' }];

    expect(noteReducer({
      notes: notes
    }, {
        type: types.CANCEL_UPDATE,
        payload: newNote
      })
    ).toEqual(
      {
        notes : newNotes,
        update: false
      }
    )
  })
})