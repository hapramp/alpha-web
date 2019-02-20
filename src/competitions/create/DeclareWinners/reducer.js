import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { actionTypes } from './actions';
import { getCompetitionById, isAnnounceAllowed, isWinnersDeclared } from '../../reducer';
import { getDeclareWinnersState } from '../reducer';

const initialState = {
  byId: {},
};

/**
 * This is what all the competitions look like
 * initially in the store
 */
const defaultInitialObject = {
  ranks: {},
  declare: {
    loading: false,
    error: null,
  },
};

const DeclareWinnersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.setRank:
      newState = cloneDeep(state);
      if (!newState[action.competitionId]) {
        newState[action.competitionId] = { ...defaultInitialObject };
      }
      newState[action.competitionId].ranks[action.rank] = action.permlink;
      return newState;

    case actionTypes.unsetRank:
      newState = cloneDeep(state);
      delete newState[action.competitionId].ranks[action.rank];
      return newState;

    // START Handling actions related to winner declaration
    case actionTypes.declareWinners.init:
      newState = cloneDeep(state);
      if (!newState[action.competitionId]) {
        newState[action.competitionId] = { ...defaultInitialObject };
      }
      newState[action.competitionId].declare.loading = true;
      return newState;

    case actionTypes.declareWinners.done:
      newState = cloneDeep(state);
      if (!newState[action.competitionId]) {
        newState[action.competitionId] = { ...defaultInitialObject };
      }
      newState[action.competitionId].declare.loading = false;
      newState[action.competitionId].declare.error = null;
      return newState;

    case actionTypes.declareWinners.error:
      newState = cloneDeep(state);
      if (!newState[action.competitionId]) {
        newState[action.competitionId] = { ...defaultInitialObject };
      }
      newState[action.competitionId].declare.loading = false;
      newState[action.competitionId].declare.error = action.reason;
      return newState;
    // END Handling actions related to winner declaration

    default:
      return state;
  }
};

export default DeclareWinnersReducer;

/**
 * Returns assigned ranks for a competition given it's ID
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const getAssignedRanksForCompetition = (state, competitionId) =>
  get(getDeclareWinnersState(state), `${competitionId}.ranks`, {});

/**
 * Returns all ranks for a competition including assignment
 * related information if any
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const getAllRanks = (state, competitionId) => {
  const competition = getCompetitionById(state, competitionId);
  if (!competition) {
    // No such competition
    return null;
  }
  const assignedRanks = getAssignedRanksForCompetition(state, competitionId);
  return competition.prizes.map((prize, idx) => ({
    rank: idx + 1,
    prize,
    // include the post assigned to the rank
    permlink: assignedRanks[idx + 1] || undefined,
  }));
};

/**
 * Returns true if it is possible for the user to assign
 * ranks to a competition, given it's ID
 * - Current user is the creator for the competition
 * - Results for the contest are not already declared
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const isRankAssignPossible = (state, competitionId) => {
  if (!isAnnounceAllowed(state, competitionId) || isWinnersDeclared(state, competitionId)) {
    return false;
  }
  return true;
};

/**
 * Checks if it's possible to proceed with declaring
 * winners for a competition
 * - All the prizes are assiged to the posts
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const isDeclarePossible = (state, competitionId) => {
  const ranks = getAllRanks(state, competitionId);
  if (!ranks) {
    return false;
  }
  return ranks.filter(r => !r.permlink).length === 0; // All permlinks present
};

/**
 * Returns true if winner declaration for a competition is in progress,
 * given its ID
 * @param {object} state Current redux state
 * @param {string} competitionId Competition ID
 */
export const isDeclareInProgress = (state, competitionId) =>
  get(getDeclareWinnersState(state), `${competitionId}.declare.loading`, false);
