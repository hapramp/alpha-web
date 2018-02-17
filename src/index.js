import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

// UIKit Icons
import Icons from 'uikit/dist/js/uikit-icons';
import UIKit from 'uikit';

UIKit.use(Icons);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<div>Hello</div>, document.getElementById('root'));
registerServiceWorker();
