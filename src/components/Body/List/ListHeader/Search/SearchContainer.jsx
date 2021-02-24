import Search from './Search';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { updateSelectedInbox } from 'redux/listReducer';

let mapStateToProps = (state) => {
  return {
    selectedInbox: state.list.selectedInbox,
    fields: state.list.fields,
    fieldsIsLoading: state.list.fieldsIsLoading
  }
}

export default compose(
  connect(mapStateToProps, { updateSelectedInbox }),
  withDialogWrapper
)(Search);