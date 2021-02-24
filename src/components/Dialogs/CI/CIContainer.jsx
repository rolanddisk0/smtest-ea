import { getDirection, getGroupAffectedItem, getCI } from 'redux/dialogReducer';
import CI from './CI';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const CIContainer = (props) => {
    const getDirection = (value, setDataIsLoading) => props.getDirection(value, props.showAlert, setDataIsLoading);
    const getGroupAffectedItem = (value, setDataIsLoading) => props.getGroupAffectedItem(value, props.showAlert, setDataIsLoading);
    const getCI = (value, setDataIsLoading) => props.getCI(value, props.showAlert, setDataIsLoading);

    return <CI data={props.data} getDirection={getDirection} getGroupAffectedItem={getGroupAffectedItem} getCI={getCI}
        handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} setCIDataIsLoading={props.setCIDataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        data: state.dialog.ciData,
    }
}

export default compose(
    connect(mapStateToProps, { getDirection, getGroupAffectedItem, getCI }),
    withAlert,
    withDialogWrapper
)(CIContainer);