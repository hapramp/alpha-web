import { actionTypes } from './actions';

const initialState = {
  loading: false,
  error: null,
  competitions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getAll.init:
      return { ...state, error: null, loading: true };

    case actionTypes.getAll.done:
      return { ...state, loading: false, competitions: action.results };

    case actionTypes.getAll.error:
      return { ...state, loading: false, error: action.reason };

    default:
      return state;
  }
};

// selectors
export const getAllCompetitions = state => state.competitions.competitions;

export const isCompetitionsFetching = state => state.competitions.loading;
