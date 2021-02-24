import InboxDialog from './InboxDialog';
import { connect } from 'react-redux';
import { updateShowInboxDialog, updateSelectedColumns, updateInboxLists, updateInbox,
    updateInboxListsIsLoading, updateShowInboxesDialog, updateSelectedInbox, getInboxData, updateFieldsIsLoading, saveInbox
} from 'redux/listReducer';
import { updateQueryBuilder, updateColoring, setColoring } from 'redux/uiElements'; 
import { getInboxLists } from 'redux/listReducer';
import { getContent } from 'redux/mainPageContentReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        queryBuilder: state.uiElements.queryBuilder,
        coloring: state.uiElements.coloring,
        showInboxDialog: state.list.showInboxDialog,
        selectedTodo: state.list.selectedTodo,
        user: state.root.user,
        inboxLists: state.list.inboxLists,
        inbox: state.list.inbox,
        selectedInbox: state.list.selectedInbox,
        fieldsIsLoading: state.list.fieldsIsLoading,
        fields: state.list.fields
    }
}

export default compose(
    connect(mapStateToProps, {
        updateShowInboxDialog, updateSelectedColumns, updateQueryBuilder, updateInboxLists, updateInbox, updateColoring,
        updateInboxListsIsLoading, getInboxLists, updateShowInboxesDialog, updateSelectedInbox, getInboxData, getContent, setColoring,
        updateFieldsIsLoading, saveInbox
    }),
    withAlert
)(InboxDialog);
