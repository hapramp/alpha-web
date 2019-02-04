export const baseName = '@competition/leaderboard';

export const actionTypes = {
  fetch: {
    init: `${baseName}/fetch/init`,
    done: `${baseName}/fetch/done`,
    error: `${baseName}/fetch/error`,
  },
};

export const fetchLeaderboard = () => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.fetch.init });
  return haprampAPI.v2.competitions.getLeaderboard()
    .then(result => dispatch({
      type: actionTypes.fetch.done,
      results: result.winners,
    }))
    .catch((reason) => {
      console.error('[Competition Leaderboard] Error fetching leaderboard', reason);
      return dispatch({
        type: actionTypes.fetch.error,
        reason,
      });
    });
};
