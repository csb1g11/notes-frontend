import axios from "axios";

/////////////////CONSTANTS/////////////////////
const GET_ALL_NOTES = "GET_ALL_NOTES";
const POST_NOTE = "POST_NOTE";
const CHANGE_STATUS = "CHANGE_STATUS";
const DELETE_NOTE = "DELETE_NOTE";

/////////////////ACTIONS//////////////
const getNotes = (notes) => ({type: GET_ALL_NOTES, notes});
const addNote = (note) => ({type: POST_NOTE, note});
const changeStatus = (note) => ({type: CHANGE_STATUS, note});
/////////////////REDUCER/////////////////////
//initiate your starting state
let initial = {
  notes: []
};
const noteReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_NOTES:
      return Object.assign({}, state, {notes: action.notes.objects});
    case POST_NOTE:
      let updatedNotes = [action.note].concat(state.notes);
      return Object.assign({}, state, {notes: updatedNotes});
    case CHANGE_STATUS:
      let newArr = state.notes.map((note) => {
        if(note.slug === action.note.slug) note.metafields[0].value = !note.metafields[0].value;
        return note;
      });
      return Object.assign({}, state, {notes: newArr});
    case DELETE_NOTE:
      let arr = state.notes.filter((note) => {
        return !(note.slug === action.slug);
      });
      return Object.assign({}, state, {notes: arr});
    default:
      return state;
  }
};
export default noteReducer;

/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const getAllNotes = () => dispatch => {
  axios.get(`https://api.cosmicjs.com/v1/your-bucket-slug-name/object-type/notes`)
    .then((response) => {
      return response.data;
    })
    .then((notes) => {
      dispatch(getNotes(notes))
    })
    .catch((err) => {
      console.error.bind(err);
    })
};
export const postNewNote = (note) => dispatch => {
  dispatch(addNote({phrase: note, metafields: [{value: false}], slug: formatSlug(note)}));
  axios.post(`https://api.cosmicjs.com/v1/your-bucket-slug-name/add-object`, {type_slug: "notes", phrase: note, content: "New Note",
    metafields: [
      {
        phrase: "Is Complete",
        key: "is_complete",
        value: false,
        type: "text"
      }
    ]})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error.bind(err);
    })
};
export const putChangeStatus = (note, bool) => (dispatch) => {
  dispatch(changeStatus(note));
  axios.put(`https://api.cosmicjs.com/v1/your-bucket-slug-name/edit-object`, {slug: note.slug,
    metafields: [
      {
        phrase: "Is Complete",
        key: "is_complete",
        value: !bool,
        type: "text"
      }
    ]})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error.bind(err);
    })
};
export const deleteNote = (slug) => (dispatch) => {
  dispatch(noteDelete(slug));
  axios.delete(`https://api.cosmicjs.com/v1/your-bucket-slug-name/${slug}`)
    .then((response) => {
    console.log(response.data)
    })
    .catch((err) => {
      console.error.bind(err);
    })
};
const formatSlug = (phrase) => {
  let lower = phrase.toLowerCase();
  return lower.split(" ").join("-");
};