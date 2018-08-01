export const actionTypes = {
  ADD_POSTS: 'ALL_POSTS.ADD',
  DELETE_POSTS: 'ALL_POSTS.DELETE',
  VOTE_POST_INIT: 'ALL_POSTS.VOTE.INIT',
  VOTE_POST_DONE: 'ALL_POSTS.VOTE.DONE',
  VOTE_POST_ERROR: 'ALL_POSTS.VOTE.ERROR',
};

export const addPosts = posts => dispatch => dispatch({ type: actionTypes.ADD_POSTS, posts });

export const deletePosts = posts => dispatch => dispatch({ type: actionTypes.DELETE_POSTS, posts });

export const loadPost = (username, permlink) => (dispatch, getState, { steemAPI }) =>
  steemAPI.loadPost(username, permlink)
    .then((result) => {
      console.log(result);
      dispatch({ type: actionTypes.ADD_POSTS, posts: result.posts });
      // dispatch({ type: allUserActionTypes.LOAD_USERS_DONE, results: result.users });
    });
