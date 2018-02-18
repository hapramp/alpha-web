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
				console.log(response);
				if(response.ok) {
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
		})
			.spread((transaction, signedTransaction) => {
				return fetch('http://api.github.com');  // TODO: Send the post to backend
			});
	}
}

export default new SteemAPI();
