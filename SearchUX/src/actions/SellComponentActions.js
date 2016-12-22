// const uid = () => Math.random().toString(34).slice(2);

import axios from 'axios';
import { EventTypes } from 'redux-segment';

var __CONFIG__ = require('__CONFIG__');

export const API_ERROR = 'API_ERROR'
//todo: alert
export function apiError(error){
 return {error, type: API_ERROR}; 
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export const OPEN_SELL_FORM = 'OPEN_SEARCH_FORM';
export function openSellForm(data) {
  console.log('in open sell form');
  return {
      type: OPEN_SELL_FORM,
      meta: {
        analytics: EventTypes.track
      }
  }
}

export const SUBMIT_SELL_FORM = 'SUBMIT_SEARCH_FORM';
export function submitSellForm(data) {
  
  console.log('in submit sell form', data);
  return {
      type: SUBMIT_SELL_FORM,
       payload: {
        data: data
      },
      meta: {
          analytics: [
           {
             eventType: EventTypes.track,
             eventPayload: {
               event: 'SUBMIT_SELL_FORM',
               properties:  {
                data: data
               }
             }
           }
          ]   
      }
  }
}