import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_ACTIVE_FIELD } from '../actions';
// This initial state is *copied* from react-router-redux's
// routerReducer (the property name 'locationBeforeTransitions' is
// because this is designed for use with react-router)
const initialState = { locationBeforeTransitions: null };

export default function routerReducer(state = initialState, action) {
  console.log('in router reducer', action);
  console.log('in router reducer state=', state);
  // This LOCATION_CHANGE case is copied from react-router-redux's routerReducer
  if (action.type === LOCATION_CHANGE) {
    return { ...state, locationBeforeTransitions: action.payload }
  } else {
    return state;
  }

  // Here is our code to set the location state when the user chooses
  // a different option in the menu
  /*if (action.type === SET_ACTIVE_FIELD) {
      

    const { name } = action.type;
    console.log('1', action.type);
    let location = state.locationBeforeTransitions;
    console.log('2');
    const pathname = '/?a=' +action.type;
    console.log('3', pathname);
    location = { ...location, pathname, action: 'PUSH' };
    console.log('4');
    return { ...state, locationBeforeTransitions: location };
  }*/
  
}
