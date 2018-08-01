export const actionTypes = {
  LOADING_COMMUNITIES: 'COMMUNITIES.LOAD.INIT',
  LOADED_COMMUNITIES: 'COMMUNITIES.LOAD.DONE',
  LOADING_COMMUNITIES_FAILED: 'COMMUNITIES.LOAD.FAILED',
};

export const loadCommunities = () => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.LOADING_COMMUNITIES });
  return haprampAPI.v2.communities.getAllCommunities()
    .then(result => dispatch({ type: actionTypes.LOADED_COMMUNITIES, result }))
    .catch(reason => dispatch({ type: actionTypes.LOADING_COMMUNITIES_FAILED, reason }));
};
