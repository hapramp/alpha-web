import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';
import get from 'lodash/get';

import { actionTypes } from './actions';

const getEmptyProfileData = () => ({
  loading: false,
  user: null,
  error: null,
  blog: {
    count: 0,
    posts: [],
    loading: false,
    lastAuthor: null,
    lastPermlink: null,
    hasMore: true,
  },
  follower: { count: 0, accounts: [] },
  following: { count: 0, accounts: [] },
});

const initialState = {};

export default (state = initialState, action) => {
  const { username } = action;

  const nextState = cloneDeep(state);

  if (!nextState[username]) {
    nextState[username] = getEmptyProfileData();
  }

  const currentUser = nextState[username];

  let newUser = action.result;
  if (action.type === actionTypes.LOADED_USER_INFO && action.result) {
    if (typeof (action.result.json_metadata) === 'string') {
      newUser.json_metadata = JSON.parse(newUser.json_metadata);
    } else {
      newUser = action.result;
    }
  }

  switch (action.type) {
    case actionTypes.LOAD_USER_INFO:
      currentUser.loading = true;
      nextState[username] = currentUser;
      return nextState;

    case actionTypes.LOADED_USER_INFO:
      currentUser.loading = false;
      currentUser.user = newUser;
      nextState[username] = currentUser;
      return nextState;

    case actionTypes.LOAD_USER_INFO_FAILED:
      currentUser.loading = false;
      currentUser.error = (action.reason.toString && action.reason.toString()) || action.reason;
      nextState[username] = currentUser;
      return nextState;

    // case actionTypes.RESET_USER_INFO:
    //   nextState[username] = getEmptyProfileData();
    //   return nextState;

    case actionTypes.FOLLOW_COUNT_DONE:
      currentUser.follower.count = action.result.follower_count;
      currentUser.following.count = action.result.following_count;
      nextState[username] = currentUser;
      return nextState;

    case actionTypes.USER_BLOG_LOADING:
      currentUser.blog.loading = true;
      nextState[username] = currentUser;
      return nextState;

    case actionTypes.USER_BLOG_LOADED:
      currentUser.blog.posts = uniq(currentUser.blog.posts.concat(action.results));
      currentUser.blog.count = currentUser.blog.posts.length;
      currentUser.blog.lastAuthor = action.lastAuthor;
      currentUser.blog.lastPermlink = action.lastPermlink;
      currentUser.blog.loading = false;
      currentUser.blog.hasMore = action.results.length !== 0;
      nextState[username] = currentUser;
      return nextState;

    case actionTypes.USER_BLOG_LOAD_FAILED:
      currentUser.error = action.reason;
      currentUser.blog.loading = false;
      nextState[username] = currentUser;
      return nextState;

    default:
      return state;
  }
};

// Selectors
export const getPostCount = (state, username) => get(
  state.userProfile,
  `[${username}]user.post_count`,
  0,
);

export const getFollowerCount = (state, username) => get(
  state.userProfile,
  `[${username}]follower.count`,
  0,
);

export const getFollowingCount = (state, username) => get(
  state.userProfile,
  `[${username}]following.count`,
  0,
);

export const getUserProfile = (state, username) => get(
  state.userProfile,
  `['${username}']`,
  getEmptyProfileData(),
);

export const getUserBlogPosts = (state, username) => getUserProfile(state, username).blog.posts;

export const getUserJSONMetadata = (state, username) => get(
  getUserProfile(state, username),
  'user.json_metadata',
  {},
);

export const getUserName = (state, username) => get(
  getUserProfile(state, username),
  'user.name',
  username,
);

export const isProfileMetaLoading = (state, username) => !getUserProfile(state, username).user;

export const isBlogLoading = (state, username) => getUserProfile(state, username).blog.loading;

export const hasMoreFeed = (state, username) => getUserProfile(state, username).blog.hasMore;

export const getLastPost = (state, username) => {
  const prof = getUserProfile(state, username);
  return [
    prof.blog.lastAuthor,
    prof.blog.lastPermlink,
  ];
};
