import React, { useState } from 'react';
import s from './LinksCI.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import CIContainer from 'components/Dialogs/CI/CIContainer';

const LinksCI = (props) => {
    const [showCIDialog, setShowCIDialog] = useState(false);
    const [ciDataIsLoading, setCIDataIsLoading] = useState(false);
    const ciClick = target => {
        setShowCIDialog(true);
        props.getCI(target.textContent, setCIDataIsLoading);
    }

    const columns = [
        {
            Header: 'Наименование КЕ',
            accessor: 'logicalName',
            style: { 'whiteSpace': 'unset' },
            Cell: e => <LinkButton text={e.value} onClick={(e) => { ciClick(e.target) }} />,
        },
        {
            Header: 'Тип КЕ',
            accessor: 'ciType',
            style: { 'whiteSpace': 'unset' }
        },
        {
            Header: 'Тип связи',
            accessor: 'relType',
        },
    ];

    return <>
        <CIContainer open={showCIDialog} handleClose={() => setShowCIDialog(false)} dataIsLoading={ciDataIsLoading} setCIDataIsLoading={setCIDataIsLoading} />

        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <span className={s.title}>Связи</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={s.content}>
                    <div>Вышестоящие КЕ:</div>
                    <div className={s.tableContainer}>
                        <ReactTableV6 data={props.data.up} columns={columns} showPagination />
                    </div>
                    <div>Нижестоящие КЕ:</div>
                    <div className={s.tableContainer}>
                        <ReactTableV6 data={props.data.down} columns={columns} showPagination />
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </>;
}

export default LinksCI;