import { getContact, getKC, getCK, getGroupAffectedItem } from 'redux/dialogReducer';
import Direction from './Directon';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const DirectionContainer = (props) => {
    const getContact = (value, setDataIsLoading) => props.getContact(value, props.showAlert, setDataIsLoading);
    const getKC = (value, setDataIsLoading) => props.getKC(value, props.showAlert, setDataIsLoading);
    const getCK = (value, setDataIsLoading) => props.getCK(value, props.showAlert, setDataIsLoading);
    const getGroupAffectedItem = (value, setDataIsLoading) => props.getGroupAffectedItem(value, props.showAlert, setDataIsLoading);

    return <Direction data={props.data} getKC={getKC} getCK={getCK} getContact={getContact} getGroupAffectedItem={getGroupAffectedItem}
        handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        data: state.dialog.directionData,
    }
}

export default compose(
    connect(mapStateToProps, { getContact, getKC, getCK, getGroupAffectedItem }),
    withAlert,
    withDialogWrapper
)(DirectionContainer);