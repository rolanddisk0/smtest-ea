import React, { useState } from 'react';
import s from './ChartDialog.module.scss';
import commonHeaderStyle from '../../Header.module.scss';
import { Dialog, DialogContent, Tabs, Tab } from '@material-ui/core';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import DashboardContainer from './Dashboard/DashboardContainer';
import KpiContainer from './Kpi/KpiContainer';
import ReportContainer from './Report/ReportContainer';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';

const ChartDialog = (props) => {
    const [value, setValue] = useState(0);
    const handleClose = () => props.handleClose();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog disableBackdropClick open={props.open} maxWidth='lg'>
            <DialogContent>
                <div className={s.contentGrid}>
                    <div className={s.tabs}>
                        <Tabs
                            orientation='vertical'
                            variant='scrollable'
                            aria-label='Vertical tabs inbox'
                            value={value}
                            onChange={handleChange}
                        >
                            <Tab label='Графики' {...TabProps(0)} />
                            <Tab label='KPI' {...TabProps(1)} />
                            <Tab label='Отчеты' {...TabProps(2)} />
                        </Tabs>
                    </div>
                    <div className={s.panels}>
                        <TabPanel value={value} index={0}>
                            <DashboardContainer />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <KpiContainer />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <ReportContainer />
                        </TabPanel>
                    </div>
                </div>
            </DialogContent>

            <div className={s.actions}>
                <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
            </div>
        </Dialog>
    );
}

export default ChartDialog;