import React from 'react';
import s from './ControlPanel.module.scss';
import EditModeBtns from './EditModeBtns/EditModeBtns'
import SMActionBtnsContainer from './SMActionBtns/SMActionBtnsContainer'

const ControlPanel = (props) => {
    return <div className={s.content}>
        <div className={s.btns}>
            {props.isEditModeEnabled 
                ? <EditModeBtns deactivateEditMode={props.deactivateEditMode}/> 
                : <SMActionBtnsContainer id={props.id}/>}
        </div>
        
    </div>;
}

export default ControlPanel;