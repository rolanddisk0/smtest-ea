import React, { useState } from 'react';
import s from './SupportDialog.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';
import QuickRequest from './QuickRequest/QuickRequest';
import DetailedRequestContainer from './DetailedRequest/DetailedRequestContainer';
import RepeatRequestContainer from './RepeatRequest/RepeatRequestContainer';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';

const SupportDialog = (props) => {
    const [supportTab, setSupportTab] = useState(0);
    
    const handleClose = () => props.handleClose();
    const handleChange = (event, newValue) => setSupportTab(newValue);
    const onSendClick = (data, createType) => props.createSD(data, createType);

    return <>
        <Dialog onClose={handleClose} open={props.open} fullWidth={true} maxWidth='md'>
            <DialogContent>
                <OverlaySpinner active={props.sdIsCreating}>
                    <div className={s.mainTitle}>
                        Форма подачи заявки
                </div>

                    <AppBar position='static'>
                        <Tabs value={supportTab} onChange={handleChange} indicatorColor='primary' variant='fullWidth' >
                            <Tab label='Быстрая заявка' {...TabProps(0)} />
                            <Tab label='Детализированная заявка' {...TabProps(1)} />
                            <Tab label='Повторная заявка' {...TabProps(2)} />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={supportTab} index={0}>
                        <QuickRequest onSendClick={onSendClick} />
                    </TabPanel>
                    <TabPanel value={supportTab} index={1}>
                        <DetailedRequestContainer onSendClick={onSendClick} />
                    </TabPanel>
                    <TabPanel value={supportTab} index={2}>
                        <RepeatRequestContainer onSendClick={onSendClick} />
                    </TabPanel>
                </OverlaySpinner>
            </DialogContent>
        </Dialog>
    </>;
}

export default SupportDialog;
