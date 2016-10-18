import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import  routerReducer  from './reducers/routing';
import { SearchUXContainer } from './containers';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';

//import routing from 'reducers/routing';

const rootReducer = combineReducers( { reducer, routing: routerReducer} );  

const middleware = applyMiddleware(
  routerMiddleware(browserHistory),
  thunk
);

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
