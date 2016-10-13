import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import routing from './reducers/routing';
import { SearchUXContainer } from './containers';

import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';
//import routing from 'reducers/routing';

 const store = createStore(reducer);
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


