import _ from 'lodash';

import { actionTypes } from './actions';

const getEmptyProfileData = () => ({
  loading: false,
  user: null,
  error: null,
  blog: { count: 0, posts: [] },
  follower: { count: 0, accounts: [] },
  following: { count: 0, accounts: [] },
});

const initialState = {};

export default (state = initialState, action) => {
  const { username } = action;

  const nextState = _.cloneDeep(state);

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
      currentUser.user = null;
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

    case actionTypes.USER_BLOG_LOADED:
      currentUser.blog.count = action.results.length;
      currentUser.blog.posts = action.results;
      nextState[username] = currentUser;
      return nextState;

    case actionTypes.USER_BLOG_LOAD_FAILED:
      currentUser.error = action.reason;
      nextState[username] = currentUser;
      return nextState;

    default:
      return state;
  }
};

// Selectors
export const getPostCount = (state, username) => _.get(
  state.userProfile,
  `[${username}]user.post_count`,
  0,
);

export const getFollowerCount = (state, username) => _.get(
  state.userProfile,
  `[${username}]follower.count`,
  0,
);

export const getFollowingCount = (state, username) => _.get(
  state.userProfile,
  `[${username}]following.count`,
  0,
);

export const getUserProfile = (state, username) => _.get(
  state.userProfile,
  `[${username}]`,
  getEmptyProfileData(),
);
