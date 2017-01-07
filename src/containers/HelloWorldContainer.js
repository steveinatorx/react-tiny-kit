import { connect } from 'react-redux';
import HelloWorldComponent from '../components/HelloWorldComponent';
import { 
  getUUID
  } from '../actions/HelloWorldActions';

export const HelloWorldContainer = connect(
  function mapStateToProps (state) {
  return {
    state: state
    };
  },

  function mapDispatchToProps (dispatch) {
    return {
      getUUID: () => dispatch(getUUID)
    };
  }
)(HelloWorldComponent);