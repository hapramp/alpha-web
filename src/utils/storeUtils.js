import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import steemAPI from './steem';
import haprampAPI from './haprampAPI';
import notify from './notification';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

export default () => {
  if (!store) {
    store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument({
        steemAPI,
        haprampAPI,
        notify,
      }))),
    );
  }
  return store;
};
