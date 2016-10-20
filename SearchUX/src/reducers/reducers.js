import { List, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

//can i just render the same component with different opts fed by this Map?
const init = List([
  Map({ id: 'Model', idx: 0, isActive: true, opts: [
	{ label: "980 Carrera GT", value: "980 Carrera GT"},
	{ label: "GT3 3.6", value: "GT3 3.6"},
	{ label: "GT3 RS 3.6", value: "GT3 RS 3.6" },
	{ label: "GT3 3.8", value: "GT3 3.8" },
	{ label: "GT3 RS 3.8", value: "GT3 RS 3.8" },
	{ label: "Turbo 3.6", value: "Turbo 3.6" },
	{ label: "Turbo 3.8", value: "Turbo 3.8" },
	{ label: "Turbo S 3.8", value: "Turbo S 3.8" },
	{ label: "997 Speedster", value: "997 Sppedster" },
	{ label: "GT2", value: "GT2" },
	{ label: "918 Spyder", value: "918 Spyder" },
 	{ label: "GT2", value: "GT2"}, 
 	{ label: "GT2 RS", value: "GT2 RS"}, 
	{ label: "GT3 RS 4.0", value: "GT3 RS 4.0" },
], multi: false,
selected: [] }),
  Map({ id: 'Body', idx: 1, isActive: false, opts: [], multi: true, selected: [] }),
  Map({ id: 'Year', idx: 2, isActive: false, Opts: [], multi: true, selected: [] }),
]);

export default function reducer (state = init, action) {
  console.log('in reducer', action);
  switch (action.type) {
    case 'SET_ACTIVE_FIELD':
      return state.map(f => {
        console.log('mapiing reducer->', f.get('idx'));
        if(f.get('idx') === action.payload) {
          console.log('payload match idx?', f.get('idx'));
          return f.update('isActive', isActive => true);
        } else {
          return f.update('isActive', isActive => false);
        }
      });
    case 'SET_FIELD_SELECTION':
      const selection=action.payload.selection;
      const idx = action.payload.idx;
      var selected = [];
      //gather all existing selections, get idx +1 id for distinct
      state.map( f => {
        if (f.get('idx') < (idx) ){
            console.log('adding to selected' , f.get('selected'));
            selected.push(...f.get('selected'));
            
        }         
        
      });
      return selected;
    case 'LOCATION_CHANGE':
     const pathname = action.payload.pathname;
     // /redux-history-demo/:operation
     const [_, operation = ""] = pathname.split('/');
     return operation;
    default:
      return state;
  }
};