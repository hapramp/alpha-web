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
      getUserFeed: username => getPromiseForUrl(`${constants.BACKEND_URL.V2}/feeds/user/${username}`),
      getFeedsByCreated: category => getPromiseForUrl(`${constants.BACKEND_URL.V2}/feeds/created/${category}`),
      getFeedsByTrending: category => getPromiseForUrl(`${constants.BACKEND_URL.V2}/feeds/trending/${category}`),
      getFeedsByHot: category => getPromiseForUrl(`${constants.BACKEND_URL.V2}/feeds/hot/${category}`),
      getFeedsByBlog: blog => getPromiseForUrl(`${constants.BACKEND_URL.V2}/feeds/blog/${blog}`),
    },
    communities: {
      getAllCommunities: () => getPromiseForUrl(`${constants.BACKEND_URL.V2}/communities`),
    },
    users: {
      getUserDetailsByUsername: username => getPromiseForUrl(`${constants.BACKEND_URL.V2}/users/usernames/${username}`),
    },
  },
};
