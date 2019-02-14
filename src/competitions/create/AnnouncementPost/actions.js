import uniq from 'lodash/uniq';
import { push } from 'connected-react-router';

import { getPostContent, getTags, getTitle } from './reducer';
import { getAuthUsername } from '../../../reducers/authUserReducer';
import { getCompetitionById } from '../../reducer';

export const baseName = '@competitions/create/announce';

export const actionTypes = {
  setPostContent: `${baseName}/setPostContent`,
  setTags: `${baseName}/setTags`,
  setTitle: `${baseName}/setTitle`,
  registerAndCreatePost: {
    init: `${baseName}/registerAndCreate/init`,
    done: `${baseName}/registerAndCreate/done`,
    error: `${baseName}/registerAndCreate/error`,
  },
};

export const setPostContent = content => dispatch => dispatch({
  type: actionTypes.setPostContent,
  content,
});

export const setTitle = title => dispatch => dispatch({
  type: actionTypes.setTitle,
  title,
});

export const setTags = tags => dispatch => dispatch({
  type: actionTypes.setTags,
  tags: uniq(tags // Remove duplicates
    .map(tag => tag.toLowerCase())
    .filter(tag => tag.match(/^[a-z|A-Z]/))), // Should start with a character
});

export const registerAndCreatePost = (competitionId, announcementMode) =>
  async (dispatch, getState, { haprampAPI, steemAPI, notify }) => {
    const state = getState();
    const tags = getTags(state);
    const body = getPostContent(state);
    const author = getAuthUsername(state);
    const title = getTitle(state);

    const fields = {
      tags,
      body,
      author,
      title,
      competitionId,
      announcementMode,
    };

    dispatch({
      type: actionTypes.registerAndCreatePost.init,
      ...fields,
    });

    const permlink = await steemAPI.createPermlink(title, author, '', '');

    return steemAPI.sc2Operations.createPost(
      author, body, tags, null, permlink,
      title,
    ).then(() => {
      /**
       * Post has been created, now register the permlink
       * with backend
       */
      notify.success(`Post created on Steem with permlink: ${permlink}`);
      return haprampAPI.v2.competitions
        .registerAnnouncementPermlink(competitionId, announcementMode, author, permlink);
    }).then((response) => {
      /**
       * Post created and permlink registered with backend.
       * Redirect to the competition page
       */
      dispatch(push(`/competitions/${competitionId}`));
      notify.success('Post created for competition');
      return dispatch({
        type: actionTypes.registerAndCreatePost.done,
        response,
        ...fields,
      });
    }).error((reason) => {
      /**
       * Error occured either while creating or while
       * registering the post.
       * If the post has been created, the user would
       * get a message asking not to retry.
       */
      const errorText = 'There was some error registering the post. If already posted to Steem, do not retry and contact @the1ramp.';
      console.error('[Unable to register post', reason, errorText);
      notify.danger('There was some error registering the post. If already posted to Steem, do not retry and contact @the1ramp.');
      return dispatch({
        type: actionTypes.registerAndCreatePost.error,
        reason,
        ...fields,
      });
    });
  };

export const fillAnnouncementPost = (competitionId, mode) =>
  async (dispatch, getState, { haprampAPI }) => {
    const realMode = mode === 'declare_winners' ? 'winners' : mode;
    const state = getState();
    const competition = getCompetitionById(state, competitionId);
    dispatch(setTitle(competition.title));
    return haprampAPI.v2.competitions.getCompetitionPostBody(competitionId, realMode)
      .then(result => dispatch(setPostContent(result.body)));
  };
