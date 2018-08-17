import { actionTypes } from '../actions/userFeedActions';

const initialState = {
  user: { loading: false, posts: [], error: null },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FEED_LOADING:
      return { ...state, user: { ...state.user, loading: true } };

    case actionTypes.FEED_LOADED:
      return { ...state, user: { ...state.user, posts: action.results, loading: false } };

    case actionTypes.FEED_LOADING_FAILED:
      console.log(state);
      return { ...state, user: { ...state.user, loading: false, error: action.reason || true } };

    default:
      return state;
  }
};
