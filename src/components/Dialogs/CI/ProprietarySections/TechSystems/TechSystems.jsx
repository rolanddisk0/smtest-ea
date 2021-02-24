import React from 'react';
import s from './TechSystems.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const TechSystems = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Тех. системы ЦОД</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Тех. системы ЦОД
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default TechSystems;