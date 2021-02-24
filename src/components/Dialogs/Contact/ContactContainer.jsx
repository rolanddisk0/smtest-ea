import { connect } from 'react-redux';
import Contact from './Contact';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import { getKC } from 'redux/dialogReducer';
import React from 'react';

const ContactContainer = (props) => {
    const getKC = (value, setDataIsLoading) => props.getKC(value, props.showAlert, setDataIsLoading);

    return <Contact contactData={props.contactData} getKC={getKC} handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        contactData: state.dialog.contactData,
    }
}

export default compose(
    connect(mapStateToProps, { getKC }),
    withAlert,
    withDialogWrapper
)(ContactContainer);