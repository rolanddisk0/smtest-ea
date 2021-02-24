import Assignment from './Assignment';
import { connect } from 'react-redux';
import { getContact, getKC, getCK } from 'redux/dialogReducer';
import { clearEditModeLists, getEditModeList } from 'redux/mainPageContentReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import React from 'react';

const AssignmentContainer = (props) => {
    const getContact = (value, setDataIsLoading) => props.getContact(value, props.showAlert, setDataIsLoading);
    const getKC = (value, setDataIsLoading) => props.getKC(value, props.showAlert, setDataIsLoading);
    const getCK = (value, setDataIsLoading) => props.getCK(value, props.showAlert, setDataIsLoading);

    const getEditModeList = (listName, recordNewVals, isAsync = false) => {
        const maxRecords = isAsync ? 50 : 0; //Если isAsync, значит записей много и надо грузить их пачками. Иначе можем грузить все (max === 0 -> грузим все записи)
        return props.getEditModeList(props.recordId, listName, recordNewVals, maxRecords).then(data => data);
    }

    if (props.prefix !== 'SD') { return null; }
    return <Assignment data={props.data} getContact={getContact} getKC={getKC} getCK={getCK} isEditModeEnabled={props.isEditModeEnabled}
        editModeLists={props.editModeLists} clearEditModeLists={props.clearEditModeLists} getEditModeList={getEditModeList} />;
}

let mapStateToProps = (state, props) => {
    return {
        data: state.mainPageContent.content[props.id].assignmentData,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        editModeLists: state.mainPageContent.editModeLists,
        recordId: state.mainPageContent.content[props.id].headerItems.number.value,
        prefix: state.mainPageContent.content[props.id].prefix,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, getKC, getCK, clearEditModeLists, getEditModeList }),
    withAlert
)(AssignmentContainer);