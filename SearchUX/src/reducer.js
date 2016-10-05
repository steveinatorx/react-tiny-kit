import { List, Map } from 'immutable';

const init = List([
  Map({ id: 'Model', isActive: true }),
  Map({ id: 'Body', isActive: true }),
  Map({ id: 'Year', isActive: true }),
]);

export default function reducer (activeFields = init, action) {
  switch (action.type) {
    case 'SET_ACTIVE_FIELD':
      return activeFields.map(f => {
        if(f.get('id') === action.payload) {
          return f.update('isActive', true);
        } else {
          return f;
        }
      });
    default:
      return activeFields;
  }
}
