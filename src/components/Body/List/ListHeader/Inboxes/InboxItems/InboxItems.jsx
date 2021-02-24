import React from 'react';
import s from './InboxItems.module.scss';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Checkbox
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import MenuContainer from '../Menu/MenuContainer';

const InboxItems = (props) => {
    //const defaultExpanded = props.header === 'Мои представления' ? true : false;
    const defaultExpanded = props.type != 'other' ? true : false;

    return <div className={s.panelContainer}>
        <ExpansionPanel defaultExpanded={defaultExpanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <span className={s.header}>{props.header}</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ReactTable
                    data={props.data}
                    columns={[
                        {
                            Header: 'Название',
                            accessor: 'name',
                            width: 300,
                            Cell: (e) => {
                                return <div className={s.grid}>
                                    <div className={s.noOverflowTextContainer}>{e.value}</div>
                                    <MenuContainer type={props.type} id={e.original._id} />
                                </div>
                            }
                        },
                        {
                            Header: 'Текущее',
                            id: 'isCurrent',
                            accessor: d => {
                                return <Checkbox disabled checked={d._id == props.selectedInbox.id} />
                            }
                        },
                        {
                            Header: 'По умолчанию',
                            id: 'isDefault',
                            accessor: d => {
                                return <Checkbox disabled checked={d.isDefault} />
                            }
                        },
                        {
                            Header: 'Активно',
                            id: 'isActive',
                            accessor: d => {
                                return <Checkbox disabled checked={d.isActive} />
                            }
                        }
                    ]}
                    showPagination={false}
                    pageSize={props.data.length}
                    className='-striped -highlight'
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
}

export default InboxItems;

