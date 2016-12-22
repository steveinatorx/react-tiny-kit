import { connect } from 'react-redux';
import SearchListNav from '../components/SearchListNav';
import { 
  setActiveField,
  openSearchForm,
  submitSearchForm,
  getUUID,
  setFieldSelection,
  clearAll,
  setFieldSelectionAndFetchData,
  fetchFields,
  fetchCount } from '../actions/SearchListNavActions';


export const SearchUXContainer = connect(
  /*componentDidMount: function() {
    axios.get('/path/to/user-api').then(response => {
      store.dispatch({
        type: 'USER_LIST_SUCCESS',
        users: response.data
      });
    });
  },*/

function mapStateToProps (state) {
  return {
    state: state
    };
  },

  function mapDispatchToProps (dispatch) {
    return {
      setActiveField: idx => dispatch(setActiveField(idx)),
      setFieldSelection: (idx, selection) => dispatch(setFieldSelection(idx,selection)),
      setFieldSelectionAndFetchData: (idx, selection) => dispatch(setFieldSelectionAndFetchData(idx,selection)),
      fetchFields: (idx, queryObj) => dispatch(fetchFields(idx, queryObj)),
      fetchCount: (queryObj) => dispatch(fetchCount(queryObj)),
      clearAll: () => dispatch(clearAll()),
      getUUID: () => dispatch(getUUID()),
      openSearchForm: () => dispatch(openSearchForm()),
      submitSearchForm: (data) => dispatch(submitSearchForm(data))
    };
  }
)(SearchListNav);
