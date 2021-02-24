import React, { useState } from 'react';
import s from './CenterArea.module.scss';
import commonHeaderStyle from '../Header.module.scss';
import SearchIcon from 'assets/headerImgs/Search.svg';
import AddIcon from 'assets/headerImgs/Add.svg';
import EditIcon from 'assets/headerImgs/Edit.svg';
import ToStartIcon from 'assets/headerImgs/ToStart.svg';
import PreviousIcon from 'assets/headerImgs/Previous.svg';
import NextIcon from 'assets/headerImgs/Next.svg';
import ToEndIcon from 'assets/headerImgs/ToEnd.svg';
import GanttDiagrammIcon from 'assets/headerImgs/GanttDiagramm.svg';
import WorkflowIcon from 'assets/headerImgs/Workflow.svg';
import ChangeCalendarDialogContainer from './ChangeCalendarDialog/ChangeCalendarDialogContainer';
import WorkflowDialogContainer from './WorkflowDialog/WorkflowDialogContainer';

const CenterArea = (props) => {
    const [showChangeCalendarDialog, setShowChangeCalendarDialog] = useState(false);
    const [showWorkflowDialog, setShowWorkflowDialog] = useState(false);

    const changeCalendarClick = () => setShowChangeCalendarDialog(true);
    const workflowClick = () => {
        setShowWorkflowDialog(true);
        props.getWorkflowMeta();
    }

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            props.smartSearch(e.target.value);
        }
    }
    const handleSearchChange = (e) => {
        if (e.target.value == '') {
            props.updateSelectedInbox({
                smartFilter: null
            });
        }
    }
    const startIconClick = () => {
        props.updateListAction('start');
    }
    const previousIconClick = () => {
        props.updateListAction('previous');
    }
    const nextIconClick = () => {
        props.updateListAction('next');
    }
    const endIconClick = () => {
        props.updateListAction('end');
    }

    const editModeClick = () => props.toogleEditMode();

    return (
        <div className={s.content}>
            <ChangeCalendarDialogContainer open={showChangeCalendarDialog} handleClose={() => setShowChangeCalendarDialog(false)} />
            <WorkflowDialogContainer open={showWorkflowDialog} handleClose={() => setShowWorkflowDialog(false)} id={props.id}/>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} ${s.containerWideNarrow}`}>
                <img src={SearchIcon} alt='SearchIcon' />
                <div className={s.searchInputContainer}><input className={s.searchInput} onKeyDown={(e) => handleSearchKeyDown(e)} onChange={(e) => handleSearchChange(e)} /></div>
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} ${s.containerShort}`}>
                <img src={AddIcon} alt='AddIcon' />
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} ${s.containerShort} ${commonHeaderStyle.clickable} 
                ${props.isEditModeEnabled && s.btnEnabled}`} onClick={editModeClick}>
                    
                <img src={EditIcon} alt='EditIcon' />
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} ${s.containerWide} ${commonHeaderStyle.clickable}`}>
                <img src={ToStartIcon} alt='ToStartIcon' onClick={startIconClick} />
                <img src={PreviousIcon} alt='PreviousIcon' onClick={previousIconClick} />
                <img src={NextIcon} alt='NextIcon' onClick={nextIconClick} />
                <img src={ToEndIcon} alt='ToEndIcon' onClick={endIconClick} />
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} 
                ${s.containerShort} ${commonHeaderStyle.clickable}`} onClick={changeCalendarClick}
            >
                <img src={GanttDiagrammIcon} alt='GanttDiagrammIcon' />
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} 
                ${s.containerShort} ${commonHeaderStyle.clickable}`} onClick={workflowClick}
            >
                <img src={WorkflowIcon} alt='WorkflowIcon' />
            </div>
        </div>
    );
}

export default CenterArea;