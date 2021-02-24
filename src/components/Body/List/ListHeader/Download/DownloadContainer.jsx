import Download from './Download';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { getExcel, updateExcelLoading } from 'redux/listReducer';

let mapStateToProps = (state) => {
    return {
      selectedInbox: state.list.selectedInbox,
      excelLoading: state.list.excelLoading,
      user: state.root.user
    }
}

export default compose(
  connect(mapStateToProps, { getExcel, updateExcelLoading }),
  withDialogWrapper
)(Download);