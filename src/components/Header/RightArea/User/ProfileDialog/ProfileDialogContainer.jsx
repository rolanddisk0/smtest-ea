import ProfileDialog from './ProfileDialog';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        user: state.root.user
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(ProfileDialog);