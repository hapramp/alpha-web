import cloneDeep from 'lodash/cloneDeep';

import { actionTypes } from './actions';
import { getCompetitionById } from '../../reducer';
import { getDeclareWinnersState } from '../reducer';

const initialState = {
  byId: {},
};

const DeclareWinnersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.setRank:
      newState = cloneDeep(state);
      if (!newState[action.competitionId]) {
        newState[action.competitionId] = {};
      }
      newState[action.competitionId][action.rank] = action.permlink;
      return newState;

    case actionTypes.unsetRank:
      newState = cloneDeep(state);
      delete newState[action.competitionId][action.rank];
      return newState;

    default:
      return state;
  }
};

export default DeclareWinnersReducer;

export const getAssignedRanksForCompetition = (state, competitionId) =>
  getDeclareWinnersState(state)[competitionId] || {};

export const getAllRanks = (state, competitionId) => {
  const competition = getCompetitionById(state, competitionId);
  if (!competition) {
    return null;
  }
  const assignedRanks = getAssignedRanksForCompetition(state, competitionId);
  return competition.prizes.map((prize, idx) => ({
    rank: idx + 1,
    prize,
    permlink: assignedRanks[idx + 1] || undefined,
  }));
};

export const isDeclarePossible = (state, competitionId) => {
  const ranks = getAllRanks(state, competitionId);
  if (!ranks) {
    return false;
  }
  return ranks.filter(r => !r.permlink).length === 0; // All permlinks present
};
