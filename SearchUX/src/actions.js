// const uid = () => Math.random().toString(34).slice(2);

import axios from 'axios';

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
export function receiveFields(field, valArr, count) {
  return {
    type: RECEIVE_FIELDS,
    payload: {
      field: field,
      values: valArr,
      receivedAt: Date.now()
    }
  }
}

export const RECEIVE_COUNT = 'RECEIVE_COUNT'
export function receiveCount(count) {
  return {
    type: RECEIVE_COUNT,
    payload: {
      count: count,
    }
  }
}


export const API_ERROR = 'API_ERROR'
//todo: alert
export function apiError(error){
 return {error, type: API_ERROR}; 
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchFields(objectFieldId, queryObj) {
  console.log('in fetchFields', objectFieldId );
  console.log('in fetchFields', queryObj );
  
    return dispatch =>
        axios.post('http://localhost:3000/api/pcnacarsmeta', 
          {
            distinct: objectFieldId,
            queryObj: queryObj,
          }).then(res => {
            console.log('RESRESRESRESRESRESRESRES', res);
            dispatch(receiveFields(objectFieldId, res.data.values));
            dispatch(receiveCount(res.data.count));
          }).catch(err => {
            dispatch(apiError(err));
          });
}
