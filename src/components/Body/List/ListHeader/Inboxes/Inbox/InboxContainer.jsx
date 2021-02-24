import Inbox from './Inbox';
import { connect } from 'react-redux';
import { updateShowInboxDialog } from 'redux/listReducer';

let mapStateToProps = (state) => {
    return {
        showInboxDialog: state.list.showInboxDialog
    }
}

export default connect(mapStateToProps, { updateShowInboxDialog })(Inbox);