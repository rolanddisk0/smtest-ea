import { execSMAction } from 'redux/mainPageContentReducer';
import SMAction from './SMAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const SMActionContainer = (props) => {
    const execSMAction = (smAction, values) => {
        props.execSMAction(props.id, props.showAlert, smAction, values);
    }

    const open = props.smAction ? props.open : false; //Если действие не передали, то и открывать диалог не за чем
    return <SMAction smAction={props.smAction} handleClose={props.handleClose} open={open} execSMAction={execSMAction} 
        sdActionsInfo={props.sdActionsInfo} imActionsInfo={props.imActionsInfo} cActionsInfo={props.cActionsInfo}
        dataIsLoading={props.dataIsLoading} getSMActionFieldsData={props.getSMActionFieldsData} clearSMActionFieldsData={props.clearSMActionFieldsData} 
        direction={props.direction} feedbackType={props.feedbackType} category={props.category} area={props.area} />
}

let mapStateToProps = (state, props) => {
    return {
        id: state.mainPageContent.content[props.id].headerItems.number.value,
        direction: state.mainPageContent.content[props.id].classificationData.direction.value,
        feedbackType: state.mainPageContent.content[props.id].headerItems.feedbackType.value,
        category: state.mainPageContent.content[props.id].headerItems.category.value,
        sdActionsInfo: state.smAction.sd,
        imActionsInfo: state.smAction.im,
        cActionsInfo: state.smAction.c,
    }
}

export default compose(
    connect(mapStateToProps, { execSMAction }),
    withAlert,
    withDialogWrapper
)(SMActionContainer);