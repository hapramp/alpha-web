import { push } from 'connected-react-router';

import { getAllRanks } from './reducer';

export const baseName = '@competitions/create/declareWinners';

export const actionTypes = {
  setRank: `${baseName}/setRank`,
  unsetRank: `${baseName}/unsetRank`,
  declareWinners: {
    init: `${baseName}/declareWinners/init`,
    done: `${baseName}/declareWinners/done`,
    error: `${baseName}/declareWinners/error`,
  },
};

/**
 * Assigns rank to an entry
 * @param {string} competitionId Competition ID
 * @param {string} permlink Full permlink for the entry
 * @param {number} rank Rank for the entry
 */
export const setRank = (competitionId, permlink, rank) => dispatch => dispatch({
  type: actionTypes.setRank, permlink, rank, competitionId,
});

/**
 * Removed permlink from an entry
 * @param {string} competitionId Competition ID
 * @param {number} rank Rank to unset
 */
export const unsetRank = (competitionId, rank) => dispatch => dispatch({
  type: actionTypes.unsetRank, rank, competitionId,
});

/**
 * Declares winners for a competition given it's ID
 * @param {string} competitionId Competition ID
 */
export const declareWinners = competitionId => (dispatch, getState, { haprampAPI }) => {
  const state = getState();
  const ranks = getAllRanks(state, competitionId);
  dispatch({ type: actionTypes.declareWinners.init, competitionId, ranks });

  // Set the winners for the competition
  return haprampAPI.v2.competitions.setWinners(competitionId, ranks)
    // Announce results for the competition
    .then(() => haprampAPI.v2.competitions.announceResults(competitionId))
    .then((result) => {
      /**
       * Winners announced, move to post announcement form
       * for declaring winners
       */
      dispatch(push(`/competitions/~create/post/${competitionId}/declare_winners`));
      return dispatch({
        type: actionTypes.declareWinners.done,
        result,
        competitionId,
        ranks,
      });
    }).catch((reason) => {
      console.error('Failed to declare winners', reason);
      return dispatch({
        type: actionTypes.declareWinners.error,
        reason,
        competitionId,
        ranks,
      });
    });
};
