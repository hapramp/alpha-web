import { actionTypes as allUserActionTypes } from '../actions/allUserActions';
import { actionTypes as allPostsActionTypes } from '../post/actions';
import { isBlogLoading, getLastPost } from './reducer';

const PAGINATION_SIZE = 30;

export const actionTypes = {
  LOAD_USER_INFO: 'USER_PROFILE.LOAD.INIT',
  LOADED_USER_INFO: 'USER_PROFILE.LOAD.DONE',
  LOAD_USER_INFO_FAILED: 'USER_PROFILE.LOAD.FAILED',
  RESET_USER_INFO: 'USER_PROFILE.RESET',
  FOLLOW_COUNT_DONE: 'USER_PROFILE.FOLLOW.COUNT.DONE',
  FOLLOW_COUNT_FAILED: 'USER_PROFILE.FOLLOW.COUNT.FAILED',
  USER_BLOG_LOADING: 'USER_PROFILE.BLOG.LOAD.INIT',
  USER_BLOG_LOADED: 'USER_PROFILE.BLOG.LOAD.DONE',
  USER_BLOG_LOAD_FAILED: 'USER_PROFILE.BLOG.LOAD.FAILED',
};

export const loadUserProfileInfo = username => (dispatch, getState, { steemAPI }) => {
  dispatch({ type: actionTypes.LOAD_USER_INFO, username });
  return steemAPI.getUserAccount(username)
    .then((result) => {
      dispatch({ type: allUserActionTypes.LOAD_USERS_DONE, results: [result], username });
      dispatch({ type: actionTypes.LOADED_USER_INFO, username, result });
    })
    .catch(e => dispatch({ type: actionTypes.LOAD_USER_INFO_FAILED, username, reason: e }));
};

export const resetUserProfileInfo = () => dispatch =>
  dispatch({ type: actionTypes.RESET_USER_INFO });

export const getFollowCount = username => (dispatch, getState, { steemAPI }) =>
  steemAPI.getFollowCount(username)
    .then(result => dispatch({ type: actionTypes.FOLLOW_COUNT_DONE, result, username }))
    .catch(reason => dispatch({ type: actionTypes.FOLLOW_COUNT_FAILED, reason, username }));

export const getUserFeeds = username => (dispatch, getState, { haprampAPI }) => {
  const state = getState();

  if (isBlogLoading(state, username)) {
    return Promise.resolve();
  }

  const [startAuthor, startPermlink] = getLastPost(state, username);

  dispatch({ type: actionTypes.USER_BLOG_LOADING, username });
  return haprampAPI.v2.feed.getFeedsByBlog(username, PAGINATION_SIZE, startAuthor, startPermlink)
    .then((result) => {
      dispatch({ type: allPostsActionTypes.ADD_POSTS, posts: result.posts, username });
      return dispatch({
        type: actionTypes.USER_BLOG_LOADED,
        results: result.posts.map(post => `${post.author}/${post.permlink}`),
        username,
        lastAuthor: result.last_author,
        lastPermlink: result.last_permlink,
      });
    })
    .catch(reason => dispatch({ type: actionTypes.USER_BLOG_LOAD_FAILED, reason, username }));
};

export const updateProfile = data => (dispatch, getState, { steemAPI }) => {
  const url = steemAPI.sc2Api.sign(
    'profile-update',
    data,
  );

  const newWindow = window.open(url, '_blank');
  newWindow.focus();
};
