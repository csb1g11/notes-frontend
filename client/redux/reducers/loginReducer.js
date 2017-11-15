import axios from "axios";
import setAuthorizationToken from '../../utils/setAuthorizationToken';

/////////////////CONSTANTS/////////////////////
const FETCH_TOKEN = "FETCH_TOKEN";
const FETCH_TOKEN_SUCCESSFUL = "FETCH_TOKEN_SUCCESSFUL";
const CHANGE_STATUS = "CHANGE_STATUS";
const SET_CURRENT_USER = "SET_CURRENT_USER";

/////////////////ACTIONS//////////////
const fetchToken = (token) => ({type: FETCH_TOKEN, token});
const fetchTokenSuccessful = (token) => ({type: FETCH_TOKEN_SUCCESSFUL, token});
const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user});

/////////////////REDUCER/////////////////////
let initial = {
  token: '',
  isAuthenticated: false,
  user: {},
  auth: {}
};

const loginReducer = (state = initial, action) => {
  switch (action.type) {
    case FETCH_TOKEN:
      console.log("fetchToken");
      return Object.assign({}, state, {token: action.token});
    case FETCH_TOKEN_SUCCESSFUL:
      return Object.assign({}, state, {token: action.token});
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};
export default loginReducer;

/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const getToken = (credentials) => dispatch => {

  console.log("getting token from action");

  try {
    axios({
      method: 'post',
      url: 'http://localhost:8000/api-token-auth/',
      data: JSON.stringify(credentials)
    }).then(function(response) {
      return response.data()
    }).then(function(data) {
      console.log("dispatch a new note");
      dispatch(fetchTokenSuccessful({ token: data }));
    });

    return responseJson.data;
  } catch(error) {
    console.error(error);
  }
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
};

export const login = (data) => {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export const userSignupRequest = (userData) => {
  return dispatch => {
    return axios.post('/api/users', userData);
  }
}

export const ifUserExists = (identifier) => {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}