import actionTypes from './search.actionTypes';
import steemAPI from '../utils/steem';
import { getSearchTerm } from './search.reducer';

export const searchUser = text => (dispatch, getState) => {
  const searchText = getSearchTerm(getState());
  if (text === searchText) {
    return;
  }

  dispatch({ type: actionTypes.USER.INIT, text });
  steemAPI.steem.api.lookupAccounts(text, 10, (err, result) => {
    if (err) {
      dispatch({ type: actionTypes.USER.ERROR, reason: err, text });
      return Promise.reject(err);
    }
    return dispatch({ type: actionTypes.USER.DONE, result, text });
  });
};

export const resetSearchState = () => ({ type: actionTypes.RESET });

export const searchPost = () => () => {};
