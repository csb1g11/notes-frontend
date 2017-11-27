import axios from "axios";
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, SUCCESSFUL_ACTION, GET_TOKEN_REQUEST, LOGIN_REQUEST } from './types';
import { notifySuccess, notifyRejected } from './notificationActions';
import config from 'config';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function getToken(credentials) { 
    return dispatch => {
      dispatch({type: GET_TOKEN_REQUEST, user : credentials })

      return axios({
        method: 'post',
        url: config.apiRoot + '/api-token-auth/',
        data: JSON.stringify(credentials)
      }).then(res => {
        return res.data;
      }).catch(error => {
        dispatch(notifyRejected("Please login again"));
        return error;
      });
  };
}

export const logout = () => {
  return dispatch => {
    try {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(notifySuccess("Logged out"));
      dispatch(setCurrentUser({}));
    } catch (error) {
      dispatch(notifyRejected("Please refresh and try again"));
      return error;
    }
  }
};

export const login = (credentials) => {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST, user : credentials })

    return axios.post(config.apiRoot + '/api-token-auth/', credentials)
    .then(res => {
      const token = res.data.token;
      let decodedToken = '';

      if (token !== undefined) {
        decodedToken = jwtDecode(token);
        dispatch(setCurrentUser(decodedToken));
        localStorage.setItem('jwtToken', token);
        dispatch(notifySuccess("Welcome " + credentials.username));
      } else {
        dispatch(notifyRejected("Invalid credentials provided / user doesn't exist"));
      }
      
      setAuthorizationToken(token);
      axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
      
      return res;
    })
    .catch(error => {
    	if (error.response && error.response.status && error.response.status === 401) {
    			dispatch(notifyRejected("Those aren't the details we recognise, please try again!"));
    	} else {
    	  dispatch(notifyRejected("Please try again"));
      }
	});
  }
}