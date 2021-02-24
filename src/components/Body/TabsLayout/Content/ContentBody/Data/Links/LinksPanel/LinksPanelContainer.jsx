import LinksPanel from './LinksPanel';
import { connect } from 'react-redux';
import { getContact } from 'redux/dialogReducer';
import { getContent } from 'redux/mainPageContentReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import React from 'react';

const LinksPanelContainer = (props) => {
    const getContact = (value, setDataIsLoading) => props.getContact(value, props.showAlert, setDataIsLoading);
    const getContent = id => props.getContent(id, props.showAlert);

    //Сначала каждая таблица была в своей вкладке, потом я решил их объединить
    const { sd, im, c, p } = props.linksPanelData;
    const allData = [...sd, ...im, ...c, ...p];

    return <LinksPanel linksPanelData={props.linksPanelData} getContact={getContact} getContent={getContent} allData={allData} />;
}

let mapStateToProps = (state, props) => {
    return {
        linksPanelData: state.mainPageContent.content[props.id].linksPanelData,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, getContent }),
    withAlert
)(LinksPanelContainer);