import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import UIKit from 'uikit';
import * as firebase from 'firebase';

import registerServiceWorker from './registerServiceWorker';
import Root from './components/root';
import getStore from './utils/storeUtils';

import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

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

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Root/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
