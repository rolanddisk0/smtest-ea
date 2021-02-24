import { connect } from 'react-redux';
import ListBody from './ListBody';
import { compose } from 'redux';
import { updateCurrentRow, updateListAction, getInboxData, updateSelectedInbox } from 'redux/listReducer';
import { withAlert } from 'hoc/withAlert';
import { withRouter } from 'react-router-dom';

let mapStateToProps = (state) => {
    return {
        currentRow: state.list.currentRow,
        listAction: state.list.listAction,
        selectedInbox: state.list.selectedInbox,
        selectedTodo: state.list.selectedTodo,
        user: state.root.user
    }
}

export default compose(
    connect(mapStateToProps, { updateCurrentRow, updateListAction, getInboxData, updateSelectedInbox
    }), withAlert, withRouter,
)(ListBody); 