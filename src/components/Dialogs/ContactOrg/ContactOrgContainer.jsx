import { connect } from 'react-redux';
import ContactOrg from './ContactOrg';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        data: state.dialog.contactData.org,
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(ContactOrg);