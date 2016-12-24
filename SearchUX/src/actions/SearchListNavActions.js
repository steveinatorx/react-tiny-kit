// const uid = () => Math.random().toString(34).slice(2);

import axios from 'axios';
export const SET_ACTIVE_FIELD = 'SET_ACTIVE_FIELD';
import { EventTypes } from 'redux-segment';
import cookie from 'react-cookie';

var __CONFIG__ = require('__CONFIG__');

export function setActiveField(idx) {
  return {
    type: 'SET_ACTIVE_FIELD',
    payload: idx,
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export const CLEAR_ALL = 'CLEAR_ALL';
export function clearAll() {
  return {
    type: 'CLEAR_ALL',
    meta: {
      analytics: EventTypes.track,
    },
  };
}

export const SET_FIELD_SELECTION = 'SET_FIELD_SELECTION';
export function setFieldSelection(idx,selection) {
  return dispatch => {
    dispatch({
      type: 'SET_FIELD_SELECTION',
      payload: {
        idx: idx,
        selection: selection
      },
      meta: {
          analytics: [
           {
             eventType: EventTypes.track,
             eventPayload: {
               event: 'SET_FIELD_SELECTION',
               properties:  {
                idx: idx, 
                selection: selection                  
               }
             }
           }   
          ]
      }
    });
  }
}

var buildQueryObj = function buildQueryObj(state){

 var queryRoot = {};
          state.getIn(['reducer','searchFields']).map(f => {
          //console.log('i&&^&^&^&^&^^&^& from selected', f.get('selected'));
          //console.log('ITERATOR Field===', f.get('id'));
          
             let theValue = f.get('selected').toJS(); //this should always be a List 
          //console.log('SELECTED', theValue);
          let theField = f.get('id');
          
          //console.log('bqo', theValue);
          
          if( theField !== 'Opts' && theValue.length > 0) {
             //coding around that fucking react-select API inconsistency.....
             if (theValue[0].match(/,/)){
               theValue = theValue[0].split(',');
               //theValue=theValue.splice(0,theValue.length - 1);
              }

            if( theValue.length > 1) {
               //  console.log('mutli selection');
                var theObj = {};
                theObj.$in=theValue;
                queryRoot[f.get('id')]=theObj;
              }
              else {
                if (f.get('id') === 'Year') {
                  console.log('detected YEAR', theValue);
                  if (theValue[0].match(/,/)) {
                    // console.log('multiple year');
                    var years = theValue[0].split(',');                       
                      year = years.map(function(v){
                        return parseInt(f);
                      });  
                  queryRoot[theField] = years;
                  } else {
                  queryRoot[theField] = parseInt(theValue);
                  }
                  
                } else {
                  queryRoot[theField] = theValue;
                }
              }
      } else if ( theValue.length > 0 && theField ==='Opts'){
            if (theValue[0].match(/,/)){
                //trim damn API inconsistency
               var theObj={};
               var theValueArr = theValue[0].split(',');
               //console.log('theValueArr', theValueArr);
               theObj.$all=theValueArr;
               queryRoot[theField] = theObj;  
            } else
            {
                var theObj = {};
                theObj.$in=theValue;
                queryRoot[theField] = theObj;  
            }   
      } 
      
      }) 

      return queryRoot;
}

export function setFieldSelectionAndFetchData(idx,selection){
  return function (dispatch, getState) {
    console.log('in sFSAFD');
    dispatch(setFieldSelection(idx,selection));
    let state=getState();
    console.log(state);
    
    let qObj = buildQueryObj(state);
    
    console.log('qObj', qObj);
    //only get new count on Opts selection
    let nextFieldMap = state.getIn(['reducer','searchFields',idx+1]);
    if (idx!=7){
      let nextId = nextFieldMap.get('id');
      //console.log('now fetch fields for ->', nextId);
      //console.log('using ->', qObj);
      dispatch(fetchFields(nextId, qObj));
    } else {
      //console.log('using ->', qObj);
      dispatch(fetchCount(qObj))      
    }
  } 
}//endfunc

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
  //console.log('in fetchFields', objectFieldId );
  //console.log('in fetchFields', queryObj );
  //console.log( __CONFIG__ );

    return dispatch =>
        axios.post( __CONFIG__.apiHost + '/api/pcnacarsmeta', 
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

export function fetchCount(queryObj) {
  console.log('in fetchCount', queryObj );
  
    return dispatch =>
        axios.post( __CONFIG__.apiHost + '/api/pcnacarscount', 
          {
            queryObj: queryObj,
          }).then(res => {
            //console.log('RESRESRESRESRESRESRESRES', res);
            dispatch(receiveCount(res.data.count));
          }).catch(err => {
            dispatch(apiError(err));
          });
}

export const SET_UUID = 'SET_UUID';
export function setUUID(uuid) {
  console.log('in setUUID');
  return {
      type: SET_UUID,
      payload: {
        uuid: uuid,
      },
      meta: {
        analytics: EventTypes.track
      },
  }
}

export function receiveUUID(uuid) {    
   console.log('setting cookie', uuid);
   cookie.save('PCNALocator', uuid, { path: '/' });
   return dispatch => dispatch(setUUID(uuid));
}

export const OPEN_SEARCH_FORM = 'OPEN_SEARCH_FORM';
export function openSearchForm(data) {
  console.log('in open search form');
  return {
      type: OPEN_SEARCH_FORM,
      meta: {
        analytics: EventTypes.track
      }
  }
}

export const SUBMIT_SEARCH_FORM = 'SUBMIT_SEARCH_FORM';
export function submitSearchForm(data) {
 return (dispatch, getState) => {

    console.log('in submit search form');
    let state=getState();
    console.log(state);
    let qObj = buildQueryObj(state);  
    console.log('in submit search form', data);
    console.log('in submit search form', qObj);
    
    console.log( __CONFIG__.apiHost + '/api/searchenquiry');

      axios.post( __CONFIG__.apiHost + '/api/searchenquiry', 
      {
        data: data,
        queryObj: qObj,
      }).then(res => {
        console.log('submit form RES::::::', res);
        //dispatch(receiveFields(objectFieldId, res.data.values));
        //dispatch(receiveCount(res.data.count));
      }).catch(err => {

        dispatch(apiError(err));
    })
  }
}

export function getUUID() {
    if (!cookie.load('PCNALocator')){
      return dispatch =>
        axios.get( __CONFIG__.apiHost + '/api/uuid').then(res => {
            dispatch(receiveUUID(res.data));
          }).catch(err => {
            dispatch(apiError(err));
          });
    } else {
        //cookie.save('PCNALocator', cookie.load('PCNALocator', { path: '/' }));
       return dispatch => (setUUID(cookie.load('PCNALocator', { path: '/' })));
    }
}