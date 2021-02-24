import React from 'react';
import s from './AdditionalInfo.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AdditionalInfo = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Дополнительная информация</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Дополнительная информация
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default AdditionalInfo;