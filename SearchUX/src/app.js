import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import routerReducer  from './reducers/routing';
import { SearchUXContainer } from './containers';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
var __CONFIG__ = require('__CONFIG__');

/*import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)*/


if (__CONFIG__.thisEnv === 'test') {
 var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[]};
 clevertap.account.push({"id": __CONFIG__.clevertap});
 (function () {
		 var wzrk = document.createElement('script');
		 wzrk.type = 'text/javascript';
		 wzrk.async = true;
		 wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/a.js';
		 var s = document.getElementsByTagName('script')[0];
		 s.parentNode.insertBefore(wzrk, s);
  })();
}


const rootReducer = combineReducers( { reducer, routing: routerReducer} );  
const middleware = applyMiddleware(
  routerMiddleware(browserHistory),
  thunk
);

  /*let devTools = []
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ]
  }*/

const store = createStore(rootReducer, middleware);
console.log('alive1');

render(
  <Provider store={store} >
    <SearchUXContainer />
  </Provider>,
  document.getElementById('app')
);

/* render(
  <h1> foo </h1>, 
  document.getElementById('app')
); */
