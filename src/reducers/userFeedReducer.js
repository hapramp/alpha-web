import _ from 'lodash';

import { actionTypes } from '../actions/userFeedActions';

const initialState = {};

export default (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  const type = action.feedType;

  if (!newState[type]) {
    newState[type] = {
      posts: [],
      error: null,
      loading: false,
      lastAuthor: null,
      lastPermlink: null,
      hasMore: true,
    };
  }

  switch (action.type) {
    case actionTypes.FEED_LOADING:
      newState[type].loading = true;
      newState[type].error = null;
      if (!newState[type].posts) {
        newState[type].posts = [];
      }
      return newState;

    case actionTypes.FEED_LOADED:
      newState[type].posts = newState[type].posts.concat(action.results);
      newState[type].posts = _.uniq(newState[type].posts);
      newState[type].loading = false;
      newState[type].error = null;
      newState[type].lastAuthor = action.lastAuthor;
      newState[type].lastPermlink = action.lastPermlink;
      newState[type].hasMore = action.results.length !== 0;
      return newState;

    case actionTypes.FEED_LOADING_FAILED:
      newState[type].loading = false;
      newState[type].error = action.reason || true;
      return newState;

    default:
      return state;
  }
};

// selectors
export const hasMoreFeed = (state, type) => _.get(
  state,
  `userFeed.${type}.hasMore`,
  false,
);

export const getLastPost = (state, type) => ([
  _.get(state, `userFeed.${type}.lastAuthor`, null),
  _.get(state, `userFeed.${type}.lastPermlink`, null),
]);

export const isLoading = (state, type) => _.get(
  state,
  `userFeed.${type}.loading`,
  false,
);
