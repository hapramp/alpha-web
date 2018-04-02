/*
* Major part is was taken from https://github.com/Chainers/steepshot-web/blob/develop/src/libs/steem.js
* */

import steem from 'steem';
import Promise from 'bluebird';
import _ from 'lodash';

const getCommentPermlink = (parentAuthor, parentPermlink) => {
	return steem.formatter.commentPermlink(parentAuthor, parentPermlink);
};

const getCommentBeneficiaries = (permlink, username) => {
	let beneficiariesObject = _.extend({}, {
		author: username,
		permlink: permlink,
		max_accepted_payout: '1000000.000 SBD',
		percent_steem_dollars: 10000,
		allow_votes: true,
		allow_curation_rewards: true,
		extensions: [
			[0, {
				beneficiaries: [
					{
						account: 'hapramp',
						weight: 1000
					}
				]
			}]
		]
	});
	return ['comment_options', beneficiariesObject];
};

const createJsonMetadataFromTags = tags => {
	if (tags.length === 0) {
		tags.push('hapramp');
	}
	return {
		tags: tags,
		app: 'hapramp/0.0.1'
	}
};

class SteemAPI {
	constructor() {
		steem.api.setOptions({url: 'https://api.steemit.com'});
	}

	comment(wif, parentAuthor, parentPermlink, author, body, tags) {
		return new Promise((resolve, reject) => {
			const commentPermlink = getCommentPermlink(parentAuthor, parentPermlink);

			const commentObject = {
				parent_author: parentAuthor,
				parent_permlink: parentPermlink,
				author: author,
				permlink: commentPermlink,
				title: "",
				body: body,
				json_metadata: JSON.stringify(createJsonMetadataFromTags(tags))
			};

			// Internal callback
			const callback = (err, success) => {
				if (err) {
					reject(err);
				} else {
					success.comment = commentObject;
					resolve(success);
				}
			};

			const commentOperation = ['comment', commentObject];

			this.handleBroadcastMessagesComment(commentOperation, [], wif, author, callback);
		});
	}

	deleteComment(wif, author, permlink) {
		return new Promise((resolve, reject) => {
			const callbackBc = (err, success) => {
				if (err) {
					reject(err);
				} else if (success) {
					resolve(success);
				}
			};
			steem.broadcast.deleteComment(wif, author, permlink, callbackBc);
		})
	}

	handleBroadcastMessagesComment(message, extetion, postingKey, username, callback) {
		this.preCompileTransactionComment(message, postingKey)
			.then((response) => {
				if (response.ok) {
					let beneficiaries = getCommentBeneficiaries(message[1].permlink, username);
					const operations = [message, beneficiaries];
					steem.broadcast.sendAsync(
						{operations, extensions: []},
						{posting: postingKey}, callback
					);
				} else {
					response.json().then((result) => {
						callback(result.username[0]);
					});
				}
			});
	}

	preCompileTransactionComment(message, postingKey) {
		return steem.broadcast._prepareTransaction({
			extensions: [],
			operations: [message],
		}).then((transaction) => {
			return Promise.join(
				transaction,
				steem.auth.signTransaction(transaction, [postingKey])
			)
		}).spread((transaction, signedTransaction) => {
			return fetch('http://api.github.com');  // TODO: Send the post to backend
		});
	}

	getUserAccount(username) {
		return new Promise((resolve, reject) => {
			steem.api.getAccounts([username], (err, result) => {
				if (err) {
					reject(err);
				} else if (result.length === 0) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			})
		})
	}

	getUserAccounts(usernames) {
		return new Promise((resolve, reject) => {
			steem.api.getAccounts(usernames, (err, result) => {
				if (err) {
					reject(err);
				} else if (result.length === 0) {
					reject();
				} else {
					resolve(result);
				}
			})
		})
	}

	createPost(wif, author, body, tags, content, permlink, community) {
		return new Promise((resolve, reject) => {
			tags.push(...community.map(i => i.toLowerCase()));
			let commentObj = {
				parent_author: '',
				parent_permlink: 'hapramp-test',
				author: author,
				permlink,
				title: '',
				body,
				json_metadata: JSON.stringify({
					tags, app: 'hapramp/0.0.1',
					content
				})
			};
			let benef = getCommentBeneficiaries(permlink, author);
			let operations = [
				['comment', commentObj],
				benef
			];
			const callback = (error, success) => {
				if (success) {
					resolve(success)
				} else {
					reject(error)
				}
			};
			steem.broadcast.sendAsync(
				{operations, extensions: []},
				{posting: wif}, callback
			);
		})
	}

	getFollowCount(username) {
		return new Promise((resolve, reject) => {
			let callback = (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			};
			steem.api.getFollowCount(username, callback);
		})
	}

	vote(username, author, permlink, power, voteStatus) {
		return new Promise((resolve, reject) => {
			let callback = (err, result) => err ? reject(err) : resolve(result);
			steem.api.vote(localStorage.getItem('posting_key'), username, author, permlink, voteStatus ? power * 100 : 0, callback);
		})
	}
}

export default new SteemAPI();
