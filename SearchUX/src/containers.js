import React from 'react';
import { connect } from 'react-redux';
// import { searchFieldNav } from './components';
import { setActiveField } from './actions';

const SearchUXContainer = React.createClass({
  /*componentDidMount: function() {
    axios.get('/path/to/user-api').then(response => {
      store.dispatch({
        type: 'USER_LIST_SUCCESS',
        users: response.data
      });
    });
  },*/

    // return <SearchFieldNav searchFields={this.props.searchFields} />;
  render: function() {
    return(
      <span> ii sxz</span>
    );
  }
});

const mapStateToProps = function(store) {
  return {
    searchFields: store.searchFields
  };
};

const mapDispatchToProps = function(dispatch) {
    return {
      setActiveField: id => dispatch(setActiveField(id)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(SearchUXContainer);