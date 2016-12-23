import React from 'react';
import { render } from 'react-dom';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
// import routerReducer  from './reducers/routing';
import { SearchUXContainer } from './containers';
// import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import {browserHistory} from 'react-router';

// import cookie from 'react-cookie';
import { createTracker } from 'redux-segment';

import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
// import filter from 'redux-localstorage-filter';
import { serialize, deserialize } from 'redux-localstorage-immutable';

let __CONFIG__ = require('__CONFIG__');



    !function(){var
  analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){
    return function(){var
  e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return
  analytics}};for(var t=0;t<analytics.methods.length;t++){var
  e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var
  e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var
  n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
    analytics.load(__CONFIG__.segmentWriteKey);
    console.log('loaded sgmnt');
    // Make sure to remove any calls to `analytics.page()`!
    }}();

const tracker = createTracker(); 

const rootReducer = compose(
 // apply deserialize from redux-localstorage-immutable
  mergePersistedState(deserialize)
)(reducer);

const storage = compose(
  // apply serialize from redux-localstorage-immutable
  serialize
  //filter('data')
)(adapter(window.localStorage));

console.log('storage', storage);
/*
const enhancer = compose(
  persistState(storage, 'tableDemo')
);
*/

const middleware = applyMiddleware(
  thunk,
  tracker
);

// const store = createStore(rootReducer, middleware, enhancer);

const enhancer = compose(
  middleware,
  persistState(storage, 'porscheLocator'),
);

const store = createStore(rootReducer, /* initialState */ enhancer);

render(
  <Provider store={store} >
    <div>
    <SearchUXContainer />
    </div>
  </Provider>,
  document.getElementById('app')
);