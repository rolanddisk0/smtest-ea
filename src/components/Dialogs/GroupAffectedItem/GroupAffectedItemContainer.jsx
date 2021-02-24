import { getDirection } from 'redux/dialogReducer';
import GroupAffectedItem from './GroupAffectedItem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const GroupAffectedItemContainer = (props) => {
    const getDirection = (value, setDataIsLoading) => props.getDirection(value, props.showAlert, setDataIsLoading);

    return <GroupAffectedItem data={props.data} getDirection={getDirection} handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        data: state.dialog.groupAffectedItemData,
    }
}

export default compose(
    connect(mapStateToProps, { getDirection }),
    withAlert,
    withDialogWrapper
)(GroupAffectedItemContainer);