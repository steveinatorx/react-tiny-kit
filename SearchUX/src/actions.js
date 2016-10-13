// const uid = () => Math.random().toString(34).slice(2);

import fetch from 'isomorphic-fetch'

export function setActiveField(id) {
  return {
    type: 'SET_ACTIVE_FIELD',
    payload: id
  };
}


export const REQUEST_FIELDS = 'REQUEST_FIELDS'
function requestFields(field) {
  return {
    type: REQUEST_FIELDS,
    field
  }
}

export const RECEIVE_FIELDS = 'RECEIVE_FIELDS'
function receiveFields(field, json) {
  return {
    type: RECEIVE_FIELDS,
    field,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchFields(field) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestFields(fields))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://cbappi.com/api/PCNACars/`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveFields(field, json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}