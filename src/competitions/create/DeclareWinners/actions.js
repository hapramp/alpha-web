export const baseName = '@competitions/create/declareWinners';

export const actionTypes = {
  setRank: `${baseName}/setRank`,
  unsetRank: `${baseName}/unsetRank`,
};

export const setRank = (competitionId, permlink, rank) => dispatch => dispatch({
  type: actionTypes.setRank, permlink, rank, competitionId,
});

export const unsetRank = (competitionId, rank) => dispatch => dispatch({
  type: actionTypes.unsetRank, rank, competitionId,
});
