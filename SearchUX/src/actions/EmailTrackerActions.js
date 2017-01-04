// const uid = () => Math.random().toString(34).slice(2);

// import axios from 'axios';
import { EventTypes } from 'redux-segment';

// var __CONFIG__ = require('__CONFIG__');

export const API_ERROR = 'API_ERROR'
//todo: alert
export function apiError(error){
 return {error, type: API_ERROR}; 
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export const SEARCH_EMAIL_VIEW = 'SEARCH_EMAIL_VIEW';
export function searchEmailView(data) {
  console.log('in search email viewm');
  return {
      type: SEARCH_EMAIL_VIEW,
      meta: {
        analytics: EventTypes.track
      }
  }
}
