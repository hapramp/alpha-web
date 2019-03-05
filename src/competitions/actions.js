import { push } from 'connected-react-router';

import { addPosts } from '../post/actions';
import { addTag as addArticleTag } from '../post/create/CreateArticle/actions';
import { getLastCompetitionId } from './reducer';

const competitionListLoadCatchSize = 6;
const baseName = '@competitions';

export const actionTypes = {
  getAll: {
    init: `${baseName}/getAll/init`,
    done: `${baseName}/getAll/done`,
    error: `${baseName}/getAll/error`,
  },
  getPosts: {
    init: `${baseName}/getPosts/init`,
    done: `${baseName}/getPosts/done`,
    error: `${baseName}/getPosts/error`,
  },
  getWinners: {
    init: `${baseName}/getWinners/init`,
    done: `${baseName}/getWinners/done`,
    error: `${baseName}/getWinners/error`,
  },
  getCompetition: {
    init: `${baseName}/getCompetition/init`,
    done: `${baseName}/getCompetition/done`,
    error: `${baseName}/getCompetition/error`,
  },
};

export const getAllCompetitions = (reload = true) => (dispatch, getState, { haprampAPI }) => {
  const state = getState();
  dispatch({ type: actionTypes.getAll.init, reload });
  let lastId;
  if (!reload) {
    lastId = getLastCompetitionId(state);
  }
  return haprampAPI.v2.competitions.getCompetitions(competitionListLoadCatchSize, lastId)
    .then(result => dispatch({
      type: actionTypes.getAll.done,
      results: result.competitions,
      reload,
    }))
    .catch(reason => dispatch({ type: actionTypes.getAll.error, reason, reload }));
};

export const getCompetitionById = competitionId => (dispatch, getState, { haprampAPI }) => {
  dispatch({
    type: actionTypes.getCompetition.init,
    competitionId,
  });
  return haprampAPI.v2.competitions.getCompetition(competitionId)
    .then(result => dispatch({
      type: actionTypes.getCompetition.done,
      competitionId,
      result,
    }))
    .catch((reason) => {
      console.error('[Get Competition] Error fetching competition', reason);
      return dispatch({
        type: actionTypes.getCompetition.error,
        competitionId,
        reason,
      });
    });
};

export const getPostsForCompetition = competitionId => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.getPosts.init, competitionId });
  return haprampAPI.v2.competitions.getCompetitionPosts(competitionId)
    .then((results) => {
      dispatch(addPosts(results));
      return dispatch({
        type: actionTypes.getPosts.done,
        competitionId,
        results: results.map(post => `${post.author}/${post.permlink}`),
      });
    })
    .catch(reason => dispatch({ type: actionTypes.getPosts.error, reason, competitionId }));
};

export const getCompetitionWinners = competitionId => (dispatch, getState, { haprampAPI }) => {
  dispatch({ type: actionTypes.getWinners.init, competitionId });
  return haprampAPI.v2.competitions.getCompetitionWinners(competitionId)
    .then((results) => {
      dispatch(addPosts(results));
      return dispatch({
        type: actionTypes.getWinners.done,
        competitionId,
        results: results.map(post => `${post.author}/${post.permlink}`),
      });
    })
    .catch((reason) => {
      console.error('[Get Competition Winners]', reason);
      return dispatch({ type: actionTypes.getWinners.error, competitionId, reason });
    });
};

export const participateInCompetition = tag => (dispatch) => {
  dispatch(addArticleTag(tag));
  return dispatch(push('/create/article'));
};
