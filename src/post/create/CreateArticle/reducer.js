import { EditorState } from 'draft-js';
import some from 'lodash/some';
import uniq from 'lodash/uniq';

import { actionTypes } from './actions';

const initialState = {
  title: '',
  content: EditorState.createEmpty(),
  markdownText: '',
  markdownEditorActive: false,
  communities: [],
  tags: [],
  create: {
    creating: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  let communities;
  let tags;
  switch (action.type) {
    case actionTypes.CHANGE_COMMUNITY:
      communities = state.communities.slice();
      if (some(communities, i => i === action.community)) {
        communities = communities.filter(i => i !== action.community);
      } else if (communities.length < 3) {
        communities.push(action.community);
      }
      return { ...state, communities };

    case actionTypes.SET_TITLE:
      return { ...state, title: action.title };

    case actionTypes.SET_CONTENT:
      return { ...state, content: action.content };

    case actionTypes.ADD_TAG:
      tags = state.tags.slice();
      tags.push(action.tag);
      return { ...state, tags: uniq(tags) };

    case actionTypes.REMOVE_TAG:
      tags = state.tags.filter(tag => tag !== action.tag);
      return { ...state, tags };

    case actionTypes.CREATE_INIT:
      return {
        ...state,
        create: {
          ...state.create,
          creating: true,
          error: null,
        },
      };

    case actionTypes.CREATE_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          creating: false,
          error: action.reason,
        },
      };

    case actionTypes.ACTIVATE_MARDOWN_EDITOR:
      return {
        ...state,
        markdownEditorActive: true,
      };

    case actionTypes.DEACTIVATE_MARDOWN_EDITOR:
      return {
        ...state,
        markdownEditorActive: false,
      };

    case actionTypes.SET_MARKDOWN_TEXT:
      return {
        ...state,
        markdownText: action.text,
      };

    case actionTypes.CREATE_DONE:
      return initialState;

    default:
      return state;
  }
};

// Selectors
export const getSelectedCommunities = state => state.createArticle.communities;

export const getActiveTags = state => state.createArticle.tags || [];

export const isArticlePublishable = (state) => {
  const articleState = state.createArticle;

  // TODO: Also check for content
  if (
    articleState.title.length === 0
    || articleState.communities.length === 0
  ) {
    return false;
  }

  if (articleState.create.creating) {
    return false;
  }

  return true;
};

export const getArticleContent = state => state.createArticle.content;

export const getArticleTitle = state => state.createArticle.title;

export const getMarkdownText = state => state.createArticle.markdownText;

export const isMarkdownEditorActive = state => state.createArticle.markdownEditorActive;
