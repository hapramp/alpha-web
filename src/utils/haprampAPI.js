import Cookie from 'js-cookie';

import constants from './constants';

const getPromiseForUrl = (url, options = {}) => new Promise((resolve, reject) => {
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        response.json().then(json => resolve(json));
      } else {
        reject();
      }
    })
    .catch(e => reject(e));
});

const validateJsonResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.statusText);
};

const getPaginatedPromise = (baseURL, limit, startAuthor, startPermlink, options = {}) => {
  const startAuthorParam = startAuthor ? `&start_author=${startAuthor}` : '';
  const startPermlinkParam = startPermlink ? `&start_permlink=${startPermlink}` : '';
  return getPromiseForUrl(`${baseURL}?limit=${limit}${startAuthorParam}${startPermlinkParam}`, options);
};

export default {
  v2: {
    post: {
      prepare: (content, fullPermlink) => new Promise((resolve, reject) => {
        fetch(`${constants.BACKEND_URL.V2}/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: JSON.stringify(content), full_permlink: fullPermlink }),
        }).then((response) => {
          if (response.ok) {
            response.json().then(json => resolve(json.body));
          } else {
            reject(new Error({ message: constants.MESSAGES.POST.CREATE.FAILED_BODY }));
          }
        }).catch(e => reject(e));
      }),
      confirm: (vote, permlink) => {
        const url = `${constants.BACKEND_URL.V2}/posts/votes/_notify?permlink=${permlink}`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('ppk_hash')}`,
          },
          body: JSON.stringify({ vote }),
        };
        return getPromiseForUrl(url, options);
      },
      confirmComment: (permlink) => {
        const url = `${constants.BACKEND_URL.V2}/posts/comments/_notify?permlink=${permlink}`;
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Token ${localStorage.getItem('ppk_hash')}`,
          },
        };
        return getPromiseForUrl(url, options);
      },
    },
    feed: {
      getUserFeed: (username, limit = 20, startAuthor = null, startPermlink = null) =>
        getPaginatedPromise(`${constants.BACKEND_URL.V2}/feeds/user/${username}`, limit, startAuthor, startPermlink),
      getFeedsByBlog: (blog, limit = 20, startAuthor = null, startPermlink = null) =>
        getPaginatedPromise(`${constants.BACKEND_URL.V2}/feeds/blog/${blog}`, limit, startAuthor, startPermlink),
      getTagFeed: (tag, limit = 20, startAuthor = null, startPermlink = null) =>
        getPaginatedPromise(`${constants.BACKEND_URL.V2}/curation/tag/${tag}`, limit, startAuthor, startPermlink),
      getExploreFeed: (limit = 20, startAuthor = null, startPermlink = null) =>
        getPaginatedPromise(`${constants.BACKEND_URL.V2}/feeds/all`, limit, startAuthor, startPermlink),
    },
    communities: {
      getAllCommunities: () => getPromiseForUrl(`${constants.BACKEND_URL.V2}/communities`),
    },
    users: {
      getUserDetailsByUsername: username => getPromiseForUrl(`${constants.BACKEND_URL.V2}/users/usernames/${username}`),
      getCurrentUserDetails: () => fetch(
        `${constants.BACKEND_URL.V2}/users/user`,
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
        },
      ).then(r => r.json()),
      updateCommunities: communities => fetch(
        `${constants.BACKEND_URL.V2}/users/communities`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
          body: JSON.stringify({ communities }),
        },
      ),
    },
    uploadImage: (image) => {
      const formData = new FormData();
      formData.append('upload', image);
      return fetch(`${constants.BACKEND_URL.V2}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${Cookie.get('1ramp_token')}`,
        },
      }).then(validateJsonResponse);
    },
    login: (username, accessToken) => fetch(
      `${constants.BACKEND_URL.V2}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          username,
        }),
      },
    ).then(validateJsonResponse),
    competitions: {
      // Endpoints related to fetching contest related data
      getAll: () => fetch(`${constants.BACKEND_URL.V2}/competitions`)
        .then(validateJsonResponse),
      getCompetitions: (limit = 10, startAfterId = null) =>
        fetch(`${constants.BACKEND_URL.V2}/competitions/~list?limit=${limit}${startAfterId ? `&start_after_id=${startAfterId}` : ''}`)
          .then(validateJsonResponse),
      getCompetition: competitionId => fetch(`${constants.BACKEND_URL.V2}/competitions/${competitionId}`)
        .then(validateJsonResponse),
      getCompetitionPosts: competitionId => fetch(`${constants.BACKEND_URL.V2}/competitions/${competitionId}/posts`)
        .then(validateJsonResponse),
      getCompetitionWinners: competitionId => fetch(`${constants.BACKEND_URL.V2}/competitions/${competitionId}/winners`)
        .then(validateJsonResponse),
      getLeaderboard: () => fetch(`${constants.BACKEND_URL.V2}/competitions/leaderboard`)
        .then(validateJsonResponse),

      // Delete and update
      deleteCompetition: competitionId => fetch(
        `${constants.BACKEND_URL.V2}/competitions/${competitionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
        },
      ).then(validateJsonResponse),
      updateCompetition: (competitionId, body) => fetch(
        `${constants.BACKEND_URL.V2}/competitions/${competitionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
          body: JSON.stringify(body),
        },
      ).then(validateJsonResponse),

      // Endpoints related to creating contests
      createCompetition: body => fetch(
        `${constants.BACKEND_URL.V2}/competitions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
          body: JSON.stringify(body),
        },
      ).then(validateJsonResponse),
      getCompetitionPostBody: (competitionId, type) =>
        /**
         * Used to get body for Steem posts which are suitable for contest
         * specefic actions
         *
         * 'type' can be
         *  - announce: gets body for the post used to announce cretion of a new contest
         *  - winners: gets a body which is suitable for declaring results for a contest
         */
        fetch(`${constants.BACKEND_URL.V2}/competitions/${competitionId}/body/${type}`)
          .then(validateJsonResponse),
      registerAnnouncementPermlink: (competitionId, blogType, author, permlink) => fetch(
        /**
         * Used to notify the backend about mapping for steem posts to competitions for
         * different events: competition announcement and winner declaration.
         *
         * 'blogType' can be
         *  - announce: For competition announcement blog
         *  - declare_winners: For winner declaration blog
         */
        `${constants.BACKEND_URL.V2}/competitions/${competitionId}/register-permlink/${blogType}?permlink=${author}/${permlink}`,
        {
          headers: {
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
        },
      ).then(validateJsonResponse),
      setWinners: (competitionId, ranks) => fetch(
        /**
         * Updates rankings for a competition before announcing the results.
         * The rankings are not made public until the results are declared.
         */
        `${constants.BACKEND_URL.V2}/competitions/${competitionId}/winners`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
          body: JSON.stringify({ ranks }),
        },
      ).then(validateJsonResponse),
      announceResults: competitionId => fetch(
        /**
         * Marks competition as "results declared" and the rankings
         * set using 'setWinners` is now public.
         */
        `${constants.BACKEND_URL.V2}/competitions/${competitionId}/winners/announce`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${Cookie.get('1ramp_token')}`,
          },
        },
      ).then(validateJsonResponse),
    },
    microCommunities: {
      getAll: () => fetch(`${constants.BACKEND_URL.V2}/micro-communities`)
        .then(validateJsonResponse),
      getPosts: (tag, sort = 'trending', limit = 10, startAuthor = null, startPermlink = null) => {
        const authorParam = startAuthor ? `&start_author=${startAuthor}` : '';
        const permlinkParam = startAuthor ? `&start_permlink=${startPermlink}` : '';
        return fetch(`${constants.BACKEND_URL.V2}/micro-communities/${tag}/posts/${sort}?limit=${limit}${authorParam}${permlinkParam}`)
          .then(validateJsonResponse);
      },
      join: tag => fetch(`${constants.BACKEND_URL.V2}/micro-communities/${tag}/join`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${Cookie.get('1ramp_token')}`,
        },
      }).then(validateJsonResponse),
      leave: tag => fetch(`${constants.BACKEND_URL.V2}/micro-communities/${tag}/join`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${Cookie.get('1ramp_token')}`,
        },
      }).then(validateJsonResponse),
    },
  },
};
