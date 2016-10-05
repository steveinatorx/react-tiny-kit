import { List, Map } from 'immutable';

const init = List([
  Map({ id: 'Model', isActive: false, filteredOptions: [] }),
  Map({ id: 'Body', isActive: false, filteredOptions: [] }),
  Map({ id: 'Year', isActive: false, filteredOptions: [] }),
]);

export default function reducer (activeFields = init, action) {
  console.log('in reducer', action.payload);
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
    default:
      return activeFields;
  }
};