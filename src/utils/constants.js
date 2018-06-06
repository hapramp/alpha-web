export default {
	BACKEND_URL: {
		V2: 'https://testapi.hapramp.com/api/v2'
	},
	MESSAGES: {
		AUTH: {
			NO_SUCH_USER: 'No such user found',
			INVALID_CREDENTIALS: 'Invalid login credentials',
			UNKNOWN: 'Unknown error while logging in',
			HASHING_POSTING_KEY: 'Hashing posting key...',
			USER_CHECK: 'Checking if the user already exists...',
			FAILED_SIGNUP: 'Error signing up.',
			SIGNUP_INIT: 'Creating a new account for you...',
			SIGNUP_COMMENT_INIT: 'Commenting the special token to the special post...',
			SIGNUP_COMMENT_DONE: 'Posted comment, notifying backend...',
			SIGNUP_COMMENT_ERROR: 'Failed to create comment, please try again later...'
		},
		POST: {
			CREATE: {
				FAILED_BODY: 'Failed to get body from backend'
			}
		}
	},
	VERSION: {
		APP_NAME: 'hapramp/0.0.1',
	},
}
