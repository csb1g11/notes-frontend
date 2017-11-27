import axios from "axios";
import isEmpty from 'lodash/isEmpty';
import { SIGNUP_REQUEST, CREATE_USER_REQUEST } from '../actions/types';

let initial = {
  user: {},
  auth: {},
  isFetching: false,
  isCreating: false
};

const signupReducer = (state = initial, action) => {
	let type = action.type || '';

	switch (type) {
		case SIGNUP_REQUEST:
	     	return { ...state, 
	     		isAuthenticated: !isEmpty(action.user), 
	     		user: action.user,
	     		isFetching: true };
	  	case CREATE_USER_REQUEST:
	     	return { ...state, 
	     		user: action.user, 
	     		isCreating: true, 
	     		isFetching: false };
	    default:
	     	return state;
	}
};

export default signupReducer;