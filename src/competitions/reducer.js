import { combineReducers } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import uniq from 'lodash/uniq';

import leaderboardReducer from './Leaderboard/reducer';
import createReducer from './create/reducer';
import { actionTypes } from './actions';
import { getPostByPermlink } from '../post/reducer';

const initialState = {
  loading: false,
  error: null,
  competitions: [],
  competitionPosts: {},
};

const competitionsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // All competitions
    case actionTypes.getAll.init:
      return { ...state, error: null, loading: true };

    case actionTypes.getAll.done:
      return { ...state, loading: false, competitions: action.results };

    case actionTypes.getAll.error:
      return { ...state, loading: false, error: action.reason };

    // Competition posts
    case actionTypes.getPosts.init:
      newState = cloneDeep(state);
      newState.competitionPosts[action.competitionId] = {
        loading: true,
        error: null,
        posts: get(
          state,
          `state.competitionPosts.${action.competitionId}.posts`,
          [],
        ),
      };
      return newState;

    case actionTypes.getPosts.done:
      newState = cloneDeep(state);
      newState.competitionPosts[action.competitionId] = {
        loading: false,
        posts: action.results,
        winners: get(
          newState,
          `competitionPosts.${action.competitionId}.winners`,
          [],
        ),
      };
      return newState;

    case actionTypes.getPosts.error:
      newState = cloneDeep(state);
      newState.competitionPosts[action.competitionId] = {
        loading: false,
        error: action.reason,
      };
      return newState;

    case actionTypes.getWinners.done:
      newState = cloneDeep(state);
      newState.competitionPosts[action.competitionId].winners = action.results;
      return newState;

    default:
      return state;
  }
};

export default combineReducers({
  competitions: competitionsReducer,
  leaderboard: leaderboardReducer,
  create: createReducer,
});

// selectors
export const getCompetitionsState = state => state.competitions;
export const getAllCompetitions = state => getCompetitionsState(state).competitions.competitions;

export const isCompetitionsFetching = state => getCompetitionsState(state).competitions.loading;

export const getCompetitionPostPermlinks = (state, competitionId) => {
  const winners = get(
    getCompetitionsState(state),
    `competitions.competitionPosts.${competitionId}.winners`,
    [],
  );
  const posts = get(
    getCompetitionsState(state),
    `competitions.competitionPosts.${competitionId}.posts`,
    [],
  );

  return uniq([...winners, ...posts]);
};

export const getCompetitionPosts = (state, competitionId) => {
  const postPermlinks = getCompetitionPostPermlinks(getCompetitionsState(state), competitionId);

  // Extract all posts from allPosts reducer
  const posts = postPermlinks
    .map(permlink => getPostByPermlink(getCompetitionsState(state), permlink))
    .filter(post => post); // Remove empty

  return posts;
};

export const getCompetitionById = (state, competitionId) => getCompetitionsState(state)
  .competitions.competitions.find(competition => competition.id === competitionId);

export const isPostsLoading = (state, competitionId) => get(
  getCompetitionsState(state),
  `competitions.competitionPosts.${competitionId}.loading`,
  false,
);
