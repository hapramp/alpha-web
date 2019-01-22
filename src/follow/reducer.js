import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { actionTypes } from './actions';

const initialState = {};
/**
 * {
 *   uname1: {
 *     followers: {
 *       count: 10,
 *       results: {uname2: true, ...}
 *     },
 *     following: {
 *       count: 123,
 *       results: {uname3: true, ...}
 *     }
 *   },
 *   ...
 * }
 */

export default (state = initialState, action) => {
  const newState = cloneDeep(state);
  let following;
  let follower;
  switch (action.type) {
    case actionTypes.FOLLOWER_LOAD_DONE:
    case actionTypes.FOLLOWING_LOAD_DONE:

      action.results.map((result) => {
        ({ follower, following } = result);

        if (!newState[follower]) {
          newState[follower] = {};
        }
        if (!newState[following]) {
          newState[following] = {};
        }

        if (!newState[following].followers) {
          newState[following].followers = {
            results: {},
            count: 0,
          };
        }
        if (!newState[follower].following) {
          newState[follower].following = {
            results: {},
            count: 0,
          };
        }

        newState[follower].following.results[following] = true;
        newState[follower].following.count = Object
          .keys(newState[follower].following.results[following])
          .length;
        newState[following].followers.results[follower] = true;
        newState[following].followers.count = Object
          .keys(newState[following].followers.results[follower])
          .length;
        return result;
      });
      return newState;

    case actionTypes.FOLLOW_INIT:
      ({ follower, following } = action);

      if (!newState[follower]) {
        newState[follower] = {};
      }
      if (!newState[following]) {
        newState[following] = {};
      }

      if (!newState[following].followers) {
        newState[following].followers = {
          results: {},
          count: 0,
        };
      }
      if (!newState[follower].following) {
        newState[follower].following = {
          results: {},
          count: 0,
        };
      }

      newState[follower].following.results[following] = true;
      newState[follower].following.count = Object
        .keys(newState[follower].following.results[following])
        .length;
      newState[following].followers.results[follower] = true;
      newState[following].followers.count = Object
        .keys(newState[following].followers.results[follower])
        .length;
      return newState;


    case actionTypes.UNFOLLOW_INIT:
      ({ follower, following } = action);

      if (!newState[follower]) {
        newState[follower] = {};
      }
      if (!newState[following]) {
        newState[following] = {};
      }

      if (!newState[following].followers) {
        newState[following].followers = {
          results: [],
          count: 0,
        };
      }
      if (!newState[follower].following) {
        newState[follower].following = {
          results: [],
          count: 0,
        };
      }
      delete newState[follower].following.results[following];
      newState[follower].following.count = newState[follower].following.results[following] ?
        Object.keys(newState[follower].following.results[following]).length : 0;
      delete newState[following].followers.results[follower];
      newState[following].followers.count = newState[following].followers.results[follower] ?
        Object.keys(newState[following].followers.results[follower]).length : 0;
      return newState;

    // TODO: Handle error case.. (remove from following/unfollowing)

    default:
      return state;
  }
};

// Selectors

export const isFollowing = (state, follower, following) => get(
  state.follow,
  `[${follower}].following.results[${following}]`,
  false,
);
