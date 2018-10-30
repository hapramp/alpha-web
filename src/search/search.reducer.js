import actionTypes from './search.actionTypes';

const initialState = {
  searching: false,
  error: null,
  result: null,
  test: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER.INIT:
      return {
        ...state,
        searching: true,
        result: null,
        error: null,
        text: action.text,
      };

    case actionTypes.USER.DONE:
      return {
        ...state, searching: false, result: action.result, error: null,
      };

    case actionTypes.USER.ERROR:
      return {
        ...state, searching: false, result: null, error: action.reason,
      };

    case actionTypes.RESET:
      return initialState;

    default:
      return state;
  }
};

export const isSearching = state => state.searching;

export const hasErrorred = state => state.error !== null;

export const getResult = state => state.result;

export const getSearchTerm = state => state.search.text;
