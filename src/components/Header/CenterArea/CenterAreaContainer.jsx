import React from 'react';
import CenterArea from './CenterArea';
import { connect } from 'react-redux';
import { toogleEditMode } from 'redux/mainPageContentReducer';
import { updateCurrentRow, updateListAction, updateSelectedInbox } from 'redux/listReducer';
import { getWorkflowMeta } from 'redux/headerReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import { getRecordNumberPrefix, getIdField } from 'utils/custom';
import { useHistory } from 'react-router-dom';

const CenterAreaContainer = (props) => {
    const history = useHistory();
    const getTitleField = selectedTodo => {
        switch (selectedTodo) {
            case 'dit_p_sd_all':
                return 'title';
            case 'dit_p_im_all':
                return 'brief_description';
            case 'dit_p_cm3_all':
                return 'brief_description';
            default:
                return 'title';
        }
    }

    const smartSearch = (value) => {
        const prefix = getRecordNumberPrefix(value);
        if (['SD', 'IM', 'C'].includes(prefix)) {
            props.updateCurrentRow({
                tabMode: 'exist',
                key: value
            });
            history.push(`/index/module/${value}`);
        } else {
            const titleField = getTitleField(props.selectedTodo);
            const isNumber = (typeof Number(value) == 'number');

            if (isNumber) {
                const idField = getIdField(props.selectedTodo);
                props.updateSelectedInbox({
                    smartFilter: `m1.${idField} like '%${value}%' or ${titleField} like '%${value}%'`
                });
            } else {
                props.updateSelectedInbox({
                    smartFilter: `${titleField} like '%${value}%'`
                });
            }
        }
    }

    const getWorkflowMeta = () => props.getWorkflowMeta(props.recordId);
    const toogleEditMode = () => props.toogleEditMode(!props.isEditModeEnabled, props.recordId);

    return <CenterArea smartSearch={smartSearch} updateCurrentRow={props.updateCurrentRow} currentRow={props.currentRow} updateListAction={props.updateListAction}
        toogleEditMode={toogleEditMode} isEditModeEnabled={props.isEditModeEnabled} updateSelectedInbox={props.updateSelectedInbox} getWorkflowMeta={getWorkflowMeta} 
        id={props.recordId}/>
}

const mapStateToProps = (state, props) => {
    //TODO придумать как это нормально передавать
    const recordId = state.mainPageContent.content[state.mainPageContent.activeRecord.id] ? state.mainPageContent.activeRecord.id : 'empty';

    return {
        activeRecord: state.mainPageContent.activeRecord,
        currentRow: state.list.currentRow,
        isEditModeEnabled: state.mainPageContent.content[recordId].isEditModeEnabled,
        recordId: recordId, //state.mainPageContent.content[props.id].headerItems.number.value,
        selectedInbox: state.list.selectedInbox,
        selectedTodo: state.list.selectedTodo
    }
}

export default compose(
    connect(mapStateToProps, { updateCurrentRow, updateListAction, updateSelectedInbox, toogleEditMode, getWorkflowMeta }),
    withAlert
)(CenterAreaContainer);