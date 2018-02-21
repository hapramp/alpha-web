import {combineReducers} from 'redux';

import {loginReducer} from './loginReducer';
import {addContentReducer} from "./addContentReducer";
import {authUserReducer} from "./authUserReducer";

export default combineReducers({
	login: loginReducer,
	addContent: addContentReducer,
	authUser: authUserReducer
});
