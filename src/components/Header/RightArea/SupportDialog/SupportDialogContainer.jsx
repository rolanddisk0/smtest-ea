import React from 'react';
import SupportDialog from './SupportDialog';
import { connect } from 'react-redux';
import { createSD } from 'redux/headerReducer';
import { updateCurrentRow } from 'redux/listReducer';
import { compose } from 'redux';
import { withAlert } from 'hoc/withAlert';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

const SupportDialogContainer = (props) => {
    const createSD = (data, createType) => props.createSD(data, props.showAlert, props.handleClose, createType, props.updateCurrentRow);
    return <SupportDialog createSD={createSD} sdIsCreating={props.sdIsCreating} open={props.open} handleClose={props.handleClose} /> 
}

let mapStateToProps = (state) => {
    return {
        sdIsCreating: state.header.sdIsCreating,
    }
}

export default compose(
    connect(mapStateToProps, { createSD, updateCurrentRow }),
    withAlert,
    withDialogWrapper
)(SupportDialogContainer);