import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import  reducer  from './reducer';
// import   SearchUXContainer  from './containers';
import { SearchUXContainer } from './components';
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={ store }>
    <SearchUXContainer />
  </Provider>,
  document.getElementById('app')
);

