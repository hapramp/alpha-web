import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import UIKit from 'uikit';

import registerServiceWorker from './registerServiceWorker';
import Root from './components/root';
import getStore from './utils/storeUtils';

UIKit.use(Icons);

const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
