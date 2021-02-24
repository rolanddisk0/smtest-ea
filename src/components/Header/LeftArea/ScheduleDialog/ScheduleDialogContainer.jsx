import { connect } from 'react-redux';
import ScheduleDialog from './ScheduleDialog';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(ScheduleDialog);