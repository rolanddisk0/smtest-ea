import { alertExpandedChange, deleteAlert, alertRead } from 'redux/headerReducer';
import { getContent } from 'redux/mainPageContentReducer';
import AlertDialog from './AlertDialog';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';

let mapStateToProps = (state) => {
    return {
        alerts: state.header.alerts,
    }
}

export default compose(
    connect(mapStateToProps, { alertExpandedChange, deleteAlert, alertRead, getContent }),
    withAlert,
    withDialogWrapper,
)(AlertDialog);