import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import loginReducer from './loginReducer';
import noteReducer from './noteReducer';


const rootReducer = combineReducers({ 
	routing: routerReducer,
	login: loginReducer,
	form: formReducer,
	note: noteReducer
});

export default rootReducer;