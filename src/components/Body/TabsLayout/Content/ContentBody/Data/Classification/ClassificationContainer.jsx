import { getDirection, getGroupAffectedItem, getCI, getService } from 'redux/dialogReducer';
import Classification from './Classification';
import { connect } from 'react-redux';
import React from 'react';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import { clearEditModeLists, getEditModeList } from 'redux/mainPageContentReducer';

const ClassificationContainer = (props) => {
    const getDirection = (value, setDataIsLoading) => props.getDirection(value, props.showAlert, setDataIsLoading);
    const getGroupAffectedItem = (value, setDataIsLoading) => props.getGroupAffectedItem(value, props.showAlert, setDataIsLoading);
    const getCI = (value, setDataIsLoading) => props.getCI(value, props.showAlert, setDataIsLoading);
    const getService = (value, setDataIsLoading) => props.getService(value, props.showAlert, setDataIsLoading);

    const getEditModeList = (listName, recordNewVals) => {
        return props.getEditModeList(props.recordId, listName, recordNewVals, 50);
    }

    return <Classification data={props.data} getDirection={getDirection} getGroupAffectedItem={getGroupAffectedItem} getCI={getCI} getService={getService}
        showAlert={props.showAlert} isEditModeEnabled={props.isEditModeEnabled} editModeLists={props.editModeLists} clearEditModeLists={props.clearEditModeLists} 
        getEditModeList={getEditModeList} />
}

let mapStateToProps = (state, props) => {
    return {
        data: state.mainPageContent.content[props.id].classificationData,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        editModeLists: state.mainPageContent.editModeLists,
        recordId: state.mainPageContent.content[props.id].headerItems.number.value,
    }
}

export default compose(
    connect(mapStateToProps, { getDirection, getGroupAffectedItem, getCI, getService, clearEditModeLists, getEditModeList }),
    withAlert
)(ClassificationContainer);