import React from 'react';
import s from './Resolution.module.scss';
import Feedback from './Feedback/Feedback';
import ResolutionData from './ResolutionData/ResolutionData';
import commonDataStyle from '../Data.module.scss';

const Resolution = (props) => {
    return <>
        <div className={`${s.content} ${commonDataStyle.sectionBlock}`}>
            <ResolutionData data={props.resolutionData} isEditModeEnabled={props.isEditModeEnabled} lists={props.editModeLists} />
            <Feedback data={props.feedbackData} isEditModeEnabled={props.isEditModeEnabled} lists={{closeMarkList: props.closeMarkList}}/>
        </div>
    </>;
}

export default Resolution;