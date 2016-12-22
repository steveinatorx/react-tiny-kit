import { connect } from 'react-redux';
import { SellComponent } from '../components/SellComponent';
import { 
  openSellForm,
  submitSellForm
  } from '../actions/SellComponentActions';

export const SellUXContainer = connect(
  function mapStateToProps (state) {
  return {
    state: state
    };
  },

  function mapDispatchToProps (dispatch) {
    return {
      openSellForm: () => dispatch(openSellForm()),
      submitSellForm: (data) => dispatch(submitSellForm(data))
    };
  }
)(SellComponent);