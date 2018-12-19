import { getUserAccountsAction } from '../actions/allUserActions';

export const actionTypes = {
  ADD_POSTS: 'ALL_POSTS.ADD',
  DELETE_POSTS: 'ALL_POSTS.DELETE',
  VOTE_POST_INIT: 'ALL_POSTS.VOTE.INIT',
  VOTE_POST_DONE: 'ALL_POSTS.VOTE.DONE',
  VOTE_POST_ERROR: 'ALL_POSTS.VOTE.ERROR',
};

export const addPosts = posts => dispatch => dispatch({ type: actionTypes.ADD_POSTS, posts });

export const deletePosts = posts => dispatch => dispatch({ type: actionTypes.DELETE_POSTS, posts });

export const loadState = (parentPermlink, author, permlink) => (dispatch, getState, { steemAPI }) =>
  steemAPI.getContentState(parentPermlink, author, permlink)
    .then((state) => {
      const { content, accounts } = state;
      const posts = Object.values(content);
      const users = Object.values(accounts);
      return Promise.all([
        dispatch(addPosts(posts)),
        dispatch(getUserAccountsAction(users)),
      ]);
    });

export const loadPost = (username, permlink) => (dispatch, getState, { steemAPI }) =>
  // TODO: Update user redux state from post info
  steemAPI.loadPost(username, permlink)
    .then((result) => {
      dispatch({ type: actionTypes.ADD_POSTS, posts: result.posts });
      return Promise.all(result.posts
        .map(post => dispatch(loadState(post.parentPermlink, post.author, post.permlink))));
    });
