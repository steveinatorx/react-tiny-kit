import React from 'react';
import { render } from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import routerReducer from './reducers/routing';
import { HelloWorldContainer } from './containers/HelloWorldContainer';
import thunk from 'redux-thunk';

import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import { serialize, deserialize } from 'redux-localstorage-immutable';

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import DevTools from './components/DevTools';

let __CONFIG__ = require('__CONFIG__');

const combinedReducer = combineReducers({
  reducer,
  routing: routerReducer
});

const rootReducer = compose(
  // apply deserialize from redux-localstorage-immutable
   mergePersistedState(deserialize)
)(combinedReducer);
const storage = compose(
   // apply serialize from redux-localstorage-immutable
   serialize
   //filter('data')
 )(adapter(window.localStorage));
console.log('storage', storage);
const middleware = applyMiddleware(
   thunk
 );
const enhancer = compose(
   middleware,
   persistState(storage, 'porscheLocator'),
   DevTools.instrument()
 );
const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;
   return (state) => {
     const routingState = state.get('routing'); // or state.routing 
     if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
       prevRoutingState = routingState;
       prevRoutingStateJS = routingState.toJS();
     }
     return prevRoutingStateJS;
  };
};

const store = createStore(rootReducer, enhancer);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState()
});

render(
  <Provider store={store}>
     <Router history={history}>
        <Route path="/" component={HelloWorldContainer} />
     </Router>
  </Provider>,
  document.getElementById('app')
);