import { List, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const init = new Map({
  email: null,
  searchCode: null,
  searchFields: new List([
    Map({ id: 'Model', label: 'Model', idx: 0, isActive: true, opts: [
    { label: "980 Carrera GT", value: "980 Carrera GT"},
    { label: "GT3 3.6", value: "GT3 3.6"},
    { label: "GT3 RS 3.6", value: "GT3 RS 3.6" },
    { label: "GT3 3.8", value: "GT3 3.8" },
    { label: "GT3 RS 3.8", value: "GT3 RS 3.8" },
    { label: "Turbo 3.6", value: "Turbo 3.6" },
    { label: "Turbo 3.8", value: "Turbo 3.8" },
    { label: "Turbo S 3.8", value: "Turbo S 3.8" },
    { label: "997 Speedster", value: "997 Speedster" },
    { label: "GT2", value: "GT2" },
    { label: "918 Spyder", value: "918 Spyder" },
    { label: "GT2", value: "GT2"}, 
    { label: "GT2 RS", value: "GT2 RS"}, 
    { label: "GT3 RS 4.0", value: "GT3 RS 4.0" },
  ], multi: false,
  selected: [] }),
    Map({ id: 'Body', label: 'Body', idx: 1, isActive: false, opts: [], multi: true, selected: [] }),
    Map({ id: 'Year', label: 'Year', idx: 2, isActive: false, opts: [], multi: true, selected: [] }),
    Map({ id: 'Country', label: 'Country', idx: 3, isActive: false, opts: [], multi: true, selected: [] }),
    Map({ id: 'Transmission', label: 'Transmission', idx: 4, isActive: false, opts: [], multi: true, selected: [] }),
    Map({ id: 'Ext1', label: 'Ext1', idx: 5, isActive: false, opts: [], multi: true, selected: [] }),
    Map({ id: 'Int1', label: 'Int1', idx: 6, isActive: false, opts: [], multi: true, selected: [] }),
    Map({ id: 'Opts', label: 'Options', idx: 7, isActive: false, opts: [], multi: true, selected: [] }),
  ])
});

export default function reducer (state = init, action) {
  console.log('in reducer', action);
  switch (action.type) {
    case 'SET_ACTIVE_FIELD':
      var newSearchFields = state.getIn(['searchFields']).map(f => {
         // console.log('mapiing reducer->', f.get('idx'));
        if(f.get('idx') === action.payload) {
           // console.log('GOOD payload match idx?', f.get('idx'));
          return f.update('isActive', isActive => true);
        } else {
          return f.update('isActive', isActive => false);
        }
      });
      //return state.setIn(['searchFields', action.payload, 'isActive'], true); 
      return state.setIn(['searchFields'], newSearchFields); 
    case 'RECEIVE_FIELDS':
    
      var objId = state.getIn(['searchFields']).filter( f=>{
        if (f.get('id') === action.payload.field){
          return true;
        } else { 
          return false;
        }
      });
      
      //convert to multiselect object and strings?
      var optObjs = action.payload.values.map( o => {
            return { label: o.toString(), value: o.toString()} 
      });
      
      console.log('RECEIVEFIELDS this is multi? ', objId.toJS()[0].multi);
      if ((objId.toJS()[0].multi === true) && ( action.payload.values.length > 1 )) {
        console.log('detected MULTI so add "all" to selections');
        optObjs.push({ label: 'all', value: 'all'});
      }
       
      console.log('receive fields idx', objId.toJS()[0].idx);
      return state.setIn(['searchFields',objId.toJS()[0].idx,'opts'],optObjs);
      
    case 'SET_FIELD_SELECTION':
      const selection=action.payload.selection;
      const idx = action.payload.idx;
      // console.log('in set_field_selection', state);

      // console.log('in SFS idx', idx); 
      // console.log('in SFS selection', selection); 
      
      //  console.log('get selected?:', state.getIn(['searchFields', idx, 'selected']));
      var previous = state.getIn(['searchFields', idx, 'selected']);
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGreducer previous? ', previous);
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGreducer selection? ', action.payload.selection);

      if (previous.length>0) {
        var previousArr = previous[0].split(',');
        console.log('GGGGGGGGGreducerArr previous? ', previousArr);
      }
           
      //gather all existing selections, get idx +1 id for distinct
      return state.setIn(['searchFields', idx, 'selected'], action.payload.selection);
      //return state;

    case 'LOCATION_CHANGE':
     const pathname = action.payload.pathname;
     // /redux-history-demo/:operation
     const [_, operation = ""] = pathname.split('/');
     return operation;
    default:
      return state;
  }
};