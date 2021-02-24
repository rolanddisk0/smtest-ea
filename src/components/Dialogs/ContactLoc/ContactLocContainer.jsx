import { connect } from 'react-redux';
import ContactLoc from './ContactLoc';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        data: state.dialog.contactData.location,
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(ContactLoc);