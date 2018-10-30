import _ from 'lodash';

import notify from '../utils/notification';
import { actionTypes } from './actions';

const initialState = { posts: {} };

export default (state = initialState, action) => {
  let posts;
  let key;
  let currentUser;

  switch (action.type) {
    case actionTypes.ADD_POSTS:
      posts = _.cloneDeep(state.posts);
      action.posts.map((oldPost) => {
        const post = { ...oldPost };
        if (typeof (post.json_metadata) === 'string') {
          try {
            post.json_metadata = JSON.parse(post.json_metadata);
          } catch (error) {
            console.log('[POST JSON METADATA PARSE ERROR]', error, post);
            post.json_metadata = {};
          }
        }
        posts[`${post.author}/${post.permlink}`] = post;
        return post;
      });
      return { ...state, posts };

    case actionTypes.VOTE_POST_INIT:
      posts = _.cloneDeep(state.posts); // TODO: Reduce clone depth
      key = `${action.author}/${action.permlink}`;
      currentUser = localStorage.getItem('username');
      if (_.some(posts[key].active_votes, i => i.voter === currentUser)) {
        posts[key].active_votes = posts[key].active_votes.map((oldVote) => {
          const vote = { ...oldVote };
          if (vote.voter === currentUser) {
            vote.percent = action.vote * 20 * 100;
          }
          return vote;
        });
      } else {
        posts[key].active_votes.push({ voter: currentUser, percent: action.vote * 20 * 100 });
      }
      return { ...state, posts };

    case actionTypes.VOTE_POST_DONE:
      notify.info(`Rating done for post by ${action.author}.`);
      return state;

      // TODO: Handle post upvote error case

    default:
      return state;
  }
};
