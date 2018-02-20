import {combineReducers} from 'redux';

import {loginReducer} from './loginReducer';
import {addContentReducer} from "./addContentReducer";

export default combineReducers({
	login: loginReducer,
	addContent: addContentReducer
});
