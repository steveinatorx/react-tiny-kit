import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import  routerReducer  from './reducers/routing';
import { SearchUXContainer } from './containers';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux';
//import routing from 'reducers/routing';

const rootReducer = combineReducers( { reducer, routing: routerReducer} );  

const store = createStore(rootReducer);
export const history = createHistory();

syncHistoryWithStore( history, store );

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


