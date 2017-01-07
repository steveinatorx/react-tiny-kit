const uuid = () => Math.random().toString(34).slice(2);

// import axios from 'axios';
// import { EventTypes } from 'redux-segment';
import cookie from 'react-cookie';

// var __CONFIG__ = require('__CONFIG__');

export const SET_UUID = 'SET_UUID';
export function setUUID(theUuid) {
  console.log('in setUUID');
  return {
    type: SET_UUID,
    payload: {
      uuid: theUuid
    },
    // segment metadata int
    meta: {
      analytics: EventTypes.track
    }
  };
}

// thunk
export function getUUID() {
  if (!cookie.load('helloWorld')) {
    console.log('no cookie found - get uuid and set cookie and state uuid');
      /* return dispatch =>
        axios.get( __CONFIG__.apiHost + '/api/uuid').then(res => {
            dispatch(receiveUUID(res.data));
          }).catch(err => {
            dispatch(apiError(err));
          });
    } else {
       return dispatch => (setUUID(cookie.load('helloWorld', { path: '/' })));
    }*/
    cookie.save('helloWorld', uuid, { path: '/' });
  }
  return dispatch(setUUID(uuid));
}
