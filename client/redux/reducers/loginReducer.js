import axios from "axios";
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user});

let initial = {
  token: '',
  isAuthenticated: false,
  user: {},
  auth: {},
  text: ''
};


const loginReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, isAuthenticated: !isEmpty(action.user), 
        user: action.user 
      };
    default:
      return state;
  }
};
export default loginReducer;