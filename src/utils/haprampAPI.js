import constants from './constants';

export default {
	v2: {
		login: (username, ppkHash) => {
			return new Promise((resolve, reject) => {
				fetch(constants.BACKEND_URL.V2 + '/login', {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({username, ppk_hash: ppkHash})
				}).then(response => {
					switch (response.status) {
						case 200:
							response.json().then(json => resolve(json));
							break;
						case 401:
							reject({reason: constants.MESSAGES.AUTH.INVALID_CREDENTIALS});
							break;
						case 404:
							reject({reason: constants.MESSAGES.AUTH.NO_SUCH_USER});
							break;
						default:
							reject({reason: constants.MESSAGES.AUTH.UNKNOWN, status: response.status})
					}
				}).catch(reason => reject(reason))
			})
		},
		signup: (username) => {
			return new Promise((resolve, reject) => {
				fetch(constants.BACKEND_URL.V2 + '/signup', {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({username})
				}).then(response => {
					if (response.ok) {
						response.json().then(json => resolve(json.token));
					} else {
						reject({message: constants.MESSAGES.AUTH.FAILED_SIGNUP});
					}
				}).catch(e => reject(e))
			})
		},
		signupDone: (username, ppkHash) => {
			return new Promise((resolve, reject) => {
				fetch(constants.BACKEND_URL.V2 + '/signup/done', {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({username, ppk_hash: ppkHash})
				}).then(response => {
					if (response.ok) {
						response.json().then(json => resolve(json));
					} else {
						reject({message: constants.MESSAGES.AUTH.FAILED_SIGNUP});
					}
				}).catch(e => reject(e))
			})
		},
		post: {
			prepare: (content, full_permlink) => {
				return new Promise((resolve, reject) => {
					fetch(constants.BACKEND_URL.V2 + '/posts', {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({content, full_permlink})
					}).then(response => {
						if (response.ok) {
							response.json().then(json => resolve(json.body))
						} else {
							reject({message: constants.MESSAGES.POST.CREATE.FAILED_BODY});
						}
					}).catch(e => reject(e))
				})
			},
			confirm: permlink => {
				return new Promise((resolve, reject) => {
					fetch(constants.BACKEND_URL.V2 + '/posts/_confirm', {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({full_permlink: permlink})
					}).then(response => {
						if (response.ok) {
							response.json().then(json => resolve(json))
						} else {
							reject();  // TODO: Give some reason
						}
					}).catch(e => reject(e))
				})
			}
		},
		feed: {
			getUserFeed: username => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/user/' + username),
			getFeedsByCreated: category => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/created/' + category),
			getFeedsByTrending: category => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/trending/' + category),
			getFeedsByHot: category => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/hot/' + category),
			getFeedsByBlog: blog => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/blog/' + blog),
		},
		communities: {
			getAllCommunities: () => getPromiseForUrl(constants.BACKEND_URL.V2 + '/communities')
		}
	}
};

const getPromiseForUrl = url => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				if (response.ok) {
					response.json().then(json => resolve(json));
				} else {
					reject();
				}
			})
			.catch(e => reject(e))
	})
};
