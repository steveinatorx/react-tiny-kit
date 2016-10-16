import { List, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

//can i just render the same component with different opts fed by this Map?
const init = List([
  Map({ id: 'Model', idx: 0, isActive: true, opts: [], multi: false }),
  Map({ id: 'Body', idx: 1, isActive: false, opts: [], multi: true }),
  Map({ id: 'Year', idx: 2, isActive: false, Opts: [], multi: true }),
]);

export default function reducer (state = init, action) {
  console.log('in reducer', action);
  switch (action.type) {
    case 'SET_ACTIVE_FIELD':
      return state.map(f => {
        // console.log('mapiing reducer->', f.get('id'));
        if(f.get('id') === action.payload) {
          return f.update('isActive', isActive => true);
        } else {
          return f.update('isActive', isActive => false);
        }
      });
    case 'LOCATION_CHANGE':
     const pathname = action.payload.pathname;
     // /redux-history-demo/:operation
     const [_, operation = ""] = pathname.split('/');
     return operation;
    default:
      return state;
  }
};