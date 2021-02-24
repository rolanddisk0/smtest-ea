import React, { useState } from 'react';
import s from './CK.module.scss';
import { Dialog, DialogContent, DialogTitle, TextField, Checkbox } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import { ReactComponent as CKIcon } from 'assets/icons/CKIcon.svg';
import shortid from 'shortid';
import { getCaption } from 'utils/captions';
import AssigneeList from './AssigneeList/AssigneeList';
import DirectionList from './DirectionList/DirectionList';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';
import DirectionContainer from 'components/Dialogs/Direction/DirectonContainer';

const CK = (props) => {
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [showDirectionDialog, setShowDirectionDialog] = useState(false);
    const [directionDataIsLoading, setDirectionDataIsLoading] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);
    const [ckTab, setCKTab] = useState(0);

    const handleClose = () => props.handleClose();
    const handleChange = (event, newValue) => setCKTab(newValue);
    const contactClick = (target) => {
        setShowContactDialog(true);
        props.getContact(target.textContent, setContactDataIsLoading);
    }

    const getValueElement = (key, value) => {
        switch (key) {
            case 'coord':
                return <LinkButton text={value} onClick={(e) => { contactClick(e.target) }} />;
            case 'isBlocked':
                return <Checkbox disabled={true} checked={value} />;
            default:
                return value;
        }
    }

    let dataElements = [];
    for (let key in props.data) {
        if (key === 'directionList' || key === 'assignees') { continue; }

        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.field}>{getCaption(key, 'ck')}:</div>
                <div className={s.value}>{getValueElement(key, props.data[key])}</div>
            </React.Fragment>
        ];
    }

    return <>
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />
        <DirectionContainer open={showDirectionDialog} handleClose={() => setShowDirectionDialog(false)} dataIsLoading={directionDataIsLoading} />

        <Dialog disableBackdropClick open={props.open}>
            <DialogTitle id='form-dialog-title' className={s.title}>
                <CKIcon className={s.listIcon} />
            Центр компетенции
        </DialogTitle>
            <DialogContent>
                <OverlaySpinner active={props.dataIsLoading}>
                    <div className={s.grid}>
                        {dataElements}
                    </div>
                    <div className={s.list}>
                        <AppBar position='static'>
                            <Tabs value={ckTab} onChange={handleChange} indicatorColor='primary' variant='fullWidth' >
                                <Tab label='Инженеры ЦК' {...TabProps(0)} />
                                <Tab label='Направления' {...TabProps(1)} />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={ckTab} index={0}>
                            <AssigneeList data={props.data.assignees} getContact={props.getContact} showAlert={props.showAlert}
                                setShowContactDialog={setShowContactDialog} setContactDataIsLoading={setContactDataIsLoading} />
                        </TabPanel>
                        <TabPanel value={ckTab} index={1}>
                            <DirectionList data={props.data.directionList} getDirection={props.getDirection} showAlert={props.showAlert}
                                setShowDirectionDialog={setShowDirectionDialog} setDirectionDataIsLoading={setDirectionDataIsLoading} />
                        </TabPanel>
                    </div>
                </OverlaySpinner>
            </DialogContent>
            <div className={s.actions}>
                <div onClick={handleClose}>
                    <img src={OkIcon} alt='OkIcon' />
                </div>
            </div>
        </Dialog>
    </>
}

export default CK;