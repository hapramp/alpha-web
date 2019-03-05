import { combineReducers } from 'redux';

import { getCompetitionsState } from '../reducer';
import newCompetitionReducer from './newCompetition/reducer';
import announcementPostReducer from './AnnouncementPost/reducer';
import declareWinnersReducer from './DeclareWinners/reducer';

const createReducer = combineReducers({
  newCompetition: newCompetitionReducer,
  announce: announcementPostReducer,
  declareWinners: declareWinnersReducer,
});

export default createReducer;

// Selectors

/**
 * Returns the reducer's state
 * @param {object} state Current state
 */
export const getCreateCompetitionState = state => getCompetitionsState(state).create;

/**
 * Returns the state related to new competition
 * @param {object} state Current redux state
 */
export const getNewCompetitionState = state => getCreateCompetitionState(state).newCompetition;

export const getAnnouncementPostState = state => getCreateCompetitionState(state).announce;

export const getDeclareWinnersState = state => getCreateCompetitionState(state).declareWinners;
