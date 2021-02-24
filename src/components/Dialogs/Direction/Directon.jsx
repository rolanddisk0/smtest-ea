import React, { useState } from 'react';
import s from './Direction.module.scss';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import { ReactComponent as DirectionIcon } from 'assets/icons/DirectionIcon.svg';
import KCList from './KCList/KCList';
import CKList from './CKList/CKList';
import GroupAffectedItemList from './GroupAffectedItemList/GroupAffectedItemList';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import shortid from 'shortid';
import { getCaption } from 'utils/captions';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';

const Direction = (props) => {
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);
    const [directionTab, setDirectionTab] = useState(0);

    const handleClose = () => props.handleClose();
    const handleChange = (event, newValue) => setDirectionTab(newValue);
    const contactClick = (target) => {
        setShowContactDialog(true);
        props.getContact(target.textContent, setContactDataIsLoading);
    }

    const getValueElement = (key, value) => {
        switch (key) {
            case 'responsibleContact':
            case 'coord':
                return <LinkButton text={value} onClick={(e) => { contactClick(e.target) }} />;
            default:
                return value;
        }
    }

    let dataElements = [];
    for (let key in props.data) {
        if (key === 'ckList' || key === 'kcList' || key === 'groupAffectedItemList') { continue; }

        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.field}>{getCaption(key, 'direction')}:</div>
                <div className={s.value}>{getValueElement(key, props.data[key])}</div>
            </React.Fragment>
        ];
    }

    return <>
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />

        <Dialog disableBackdropClick open={props.open}>
            <DialogTitle id='form-dialog-title' className={s.title}>
                <DirectionIcon className={s.listIcon} />
            Направление
          </DialogTitle>
            <DialogContent>
                <OverlaySpinner active={props.dataIsLoading}>
                    <div className={s.grid}>
                        {dataElements}
                    </div>
                    <div className={s.fields}>
                        <AppBar position='static'>
                            <Tabs value={directionTab} onChange={handleChange} indicatorColor='primary' variant='fullWidth' >
                                <Tab label='Контакт-центры (КЦ)' {...TabProps(0)} />
                                <Tab label='Центры компетенции' {...TabProps(1)} />
                                <Tab label='Группы услуг' {...TabProps(2)} />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={directionTab} index={0}>
                            <KCList data={props.data.kcList} getKC={props.getKC} showAlert={props.showAlert} />
                        </TabPanel>
                        <TabPanel value={directionTab} index={1}>
                            <CKList data={props.data.ckList} getCK={props.getCK} showAlert={props.showAlert} />
                        </TabPanel>
                        <TabPanel value={directionTab} index={2}>
                            <GroupAffectedItemList listData={props.data.groupAffectedItemList} getGroupAffectedItem={props.getGroupAffectedItem}
                                showAlert={props.showAlert} />
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

export default Direction;