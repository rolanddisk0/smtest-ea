import List from './List';
import { connect } from 'react-redux';
import React from 'react';
import { updateListIsLoading, listSetData, updateSelectedColumns, updateSelectedTodo, updateSelectedInbox, getDefaultInboxId } from 'redux/listReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

class ListContainer extends React.Component {
    componentDidMount() {
        this.props.getDefaultInboxId(this.props.selectedTodo, this.props.showAlert, this.props.user);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedTodo !== prevProps.selectedTodo && this.props.viewName != this.props.selectedTodo) { // если поменяли очередь
            this.props.getDefaultInboxId(this.props.selectedTodo, this.props.showAlert, this.props.user);
        }
    }


    render() {
        return <List listIsLoading={this.props.listIsLoading} data={this.props.listData} columns={this.props.selectedInbox.columns} uniqueKey={this.props.selectedInbox.uniqueKey}
            selectedColumns={this.props.selectedColumns} selectedTodo={this.props.selectedTodo} updateSelectedTodo={this.props.updateSelectedTodo} />
    }
}

let mapStateToProps = (state) => {
    return {
        listData: state.list.listData,
        selectedTodo: state.list.selectedTodo,
        selectedColumns: state.list.selectedColumns,
        listIsLoading: state.list.listIsLoading,
        selectedInbox: state.list.selectedInbox,
        user: state.root.user
    }
}

export default compose(
    connect(mapStateToProps,
        { updateListIsLoading, listSetData, updateSelectedColumns, updateSelectedTodo, updateSelectedInbox, getDefaultInboxId
        }),
    withAlert
)(ListContainer);
    