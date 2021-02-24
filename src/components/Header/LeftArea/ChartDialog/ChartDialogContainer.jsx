import { connect } from 'react-redux';
import ChartDialog from './ChartDialog';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        currentRow: state.list.currentRow
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(ChartDialog);