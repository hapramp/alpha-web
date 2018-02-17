import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import Icons from 'uikit/dist/js/uikit-icons';
import UIKit from 'uikit';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/root';

UIKit.use(Icons);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
