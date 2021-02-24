import Menu from './Menu';
import { connect } from 'react-redux';
import { updateShowInboxDialog, updateShowInboxesDialog, updateInbox, updateInboxLists, updateSelectedInbox, deleteInbox, getInbox } from 'redux/listReducer';
import { updateQueryBuilder, setColoring } from 'redux/uiElements';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        showInboxDialog: state.list.showInboxDialog,
        inbox: state.list.inbox,
        inboxLists: state.list.inboxLists
    }
}

export default compose(
    connect(mapStateToProps, { updateShowInboxDialog, updateShowInboxesDialog, updateInbox, updateInboxLists, 
        updateQueryBuilder, setColoring, updateSelectedInbox, deleteInbox, getInbox
     }),
    withAlert
)(Menu);