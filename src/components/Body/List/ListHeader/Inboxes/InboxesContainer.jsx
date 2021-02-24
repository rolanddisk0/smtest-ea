import Inboxes from './Inboxes';
import { connect } from 'react-redux';
import { updateShowInboxesDialog, updateInboxLists, updateInboxListsIsLoading, getInboxList } from 'redux/listReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        user: state.root.user,
        selectedTodo: state.list.selectedTodo,
        inboxLists: state.list.inboxLists,
        selectedInbox: state.list.selectedInbox,
        showInboxesDialog: state.list.showInboxesDialog,
        inboxListsIsLoading: state.list.inboxListsIsLoading
    }
}

export default compose(
    connect(mapStateToProps, { updateInboxListsIsLoading, updateInboxLists, updateShowInboxesDialog, getInboxList }),
    withAlert
)(Inboxes);


