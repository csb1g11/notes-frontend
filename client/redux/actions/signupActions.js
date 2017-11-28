import axios from "axios";
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SIGNUP_REQUEST, CREATE_USER_REQUEST } from './types';
import { notifySuccess, notifyRejected } from './notificationActions';
import jwtDecode from 'jwt-decode';
import config from 'config';

export function createNewUser(credentials) {
  return dispatch => {
    dispatch({type: CREATE_USER_REQUEST, user : credentials });

    return axios({
        method: 'post',
        url: config.apiRoot + '/api-auth/',
        data: JSON.stringify(credentials)
      }).then(res => {
        dispatch(notifySuccess("Added user " + credentials.username));
        return res.data; 
      }).catch(error => {
        dispatch(notifyRejected("Please try again"));
        return error;
      });
  };
}

export const userSignupRequest = (credentials) => {
  return dispatch => {
    dispatch({type: SIGNUP_REQUEST, user : credentials });

    return axios
      .post(config.apiRoot +'/users/', credentials)
      .then(response => {
        dispatch(notifySuccess("All signed up!"))
        return response.data;
      }).catch((error) => {
        if (error.response.status === 400){
          dispatch(notifyRejected("A user exists with these credentials"))
        } else {
          dispatch(notifyRejected("There was an error, please try again"))
        }
      });
  }
}