import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_ACTIVE_FIELD } from '../actions';
// This initial state is *copied* from react-router-redux's
// routerReducer (the property name 'locationBeforeTransitions' is
// because this is designed for use with react-router)
const initialState = { locationBeforeTransitions: null };

export default function routerReducer(state = initialState, action) {
  // This LOCATION_CHANGE case is copied from react-router-redux's routerReducer
  if (action.type === LOCATION_CHANGE) {
    return { ...state, locationBeforeTransitions: action.payload }
  }

  // Here is our code to set the location state when the user chooses
  // a different option in the menu
  if (action.type === SET_ACTIVE_FIELD) {
    const { name } = action;
    let location = state.locationBeforeTransitions;
    const pathname = `/${name}`;
    location = { ...location, pathname, action: 'PUSH' };
    return { ...state, locationBeforeTransitions: location };
  }

  return state;
}