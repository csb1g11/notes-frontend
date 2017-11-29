import axios from 'axios';
import config from 'config';
import { FETCH_NOTES_REQUEST, FETCH_NOTES_FULFILLED, FETCH_NOTES_REJECTED, 
  SEARCH_NOTES, ADD_NOTE, ADD_NOTE_REQUEST, DELETE_NOTE, DELETE_NOTE_REQUEST, 
  UPDATE_NOTE, UPDATE_NOTE_REQUEST, CANCEL_UPDATE, SET_UPDATE_NOTE } from './types';
import { notifySuccess, notifyRejected } from './notificationActions';

export const updateNote = (note) => { return { type: UPDATE_NOTE, payload: note }};
export const createNote = (note) => { return { type: ADD_NOTE, payload: note }};
export const setUpdate = (update) => { return {type: SET_UPDATE_NOTE, payload: update}};
export const searchNotes = (searchTerm) => { return {type: SEARCH_NOTES, payload: searchTerm}};
export const cancelUpdate = (note) => { return {type: CANCEL_UPDATE, payload: note}};

export function fetchNotes(user) {
  return dispatch => {
    dispatch({ type: FETCH_NOTES_REQUEST, 
               user });
    
    return axios.get(config.apiRoot + '/notes/')
      .then((response) => {
        dispatch({ type: FETCH_NOTES_FULFILLED, 
                   payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: FETCH_NOTES_REJECTED, 
                  payload: err.response.data })
      })
  }
}

export function addNote({ phrase, context, definition, language, website }, user) {
  return dispatch => {
    dispatch({ type: ADD_NOTE_REQUEST, 
               phrase });

    return axios({ 
      method: 'POST', 
      url: config.apiRoot + '/notes/', 
      headers: { 'Content-Type': 'application/json' }, 
      data: JSON.stringify({ phrase, context, definition, language, website }) })
    .then(res => {

      console.log("asking to add note", res);
      dispatch(notifySuccess("All saved - safe & sound!"));
      dispatch(fetchNotes(user));
      return res;
    })
    .catch(error => {
      console.log("error", error);
      dispatch(notifyRejected("Oh no! We haven't kept that safe just yet, please try again."));
      return error;
    });
  }
}

export function saveUpdatedNote(note, user) {
  return dispatch => {
    dispatch({ type: UPDATE_NOTE_REQUEST, 
              phrase : note.phrase });

    return axios({ 
      method: 'PUT', 
      url: note.url, 
      headers: { 'Content-Type': 'application/json' }, 
      data: JSON.stringify(note) 
    }).then(res => {

      dispatch(notifySuccess("Note Saved"));
      dispatch(setUpdate(false));
      dispatch(fetchNotes(user));
      return res;
    }).catch(error => {

      dispatch(notifyRejected("Note update not saved, please try again."));
      return error;
    });
  };
}


export function deleteNote({ phrase, context, definition, language, url}, user) {
  return dispatch => {    
    dispatch({ type: DELETE_NOTE_REQUEST, 
               phrase : phrase });
    
    return axios({ 
      method: 'DELETE', 
      url: url, 
      data: {} })
    .then(function(response) {

       dispatch(notifySuccess("Note removed"));
       dispatch(fetchNotes(user));
    })
    .catch(error => {

      dispatch(notifyRejected("Couldn't delete that one - please try again."));
      return error;
    });
  };
}
