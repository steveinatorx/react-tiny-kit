import { connect } from 'react-redux';
import { EmailTrackerComponent } from '../components/EmailTrackerComponent';
import { 
  searchEmailView
  } from '../actions/EmailTrackerActions';

export const EmailTrackerContainer = connect(
  function mapStateToProps (state) {
  return {
    state: state
    };
  },

  function mapDispatchToProps (dispatch) {
    return {
      searchEmailView: (data) => dispatch(searchEmailView(data))
    };
  }
)(EmailTrackerComponent);