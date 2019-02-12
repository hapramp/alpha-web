import { combineReducers } from 'redux';

import { getCompetitionsState } from '../reducer';
import newCompetitionReducer from './newCompetition/reducer';

const createReducer = combineReducers({
  newCompetition: newCompetitionReducer,
});

export default createReducer;

// Selectors

// Gets us to the current reducer
export const getCreateCompetitionState = state => getCompetitionsState(state).create;

export const getNewCompetitionState = state => getCreateCompetitionState(state).newCompetition;
