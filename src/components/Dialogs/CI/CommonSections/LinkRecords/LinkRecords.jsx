import React from 'react';
import s from './LinkRecords.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const LinkRecords = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Связанные записи</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Связанные записи
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default LinkRecords;