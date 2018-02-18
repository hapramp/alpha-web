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
		}
	}
};
