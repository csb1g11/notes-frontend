import axios from "axios";
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import isEmpty from 'lodash/isEmpty';
import { FETCH_NOTES, FETCH_NOTES_REJECTED, FETCH_NOTES_FULFILLED, ADD_NOTE, 
  DELETE_NOTE, UPDATE_NOTE, SEARCH_NOTES, CANCEL_UPDATE, SET_UPDATE_NOTE } from '../actions/types';

let initial = {
  language: '',
  notes: [],
  searchTerm: '',
  fetching: false,
  fetched: false,
  error: null
};

const noteReducer = (state = initial, action) => {
  switch (action.type) {
      case FETCH_NOTES: {
        return { ...state, fetching: true }
      }
      case FETCH_NOTES_REJECTED: {
        return { ...state, fetching: false, error: action.payload}
      }
      case FETCH_NOTES_FULFILLED: {
        const newNotes = action.payload

        const newState = {
          ...state,
          fetching: false,
          fetched: true,
          notes: newNotes
        };

        return newState;
      }
      case ADD_NOTE: {
        return {
          ...state,
          notes: [...state.notes, action.payload],
        }
      }
      case UPDATE_NOTE: {
        const { url } = action.payload
        const newNotes = [...state.notes]
        const noteToUpdate = newNotes.findIndex(note => note.url === url)
        newNotes[noteToUpdate] = { ...action.payload, update: true};

        return {
          ...state,
          notes: newNotes,
        }
      }
      case SET_UPDATE_NOTE: {
        const updateStatus = action.payload

        return {
          ...state,
          update: updateStatus,
        }
      }
      case DELETE_NOTE: {
        return {
          ...state,
          notes: state.notes.filter(note => note.url !== action.payload.url),
        }
      }
      case SEARCH_NOTES: {
        const { payload } = action;
        return {...state, 
          searchTerm: payload, 
        };
      }
      case CANCEL_UPDATE: {
        const { url } = action.payload
        const newNotes = [...state.notes]
        const noteToUpdate = newNotes.findIndex(note => note.url === url)
        newNotes[noteToUpdate] = { ...action.payload, update: false};

        return {
          ...state,
          notes: newNotes,
        }
      }
      default:
        return state;
  }

  return state;
};

export default noteReducer;