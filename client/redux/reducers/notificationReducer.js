import axios from "axios";
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SUCCESSFUL_ACTION, REJECTED_ACTION, INFO_ACTION, 
  WARNING, SUCCESS } from '../actions/types';

let initial = {
  text: '',
  type: ''
};

const notificationReducer = (state = initial, action) => {
  switch (action.type) {
    case SUCCESSFUL_ACTION:
      return { 
        ...state, 
        text: action.text,
        type: SUCCESS
      };
    case REJECTED_ACTION:
      return {
        ...state,
        text: action.text,
        type: WARNING
      }
    case INFO_ACTION:
      return {
        ...state,
        text: action.text
      }
    default:
      return state;
  }
};
export default notificationReducer;