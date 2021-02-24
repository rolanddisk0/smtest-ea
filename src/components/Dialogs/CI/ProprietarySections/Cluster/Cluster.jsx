import React from 'react';
import s from './Cluster.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Cluster = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Кластер</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Кластер
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default Cluster;