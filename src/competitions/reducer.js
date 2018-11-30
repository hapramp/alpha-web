import _ from 'lodash';

import { actionTypes } from './actions';
import { getPostByPermlink } from '../post/reducer';

const initialState = {
  loading: false,
  error: null,
  competitions: [],
  competitionPosts: {},
};

export default (state = initialState, action) => {
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
      newState = _.cloneDeep(state);
      newState.competitionPosts[action.competitionId] = {
        loading: true,
        error: null,
        posts: _.get(
          state,
          `state.competitionPosts.${action.competitionId}.posts`,
          [],
        ),
      };
      return newState;

    case actionTypes.getPosts.done:
      newState = _.cloneDeep(state);
      newState.competitionPosts[action.competitionId] = {
        loading: false,
        posts: action.results,
      };
      return newState;

    case actionTypes.getPosts.error:
      newState = _.cloneDeep(state);
      newState.competitionPosts[action.competitionId] = {
        loading: false,
        error: action.reason,
      };
      return newState;

    default:
      return state;
  }
};

// selectors
export const getAllCompetitions = state => state.competitions.competitions;

export const isCompetitionsFetching = state => state.competitions.loading;

export const getCompetitionPostPermlinks = (state, competitionId) => _.get(
  state,
  `competitions.competitionPosts.${competitionId}.posts`,
  [],
);

export const getCompetitionPosts = (state, competitionId) => {
  const postPermlinks = getCompetitionPostPermlinks(state, competitionId);

  // Extract all posts from allPosts reducer
  const posts = postPermlinks
    .map(permlink => getPostByPermlink(state, permlink))
    .filter(post => post); // Remove empty

  return posts;
};

export const getCompetitionById = (state, competitionId) => state
  .competitions.competitions.find(competition => competition.id === competitionId);
