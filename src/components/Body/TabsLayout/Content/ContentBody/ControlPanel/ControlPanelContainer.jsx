import ControlPanel from './ControlPanel';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toogleEditMode } from 'redux/mainPageContentReducer';
import React from 'react';

const ControlPanelContainer = (props) => {
    const deactivateEditMode = () => props.toogleEditMode(false, props.id);
    return <ControlPanel isEditModeEnabled={props.isEditModeEnabled} deactivateEditMode={deactivateEditMode} id={props.id}/>
}

let mapStateToProps = (state, props) => {
    return {
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
    }
}

export default compose(
    connect(mapStateToProps, { toogleEditMode })
)(ControlPanelContainer);