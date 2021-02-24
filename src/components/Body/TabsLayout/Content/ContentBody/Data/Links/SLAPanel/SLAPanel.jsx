import React from 'react';
import s from './SLAPanel.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const SLAPanel = (props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.header}>SLA</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div>
                <div className={s.grid}>
                    <div>Крайний срок: </div><div>{props.slaData.nextBreach.value || 'не задан'}</div>
                </div>
                <div>
                    <FormControlLabel disabled control={<Checkbox name='passed50Percent' checked={props.slaData.passed50Percent.value || false} />} label='50% предполагаемого срока прошло' />
                </div>
                <div>
                    <FormControlLabel disabled control={<Checkbox name='passed75Percent' checked={props.slaData.passed75Percent.value || false} />} label='75% предполагаемого срока прошло' />
                </div>
                <div>
                    <FormControlLabel disabled control={<Checkbox name='passed100Percent' checked={props.slaData.passed100Percent.value || false} />} label='Срок нарушен' />
                </div>
            </div>
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default SLAPanel;