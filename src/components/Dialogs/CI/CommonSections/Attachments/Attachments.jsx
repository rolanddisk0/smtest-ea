import React from 'react';
import s from './Attachments.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Attachments = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Вложения</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Вложения
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default Attachments;