import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import UIKit from 'uikit';
import * as firebase from 'firebase';
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
import showdown from 'showdown';
import Cookie from 'js-cookie';

// import registerServiceWorker from './registerServiceWorker';
import Root from './components/root';
import getStore from './utils/storeUtils';
import {fakeLogin} from './actions/loginActions';
import steemAPI from './utils/steem';

// Markdown to HTML
window.markdownToHtmlConverter = new showdown.Converter();

// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)

UIKit.use(Icons);

const store = getStore();

// Initialize firebase
let config = {
	apiKey: "AIzaSyBVUoUB41eL2GS_ERrG5bAfrjr1bukCu2g",
	authDomain: "hapramp-625c8.firebaseapp.com",
	databaseURL: "https://hapramp-625c8.firebaseio.com",
	projectId: "hapramp-625c8",
	storageBucket: "hapramp-625c8.appspot.com",
	messagingSenderId: "574002232827"
};
firebase.initializeApp(config);
window.firebaseStorage = firebase.storage();

// Login user
const accessToken = Cookie.get('access_token');
if (accessToken) {
	getStore().dispatch(fakeLogin());
	steemAPI.sc2Api.setAccessToken(accessToken);
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Root/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
// registerServiceWorker();
