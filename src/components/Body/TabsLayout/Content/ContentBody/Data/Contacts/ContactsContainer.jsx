import Contacts from './Contacts';
import { connect } from 'react-redux';
import { getContact } from 'redux/dialogReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import React from 'react';
import { getEditModeList } from 'redux/mainPageContentReducer';

const ContactsContainer = (props) => {
    const getContact = (value, setDataIsLoading) => props.getContact(value, props.showAlert, setDataIsLoading);
    const getEditModeList = (listName, recordNewVals ) => props.getEditModeList(props.recordId, listName, recordNewVals, 50).then(data => data);

    return <Contacts data={props.data} getContact={getContact} isEditModeEnabled={props.isEditModeEnabled} getEditModeList={getEditModeList} />;
}

let mapStateToProps = (state, props) => {
    return {
        data: state.mainPageContent.content[props.id].contactsData,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        recordId: state.mainPageContent.content[props.id].headerItems.number.value,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, getEditModeList }),
    withAlert
)(ContactsContainer);