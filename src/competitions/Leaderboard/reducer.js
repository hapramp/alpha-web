import { actionTypes } from './actions';

const initialState = {
  loading: false,
  winners: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.fetch.init:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.fetch.done:
      return {
        ...state,
        loading: false,
        error: null,
        winners: action.results,
      };

    case actionTypes.fetch.error:
      return {
        ...state,
        loading: false,
        error: action.reason,
      };

    default:
      return state;
  }
};

// Selectors
export const getCompetitionsLeaderboardState = state => state.competitionsLeaderboard;

export const isFetching = (state) => {
  const leaderboardState = getCompetitionsLeaderboardState(state);
  return leaderboardState.loading;
};

export const getWinners = (state) => {
  const leaderboardState = getCompetitionsLeaderboardState(state);
  return leaderboardState.winners;
};
