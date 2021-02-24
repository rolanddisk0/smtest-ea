import React from 'react';
import s from './History.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const History = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>История</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            История
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default History;