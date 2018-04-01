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
			},
			rate: (permlink, vote) => {
				let options = {headers: {Authorization: 'Token ' + localStorage.getItem('ppk_hash')},
					method: 'POST', body: JSON.stringify({vote})};
				let url = constants.BACKEND_URL.V2 + '/posts/votes?permlink=' + permlink;
				return getPromiseForUrl(url, options);
			},
		},
		feed: {
			getUserFeed: username => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/user/' + username
				+ (localStorage.getItem('username') ? '?current_user=' + localStorage.getItem('username') : '')),
			getFeedsByCreated: category => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/created/' + category
				+ (localStorage.getItem('username') ? '?current_user=' + localStorage.getItem('username') : '')),
			getFeedsByTrending: category => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/trending/' + category
				+ (localStorage.getItem('username') ? '?current_user=' + localStorage.getItem('username') : '')),
			getFeedsByHot: category => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/hot/' + category
				+ (localStorage.getItem('username') ? '?current_user=' + localStorage.getItem('username') : '')),
			getFeedsByBlog: blog => getPromiseForUrl(constants.BACKEND_URL.V2 + '/feeds/blog/' + blog
				+ (localStorage.getItem('username') ? '?current_user=' + localStorage.getItem('username') : '')),
		},
		communities: {
			getAllCommunities: () => getPromiseForUrl(constants.BACKEND_URL.V2 + '/communities')
		},
		users: {
			getUserDetailsByUsername: username => {
				return getPromiseForUrl(constants.BACKEND_URL.V2 + '/users/usernames/' + username);
			}
		},
	}
};

const getPromiseForUrl = (url, options = {}) => {
	return new Promise((resolve, reject) => {
		fetch(url, ...options)
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
