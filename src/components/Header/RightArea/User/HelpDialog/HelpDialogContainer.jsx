import HelpDialog from './HelpDialog';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(HelpDialog);