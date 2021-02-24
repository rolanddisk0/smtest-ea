import React from 'react';
import Description from './Description';
import { connect } from 'react-redux';
import { getContact } from 'redux/dialogReducer';
import { downloadAttachment } from 'redux/mainPageContentReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

const DescriptionContainer = (props) => {
    const downloadAttachment = (recordId, uid, filename) => props.downloadAttachment(recordId, uid, filename, props.showAlert);
    return <Description data={props.data} attachments={props.attachments} downloadAttachment={downloadAttachment} isEditModeEnabled={props.isEditModeEnabled} 
    getContact={props.getContact}/>;
}

let mapStateToProps = (state, props) => {
    return {
        data: state.mainPageContent.content[props.id].descriptionData,
        attachments: state.mainPageContent.content[props.id].recordAttachments,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, downloadAttachment }),
    withAlert
)(DescriptionContainer);