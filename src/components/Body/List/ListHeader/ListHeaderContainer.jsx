import ListHeader from './ListHeader';
import { connect } from 'react-redux';
import { updateSelectedTodo, getInboxData } from 'redux/listReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        user: state.root.user,
        selectedTodo: state.list.selectedTodo,
        selectedInbox: state.list.selectedInbox
    }
}

export default compose(
    connect(mapStateToProps, { updateSelectedTodo, getInboxData }),
    withAlert
)(ListHeader);