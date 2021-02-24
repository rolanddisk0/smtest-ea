import React from 'react';
import s from './InfSysInfo.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const InfSysInfo = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>ИС</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            ИС
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default InfSysInfo;