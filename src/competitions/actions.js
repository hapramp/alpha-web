const baseName = '@competitions';

export const actionTypes = {
  getAll: {
    init: `${baseName}/get_all/init`,
    done: `${baseName}/get_all/done`,
    error: `${baseName}/get_all/error`,
  },
};

export const getAllCompetitions = () => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.getAll.init });
  return haprampAPI.v2.competitions.getAll()
    .then(results => dispatch({ type: actionTypes.getAll.done, results }))
    .catch(reason => dispatch({ type: actionTypes.getAll.error, reason }));
};
