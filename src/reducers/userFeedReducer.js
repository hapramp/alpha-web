import { actionTypes } from '../actions/userFeedActions';

const initialState = {
  user: { posts: [] }, hot: { posts: [] }, trending: { posts: [] }, created: { posts: [] },
};

export const userFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FEED_LOADED:
      if (action.feedType === 'user') {
        return { ...state, user: { posts: action.results } };
      } else if (action.feedType === 'hot') {
        return { ...state, hot: { posts: action.results } };
      } else if (action.feedType === 'trending') {
        return { ...state, trending: { posts: action.results } };
      }
      return { ...state, created: { posts: action.results } };

    default:
		// No problem
  }
  return state;
};
