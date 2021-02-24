import CMDBPanel from './CMDBPanel';
import { connect } from 'react-redux';
import { getCI } from 'redux/dialogReducer';
import { getEditModeList } from 'redux/mainPageContentReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import React from 'react';

const CMDBPanelContainer = (props) => {
    const getCI = (value, setDataIsLoading) => props.getCI(value, props.showAlert, setDataIsLoading);

    const getEditModeList = (listName, recordNewVals, isAsync = false) => {
        const maxRecords = isAsync ? 50 : 0; //Если isAsync, значит записей много и надо грузить их пачками. Иначе можем грузить все (max === 0 -> грузим все записи)
        return props.getEditModeList(props.recordId, listName, recordNewVals, maxRecords).then(data => data);
    }

    return <CMDBPanel cmdbPanelData={props.cmdbPanelData} getCI={getCI} isEditModeEnabled={props.isEditModeEnabled} getEditModeList={getEditModeList} 
        editModeLists={props.editModeLists} />
}

let mapStateToProps = (state, props) => {
    return {
        recordId: state.mainPageContent.content[props.id].headerItems.number.value,
        cmdbPanelData: state.mainPageContent.content[props.id].cmdbPanelData,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        editModeLists: state.mainPageContent.editModeLists,
    }
}

export default compose(
    connect(mapStateToProps, { getCI, getEditModeList }),
    withAlert
  )(CMDBPanelContainer);