import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

export default () => {
  if (!store) {
    store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  }
  return store;
};
