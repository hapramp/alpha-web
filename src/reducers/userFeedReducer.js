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
      newState[type].posts = action.results;
      newState[type].loading = false;
      newState[type].error = null;
      return newState;

    case actionTypes.FEED_LOADING_FAILED:
      newState[type].loading = false;
      newState[type].error = action.reason || true;
      return newState;

    default:
      return state;
  }
};
