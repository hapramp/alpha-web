import { stateToHTML } from 'draft-js-export-html';
import { push } from 'connected-react-router';

import { getAuthUsername } from '../../../reducers/authUserReducer';
import {
  getArticleContent, getActiveTags, getSelectedCommunities,
  getArticleTitle, isMarkdownEditorActive, getMarkdownText,
} from './reducer';
import { getAllTags, addFooter } from '../CreatePost/actions';
import { getAllCommunities } from '../../../reducers/communitiesReducer';

export const actionTypes = {
  SET_CONTENT: 'CREATE_ARTICLE.CONTENT.SET',
  SET_TITLE: 'CREATE_ARTICLE.TITLE.SET',
  CHANGE_COMMUNITY: 'CREATE_ARTICLE.COMMUNITIES.CHANGE',
  ADD_TAG: 'CREATE_ARTICLE.TAGS.ADD',
  REMOVE_TAG: 'CREATE_ARTICLE.TAGS.REMOVE',
  CREATE_INIT: 'CREATE_ARTICLE.INIT',
  CREATE_DONE: 'CREATE_ARTICLE.DONE',
  CREATE_ERROR: 'CREATE_ARTICLE.ERROR',
  SET_MARKDOWN_TEXT: 'CREATE_ARTICLE.MARKDOWN.TEXT.SET',
  ACTIVATE_MARDOWN_EDITOR: 'CREATE_ARTICLE.MARKDOWN.ACTIVE.SET',
  DEACTIVATE_MARDOWN_EDITOR: 'CREATE_ARTICLE.MARKDOWN.ACTIVE.UNSET',
};

export const setContent = content => ({ type: actionTypes.SET_CONTENT, content });

export const setTitle = title => ({ type: actionTypes.SET_TITLE, title });

export const uploadImage = image => (dispatch, getState, { haprampAPI }) =>
  haprampAPI.v2.uploadImage(image);

export const changeCommunity = community => ({
  type: actionTypes.CHANGE_COMMUNITY,
  community,
});

export const addTag = tag => ({
  type: actionTypes.ADD_TAG,
  tag,
});

export const removeTag = tag => ({
  type: actionTypes.REMOVE_TAG,
  tag,
});

export const createArticle = () => async (dispatch, getState, { steemAPI, notify }) => {
  const state = getState();
  const author = getAuthUsername(state);
  const articleContent = getArticleContent(state);
  const tags = getActiveTags(state);
  const communities = getSelectedCommunities(state);
  const allCommunities = getAllCommunities(state);
  const title = getArticleTitle(state);

  const allTags = getAllTags(communities, tags, allCommunities);

  dispatch({
    type: actionTypes.CREATE_INIT,
    author,
    tags,
    communities,
    title,
    allTags,
  });

  const permlink = await steemAPI.createPermlink(title, author, '', '');

  const contentHTML = isMarkdownEditorActive(state) ?
    getMarkdownText(state) : stateToHTML(articleContent.getCurrentContent());
  const contentHTMLWithFooter = addFooter(contentHTML, author, permlink);

  return steemAPI.sc2Operations.createPost(
    author, contentHTMLWithFooter, allTags,
    articleContent, permlink, title,
  ).then(() => {
    notify.success('Article created!');
    dispatch(push(`/@${author}/${permlink}`));
    return dispatch({
      type: actionTypes.CREATE_DONE,
      author,
      tags,
      communities,
      title,
      content: contentHTMLWithFooter,
      permlink,
      allTags,
    });
  }).catch((reason) => {
    console.error('[CREATE POST ERROR]', reason);
    notify.danger('Failed to create post');
    return dispatch({
      type: actionTypes.CREATE_ERROR,
      author,
      tags,
      communities,
      title,
      content: contentHTMLWithFooter,
      permlink,
      allTags,
      reason,
    });
  });
};

export const setMarkdownText = text => dispatch => dispatch({
  type: actionTypes.SET_MARKDOWN_TEXT,
  text,
});

export const setMarkdownEditorActive = (state = true) => dispatch => dispatch({
  type: state ? actionTypes.ACTIVATE_MARDOWN_EDITOR : actionTypes.DEACTIVATE_MARDOWN_EDITOR,
});
