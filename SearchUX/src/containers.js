import { connect } from 'react-redux';
import { SearchListNav } from './components';
import { setActiveField } from './actions';

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
    searchFields: state
    };
  },

  function mapDispatchToProps (dispatch) {
    return {
      setActiveField: id => dispatch(setActiveField(id)),
    };
  }
)(SearchListNav);
