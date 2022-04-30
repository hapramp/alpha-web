/*
* Major part is was taken from https://github.com/Chainers/steepshot-web/blob/develop/src/libs/steem.js
* */

import steem from 'steem';
import Promise from 'bluebird';
import extend from 'lodash/extend';
import getSlug from 'speakingurl';
import { Client } from 'hivesigner';

// import sc2 from '../lib/sc2';
import constants from './constants';

const appVersion = require('../../package.json').version;

const appName = `hapramp/${appVersion}`;

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
  const beneficiariesObject = extend({}, {
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
    app: appName,
  };
};

// https://github.com/busyorg/busy/blob/dfb438859b192677d34192dd4a5c24d42118f4b0/src/client/vendor/steemitHelpers.js
const slug = text => getSlug(text.replace(/[<>]/g, ''), { truncate: 128 });

const checkPermLinkLength = (permlink) => {
  let newPermlink = permlink;
  if (newPermlink.length > 255) {
    // STEEMIT_MAX_PERMLINK_LENGTH
    newPermlink = permlink.substring(permlink.length - 255, permlink.length);
  }
  // only letters numbers and dashes shall survive
  newPermlink = permlink.toLowerCase().replace(/[^a-z0-9-]+/g, '');
  return permlink;
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

  static getContentState(parentPermlink = 'hapramp', author, permlink) {
    return new Promise((resolve, reject) => {
      const cb = (err, success) => {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      };
      steem.api.getState(`${parentPermlink}/@${author}/${permlink}`, cb);
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

  static createPermlink(title, author, parentAuthor, parentPermlink) {
    let permlink;

    const timeStr = new Date().toISOString()
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toLowerCase(); // permlink can't have capital case characters

    if (title && title.trim() !== '') {
      let s = slug(title);
      if (s === '') {
        s = `${timeStr}-post`;
      }

      return this.loadPost(author, s)
        .then((content) => {
          let prefix;
          if (content.posts[0].body !== '') {
            // make sure slug is unique
            prefix = `${timeStr}-`;
          } else {
            prefix = '';
          }
          permlink = prefix + s;
          return checkPermLinkLength(permlink);
        })
        .catch((err) => {
          console.warn('Error while getting content', err);
          return timeStr;
        });
    }
    permlink = `re-${parentAuthor}-${parentPermlink.replace(/(-\d{8}t\d{9}z)/g, '')}-${timeStr}`;
    return Promise.resolve(checkPermLinkLength(permlink));
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
          app: appName,
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

  static loadPost(author, permlink) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => (err ?
        reject(err) :
        resolve({ users: [result.author], posts: [result] }));
      steem.api.getContent(author, permlink, callback);
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
      const jsonMetadata = { app: appName };
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

/**
 * The following section bluntly replaces Steem Connect 2 SDK
 * functionalities with Hivesigner.
 * Not all the functions have been tested entirely, and will
 * have to be checked before finalizing everything.
 */
// SteemAPI.sc2Api = sc2.Initialize(constants.SC2.CONFIG);
SteemAPI.sc2Api = new Client(constants.HIVESIGNER.CONFIG);


SteemAPI.sc2Operations = {
  // Getting URL for logging in to the app. Opens SteemConnect OAuth page
  getLoginURL: state => SteemAPI.sc2Api.getLoginURL(state || {}),
  // Create a post given the parameters
  createPost: (author, body, tags, content, permlink, title = '') =>
    new Promise((resolve, reject) => {
      const commentObj = {
        parentAuthor: '',
        parentPermlink: 'hapramp',
        author,
        permlink,
        title,
        body,
        jsonMetadata: {
          tags,
          app: appName,
          // content,
        },
      };
      SteemAPI.sc2Api.comment(
        commentObj.parentAuthor, commentObj.parentPermlink, commentObj.author,
        commentObj.permlink, commentObj.title, commentObj.body, commentObj.jsonMetadata,
        getSteemResolver(resolve, reject),
      );
    }),
  // Vote on a comment/post
  vote: (username, author, permlink, power) => new Promise((resolve, reject) =>
    SteemAPI.sc2Api.vote(
      username, author, permlink,
      power * 100, getSteemResolver(resolve, reject),
    )),
  // Create a reply to a post
  createReply: (parentAuthor, parentPermlink, author, body) => new Promise((resolve, reject) => {
    const jsonMetadata = { app: appName };
    const permlink = getCommentPermlink(parentAuthor, parentAuthor);
    SteemAPI.sc2Api.comment(
      parentAuthor, parentPermlink, author,
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
