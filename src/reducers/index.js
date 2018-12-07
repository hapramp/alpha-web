import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import addContentReducer from './addContentReducer';
import authUserReducer from './authUserReducer';
import createPostReducer from '../post/create/CreatePost/reducer';
import userProfileReducer from '../profile/reducer';
import communitiesReducer from './communitiesReducer';
import userFeedReducer from './userFeedReducer';
import allUserReducer from './allUsersReducer';
import createArticleReducer from '../post/create/CreateArticle/reducer';
import allPostsReducer from '../post/reducer';
import repliesReducer from '../post/Replies/reducer';
import followReducer from '../follow/reducer';
import searchReducer from '../search/search.reducer';
import registerReducer from '../register/reducer';
import competitionsReducer from '../competitions/reducer';
import microCommunitiesReducer from '../microCommunities/reducer';

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
  replies: repliesReducer,
  follow: followReducer,
  search: searchReducer,
  register: registerReducer,
  competitions: competitionsReducer,
  microCommunities: microCommunitiesReducer,
});
