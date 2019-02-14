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
  // 'hasMore' Says if there may be more competitions to fetch from backend
  hasMore: true,
  competitionsById: {},
  competitionPosts: {},
};

const competitionsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // All competitions
    case actionTypes.getAll.init:
      return { ...state, error: null, loading: true };

    case actionTypes.getAll.done:
      return {
        ...state,
        loading: false,
        competitionsById: action.results.reduce(
          (acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          },
          state.competitionsById,
        ),
        hasMore: action.results.length > 0,
      };

    case actionTypes.getAll.error:
      return { ...state, loading: false, error: action.reason };

    //  Single competition
    case actionTypes.getCompetition.done:
      // Clone only competitions data
      newState = cloneDeep(state.competitionsById);
      newState[action.competitionId] = action.result;
      return { ...state, competitionsById: newState };

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
/**
 * Returns state for this reducer given the global redux state
 * @param {object} state Current redux state
 */
export const getCompetitionsState = state => state.competitions;

/**
 * Returns all competitions in descending order of
 * creating time
 * @param {object} state Current redux state
 */
export const getAllCompetitions = (state) => {
  const { competitionsById } = getCompetitionsState(state).competitions;
  return Object.values(competitionsById)
    // Sort based on time of creation
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

/**
 * Returns true if we are currently fetching competitions
 * @param {object} state Current redux state
 */
export const isCompetitionsFetching = state => getCompetitionsState(state).competitions.loading;

/**
 * Returns permlinks for entries to a contest, such
 * that winning entries appear in the beginning of
 * the array
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
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

/**
 * Returns all submissions to a contest given the
 * competition ID
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const getCompetitionPosts = (state, competitionId) => {
  const postPermlinks = getCompetitionPostPermlinks(getCompetitionsState(state), competitionId);

  // Extract all posts from allPosts reducer
  const posts = postPermlinks
    .map(permlink => getPostByPermlink(getCompetitionsState(state), permlink))
    .filter(post => post) // Remove empty
    .sort((a, b) => new Date(b) - new Date(a)); // Sort based on date

  return posts;
};

/**
 * Fetches a competition given its ID
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const getCompetitionById = (state, competitionId) => getCompetitionsState(state)
  .competitions.competitionsById[competitionId];

/**
 * Finds out if posts for a competition is loading, given
 * its ID
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const isPostsLoading = (state, competitionId) => get(
  getCompetitionsState(state),
  `competitions.competitionPosts.${competitionId}.loading`,
  false,
);

/**
 * Extracts the last competition ID or null if there
 * are no competitions present in store
 * @param {object} state Current redux state
 */
export const getLastCompetitionId = (state) => {
  const competitions = getAllCompetitions(state);
  if (competitions.length === 0) {
    return undefined;
  }
  return competitions[competitions.length - 1].id;
};

/**
 * Fetched the hasMore variable
 * @param {object} state Current state
 */
export const hasMore = state => getCompetitionsState(state).competitions.hasMore;
