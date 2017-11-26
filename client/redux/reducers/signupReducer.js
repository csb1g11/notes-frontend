import axios from "axios";
import isEmpty from 'lodash/isEmpty';
import { CREATE_USER } from '../actions/signupActions';

/////////////////ACTIONS//////////////
export const createUser = (user) => ({type: CREATE_USER, user});

/////////////////REDUCER/////////////////////
let initial = {
  user: {},
  auth: {}
};

const signupReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { isAuthenticated: !isEmpty(action.user), user: action.user };
    default:
      return state;
  }
};
export default signupReducer;