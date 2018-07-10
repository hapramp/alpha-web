/*
* Major part is was taken from https://github.com/Chainers/steepshot-web/blob/develop/src/libs/steem.js
* */

import steem from 'steem';
import Promise from 'bluebird';
import _ from 'lodash';

import sc2 from '../lib/sc2';
import constants from './constants';

const getSteemResolver = (resolve, reject) =>
  (error, result) => (error ? reject(error) : resolve(result));

const getCommentPermlink = (parentAuthor, parentPermlink) =>
  steem.formatter.commentPermlink(parentAuthor, parentPermlink);

const getFollowJsonData = (userToFollow, follow) => JSON.stringify([
  'follow', {
    follower: localStorage.getItem('username'),
    following: userToFollow,
    what: follow ? ['blog'] : [],
  },
]);

const getCommentBeneficiaries = (permlink, username) => {
  const beneficiariesObject = _.extend({}, {
    author: username,
    permlink,
    max_accepted_payout: '1000000.000 SBD',
    percent_steem_dollars: 10000,
    allow_votes: true,
    allow_curation_rewards: true,
    extensions: [
      [0, {
        beneficiaries: [
          {
            account: 'hapramp',
            weight: 1000,
          },
        ],
      }],
    ],
  });
  return ['comment_options', beneficiariesObject];
};

const createJsonMetadataFromTags = (tags) => {
  if (tags.length === 0) {
    tags.push('hapramp');
  }
  return {
    tags,
    app: constants.VERSION.APP_NAME,
  };
};

steem.api.setOptions({ url: 'https://api.steemit.com' });

class SteemAPI {
  static comment(wif, parentAuthor, parentPermlink, author, body, tags) {
    return new Promise((resolve, reject) => {
      const commentPermlink = getCommentPermlink(parentAuthor, parentPermlink);

      const commentObject = {
        parent_author: parentAuthor,
        parent_permlink: parentPermlink,
        author,
        permlink: commentPermlink,
        title: '',
        body,
        json_metadata: JSON.stringify(createJsonMetadataFromTags(tags)),
      };

      // Internal callback
      const callback = (err, success) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...success, comment: commentObject });
        }
      };

      const commentOperation = ['comment', commentObject];

      SteemAPI.handleBroadcastMessagesComment(commentOperation, [], wif, author, callback);
    });
  }

  static deleteComment(wif, author, permlink) {
    return new Promise((resolve, reject) => {
      const callbackBc = (err, success) => {
        if (err) {
          reject(err);
        } else if (success) {
          resolve(success);
        }
      };
      steem.broadcast.deleteComment(wif, author, permlink, callbackBc);
    });
  }

  static handleBroadcastMessagesComment(message, extetion, postingKey, username, callback) {
    SteemAPI.preCompileTransactionComment(message, postingKey)
      .then((response) => {
        if (response.ok) {
          const beneficiaries = getCommentBeneficiaries(message[1].permlink, username);
          const operations = [message, beneficiaries];
          steem.broadcast.sendAsync(
            { operations, extensions: [] },
            { posting: postingKey }, callback,
          );
        } else {
          response.json().then((result) => {
            callback(result.username[0]);
          });
        }
      });
  }

  static preCompileTransactionComment(message, postingKey) {
    /* eslint-disable no-underscore-dangle */
    return steem.broadcast._prepareTransaction({
      extensions: [],
      operations: [message],
    }).then(transaction => Promise.join(
      transaction,
      steem.auth.signTransaction(transaction, [postingKey]),
    ));
  }

  static getUserAccount(username) {
    return new Promise((resolve, reject) => {
      steem.api.getAccounts([username], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static getUserAccounts(usernames) {
    return new Promise((resolve, reject) => {
      steem.api.getAccounts(usernames, (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          reject();
        } else {
          resolve(result);
        }
      });
    });
  }

  static createPost(wif, author, body, tags, content, permlink, community) {
    return new Promise((resolve, reject) => {
      tags.push(...community.map(i => i.toLowerCase()));
      const commentObj = {
        parent_author: '',
        parent_permlink: 'hapramp',
        author,
        permlink,
        title: '',
        body,
        json_metadata: JSON.stringify({
          tags,
          app: 'hapramp/0.0.1',
          content,
        }),
      };
      const benef = getCommentBeneficiaries(permlink, author);
      const operations = [
        ['comment', commentObj],
        benef,
      ];
      const callback = (error, success) => {
        if (success) {
          resolve(success);
        } else {
          reject(error);
        }
      };
      steem.broadcast.sendAsync(
        { operations, extensions: [] },
        { posting: wif }, callback,
      );
    });
  }

  static getFollowCount(username) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };
      steem.api.getFollowCount(username, callback);
    });
  }

  static vote(username, author, permlink, power) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ? reject(err) : resolve(result));
      steem.broadcast.vote(localStorage.getItem('posting_key'), username, author, permlink, power * 100, callback);
    });
  }

  static loadPost(parentPermlink, author, permlink) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ?
        reject(err) :
        resolve({ users: Object.values(result.accounts), posts: Object.values(result.content) }));
      steem.api.getState(`/${parentPermlink}/@${author}/${permlink}`, callback);
    });
  }

  static getReplies(parentAuthor, parentPermlink) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ? reject(err) : resolve(result));
      steem.api.getContentReplies(parentAuthor, parentPermlink, callback);
    });
  }

  static createReply(parentAuthor, parentPermlink, body) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ? reject(err) : resolve(result));
      const jsonMetadata = { app: constants.VERSION.APP_NAME };
      const permlink = getCommentPermlink(parentAuthor, parentAuthor);
      steem.broadcast.comment(
        localStorage.getItem('posting_key'), parentAuthor,
        parentPermlink, localStorage.getItem('username'), permlink, '', body, jsonMetadata, callback,
      );
    });
  }

  static follow(user, unfollow = false) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ? reject(err) : resolve(result));
      const jsonData = getFollowJsonData(user, !unfollow);
      steem.broadcast.customJson(
        localStorage.getItem('posting_key'),
        [], // Required auths
        [localStorage.getItem('username')],
        'follow',
        jsonData,
        callback,
      );
    });
  }

  static getFollowers(username, count) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ? reject(err) : resolve(result));
      steem.api.getFollowers(username, 0, 'blog', count, callback);
    });
  }

  static getFollowing(username, count) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ? reject(err) : resolve(result));
      steem.api.getFollowing(username, 0, 'blog', count, callback);
    });
  }
}

SteemAPI.sc2Api = sc2.Initialize(constants.SC2.CONFIG);
SteemAPI.sc2Operations = {
  // Getting URL for logging in to the app. Opens SteemConnect OAuth page
  getLoginURL: state => SteemAPI.sc2Api.getLoginURL(state || {}),
  // Create a post given the parameters
  createPost: (author, body, tags, content, permlink, community) =>
    new Promise((resolve, reject) => {
      // TODO: Add beneficiaries
      tags.push(...community.map(i => i.toLowerCase()));
      const commentObj = {
        parentAuthor: '',
        parentPermlink: 'hapramp',
        author,
        permlink,
        title: '',
        body,
        jsonMetadata: {
          tags,
          app: 'hapramp/0.0.1',
          content,
        },
      };
      SteemAPI.sc2Api.comment(
        commentObj.parentAuthor, commentObj.parentPermlink, commentObj.author,
        commentObj.permlink, commentObj.title, commentObj.body, commentObj.jsonMetadata,
        getSteemResolver(resolve, reject),
      );
    }),
  // Vote on a comment/post
  vote: (username, author, permlink, power) => new Promise((resolve, reject) => {
    console.log('voting bitch!!', username, author, permlink, power);
    console.log(SteemAPI.sc2Api);
    return SteemAPI.sc2Api.vote(
      username, author, permlink,
      power * 100, getSteemResolver(resolve, reject),
    );
  }),
  // Create a reply to a post
  createReply: (parentAuthor, parentPermlink, body) => new Promise((resolve, reject) => {
    const jsonMetadata = { app: constants.VERSION.APP_NAME };
    const permlink = getCommentPermlink(parentAuthor, parentAuthor);
    SteemAPI.sc2Api.comment(
      parentAuthor, parentPermlink, localStorage.getItem('username'),
      permlink, '', body, jsonMetadata, getSteemResolver(resolve, reject),
    );
  }),
  // (Un)Follow a user
  follow: (follower, following, unfollow = false) => new Promise((resolve, reject) => (
    unfollow ? SteemAPI.sc2Api.unfollow(follower, following, getSteemResolver(resolve, reject))
      : SteemAPI.sc2Api.follow(follower, following, getSteemResolver(resolve, reject))
  )),
};

SteemAPI.steem = steem;

export default SteemAPI;
