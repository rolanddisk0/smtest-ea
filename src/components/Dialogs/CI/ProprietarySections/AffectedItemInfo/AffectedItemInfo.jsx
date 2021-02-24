import React from 'react';
import s from './AffectedItemInfo.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AffectedItemInfo = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Услуга</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Услуга
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default AffectedItemInfo;