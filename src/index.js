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

UIKit.use(Icons);

const store = getStore();

let config = {
	apiKey: "AIzaSyBVUoUB41eL2GS_ERrG5bAfrjr1bukCu2g",
	authDomain: "hapramp-625c8.firebaseapp.com",
	databaseURL: "https://hapramp-625c8.firebaseio.com",
	projectId: "hapramp-625c8",
	storageBucket: "hapramp-625c8.appspot.com",
	messagingSenderId: "574002232827"
};
firebase.initializeApp(config);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Root/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
