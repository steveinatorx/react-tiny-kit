import { List, Map } from 'immutable';

const init = List([
  Map({ id: 'Model', idx: 0, isActive: false, filteredOptions: [] }),
  Map({ id: 'Body', idx: 1, isActive: false, filteredOptions: [] }),
  Map({ id: 'Year', idx: 2, isActive: false, filteredOptions: [] }),
]);

export default function reducer (activeFields = init, action) {
  console.log('in reducer', action);
  switch (action.type) {
    case 'SET_ACTIVE_FIELD':
      return activeFields.map(f => {
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
      return activeFields;
  }
};