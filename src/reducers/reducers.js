import { Map } from 'immutable';
// import {LOCATION_CHANGE } from 'react-router-redux';

const init = new Map({
  uuid: null
});

export default function reducer(state = init, action) {
  // console.log('in reducer---->', action);
  switch (action.type) {
  case 'SET_UUID':
    return state.set('uuid', action.payload.uuid);
  default:
    return state;
  }
}