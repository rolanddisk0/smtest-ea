import { getContact, getDirection } from 'redux/dialogReducer';
import { connect } from 'react-redux';
import KC from './KC';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const KCContainer = (props) => {
    const getContact = (value, setDataIsLoading) => props.getContact(value, props.showAlert, setDataIsLoading);
    const getDirection = (value, setDataIsLoading) => props.getDirection(value, props.showAlert, setDataIsLoading);

    return <KC data={props.data} getContact={getContact} getDirection={getDirection} handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        data: state.dialog.kcData,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, getDirection }),
    withAlert,
    withDialogWrapper
)(KCContainer);