// const uid = () => Math.random().toString(34).slice(2);

import fetch from 'isomorphic-fetch'

export const SET_ACTIVE_FIELD = 'SET_ACTIVE_FIELD';

export function setActiveField(idx) {
  return {
    type: 'SET_ACTIVE_FIELD',
    payload: idx
  };
}

export const SET_FIELD_SELECTION = 'SET_FIELD_SELECTION';

export function setFieldSelection(idx,selection) {
  return {
    type: 'SET_FIELD_SELECTION',
    payload: {
      idx: idx,
      selection: selection
    }
  };
}

export const REQUEST_FIELDS = 'REQUEST_FIELDS'

export function requestFields(field) {
  return {
    type: REQUEST_FIELDS,
    field,
    selectionObj
  }
}

export const RECEIVE_FIELDS = 'RECEIVE_FIELDS'
export function receiveFields(field, json) {
  return {
    type: RECEIVE_FIELDS,
    field,
    values: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const API_ERROR = 'API_ERROR'
export function apiError(error){
 return {error, type: API_ERROR}; 
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchFields(objectFieldIdx,selectedArr) {
  console.log('in fetchFields', objectFieldIdx );
  console.log('in fetchFields', selectedArr );
  
    return dispatch =>
        fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            distinct: objectFieldIdx,
            queryArr: selectedArr,
          }),
        })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            dispatch(receiveFields(response));
          } else {
            const error = new Error(response.statusText);
            error.response = response;
            dispatch(loginError(error));
            throw error;
          }
        })
        .catch(error => { console.log('request failed', error); });
    }
