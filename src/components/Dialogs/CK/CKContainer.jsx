import { getContact, getDirection } from 'redux/dialogReducer';
import { connect } from 'react-redux';
import CK from './CK';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const CKContainer = (props) => {
    const getDirection = (value, setDataIsLoading) => props.getDirection(value, props.showAlert, setDataIsLoading);
    const getContact = (value, setDataIsLoading) => props.getContact(value, props.showAlert, setDataIsLoading);

    return <CK data={props.data} getDirection={getDirection} getContact={getContact}
        handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        data: state.dialog.ckData,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, getDirection }),
    withAlert,
    withDialogWrapper
)(CKContainer);