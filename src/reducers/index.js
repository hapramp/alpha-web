import {combineReducers} from 'redux';

import {loginReducer} from './loginReducer';
import {addContentReducer} from './addContentReducer';
import {authUserReducer} from './authUserReducer';
import {createPostReducer} from './createPostReducer';
import {userProfileReducer} from './userProfileReducer';
import {communitiesReducer} from './communitiesReducer';
import {userFeedReducer} from './userFeedReducer';
import {allUserReducer} from './allUsersReducer';
import {createArticleReducer} from './createArticleReducer';
import {allPostsReducer} from './allPostsReducer';

export default combineReducers({
	login: loginReducer,
	addContent: addContentReducer,
	authUser: authUserReducer,
	createPost: createPostReducer,
	userProfile: userProfileReducer,
	communities: communitiesReducer,
	userFeed: userFeedReducer,
	allUsers: allUserReducer,
	createArticle: createArticleReducer,
	allPosts: allPostsReducer,
});
