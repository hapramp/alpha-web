import _ from 'lodash';

import { actionTypes } from './actions';

const initialState = {
  allMicroCommunities: { // To store list of communities
    loading: false,
    error: null,
    microCommunities: [],
  },
  posts: {}, // To store post related information for a community
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.getAll.init:
      return {
        ...state,
        allMicroCommunities: {
          ...state.allMicroCommunities,
          loading: true,
          error: null,
        },
      };

    case actionTypes.getAll.done:
      return {
        ...state,
        allMicroCommunities: {
          ...state.allMicroCommunities,
          loading: false,
          error: null,
          microCommunities: action.results,
        },
      };

    case actionTypes.getAll.error:
      return {
        ...state,
        allMicroCommunities: {
          ...state.allMicroCommunities,
          loading: false,
          error: action.reason,
        },
      };

    case actionTypes.getPosts.done:
      newState = _.cloneDeep(state);
      if (!newState.posts[action.tag]) { // No entry for the tag, create one
        newState.posts[action.tag] = {
          trending: {
            loading: false,
            posts: [],
            lastAuthor: null,
            lastPermlink: null,
            hasMore: true,
          },
          created: {
            loading: false,
            posts: [],
            lastAuthor: null,
            lastPermlink: null,
            hasMore: true,
          },
          hot: {
            loading: false,
            posts: [],
            lastAuthor: null,
            lastPermlink: null,
            hasMore: true,
          },
          selects: {
            loading: false,
            posts: [],
            lastAuthor: null,
            lastPermlink: null,
            hasMore: true,
          },
        };
      }
      console.log(action);
      newState.posts[action.tag][action.order].posts = newState
        .posts[action.tag][action.order].posts.concat(action.posts);
      newState.posts[action.tag][action.order].loading = false;
      newState.posts[action.tag][action.order].lastAuthor = action.lastAuthor;
      newState.posts[action.tag][action.order].lastPermlink = action.lastPermlink;
      newState.posts[action.tag][action.order].hasMore = action.posts.length !== 0;
      return newState;

    default:
      return state;
  }
};

// Selector
export const getAllMicroCommunities = state => state.microCommunities
  .allMicroCommunities.microCommunities;

export const getMicroCommunityByTag = (state, tag) => state.microCommunities
  .allMicroCommunities.microCommunities
  .find(a => a.tag === tag);

export const getPostsForMicroCommunity = (state, tag) => _.get(
  state.microCommunities,
  `posts.${tag}`,
  {},
);

export const hasCurrentUserJoinedTag = (state, tag) => {
  // Micro communities for the current user are in authReducer
  const userMicros = _.get(
    state,
    'authUser.micro_communities',
    [],
  );
  return userMicros.map(micro => micro.tag).includes(tag);
};

export const isFeedLoading = (state, tag, order) => _.get(
  state.microCommunities,
  `posts.${tag}.${order}.loading`,
  false,
);

export const getLastPost = (state, tag, order) => {
  const posts = _.get(
    state.microCommunities,
    `posts.${tag}.${order}`,
    false,
  );
  return [posts.lastAuthor, posts.lastPermlink];
};
