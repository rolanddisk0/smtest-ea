import { execSMAction } from 'redux/mainPageContentReducer';
import { getSMActionFieldsData, clearSMActionFieldsData } from 'redux/doSMActionReducer';
import SMActionBtns from './SMActionBtns';
import { connect } from 'react-redux';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import React from 'react';

const SMActionBtnsContainer = (props) => {
    const getIsNeedInfo = (smAction) => {
        switch (props.area) {
            case 'SD':
                return {
                    isSMActionDialogNeeded: props.sdActionsInfo[smAction] && props.sdActionsInfo[smAction].isSMActionDialogNeeded,
                    isFieldsAvailListsLoadNeeded: props.sdActionsInfo[smAction] && props.sdActionsInfo[smAction].isFieldsAvailListsLoadNeeded
                }
            case 'IM':
                return {
                    isSMActionDialogNeeded: props.imActionsInfo[smAction] && props.imActionsInfo[smAction].isSMActionDialogNeeded,
                    isFieldsAvailListsLoadNeeded: props.imActionsInfo[smAction] && props.imActionsInfo[smAction].isFieldsAvailListsLoadNeeded
                }
            case 'C':
                return {
                    isSMActionDialogNeeded: props.cActionsInfo[smAction] && props.cActionsInfo[smAction].isSMActionDialogNeeded,
                    isFieldsAvailListsLoadNeeded: props.cActionsInfo[smAction] && props.cActionsInfo[smAction].isFieldsAvailListsLoadNeeded
                }
            default:
                return {
                    isSMActionDialogNeeded: false,
                    isFieldsAvailListsLoadNeeded: false
                }
        }
    }

    const execSMAction = (smAction, values) => {
        if (!values && props.sdActionsInfo[smAction] && props.sdActionsInfo[smAction].idSMActionDialogNeeded) {
            props.showAlert(`Ошибка заполнения формы`, 'error', `Ошибка заполнения формы при выполнении действия! Данные с формы не были получены!`);
            return null;
        }
        props.execSMAction(props.id, props.showAlert, smAction, props.direction, values);
    }

    const getSMActionFieldsData = (smAction, dataIsLoading, additionalParams) => {
        props.getSMActionFieldsData(smAction, props.id, props.showAlert, dataIsLoading, additionalParams);
    }

    const clearSMActionFieldsData = (smAction) => props.clearSMActionFieldsData(smAction, props.id);

    return <SMActionBtns btns={props.btns} execSMAction={execSMAction} getIsNeedInfo={getIsNeedInfo} getSMActionFieldsData={getSMActionFieldsData} 
        clearSMActionFieldsData={clearSMActionFieldsData} id={props.id} area={props.area} />
}

let mapStateToProps = (state, props) => {
    return {
        area: state.mainPageContent.content[props.id].prefix,
        //id: state.mainPageContent.content[props.id].headerItems.number.value,
        btns: state.mainPageContent.content[props.id].controlPanelBtns,
        sdActionsInfo: state.smAction.sd,
        imActionsInfo: state.smAction.im,
        cActionsInfo: state.smAction.c,
    }
}

export default compose(
    connect(mapStateToProps, { execSMAction, getSMActionFieldsData, clearSMActionFieldsData }),
    withAlert
)(SMActionBtnsContainer);