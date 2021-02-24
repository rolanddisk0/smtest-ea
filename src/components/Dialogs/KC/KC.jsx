import React, { useState } from 'react';
import s from './KC.module.scss';
import { Dialog, DialogContent, DialogTitle, Checkbox } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import { ReactComponent as KCIcon } from 'assets/icons/KCIcon.svg';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import DirectionList from './DirectionList/DirectionList';
import shortid from 'shortid';
import { getCaption } from 'utils/captions';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';
import DirectionContainer from 'components/Dialogs/Direction/DirectonContainer';

const KC = (props) => {
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [showDirectionDialog, setShowDirectionDialog] = useState(false);
    const [directionDataIsLoading, setDirectionDataIsLoading] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);

    const handleClose = () => props.handleClose();
    const contactClick = (target) => {
        setShowContactDialog(true);
        props.getContact(target.textContent, setContactDataIsLoading);
    }

    const getValueElement = (key, value) => {
        switch (key) {
            case 'manager':
                return <LinkButton text={value} onClick={(e) => { contactClick(e.target) }} />;
            case 'isBlocked':
                return <Checkbox disabled={true} checked={value} />;
            default:
                return value;
        }
    }

    let dataElements = [];
    for (let key in props.data) {
        if (key === 'directionList') { continue; }

        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.field}>{getCaption(key, 'kc')}:</div>
                <div className={s.value}>{getValueElement(key, props.data[key])}</div>
            </React.Fragment>
        ];
    }


    return <>
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />
        <DirectionContainer open={showDirectionDialog} handleClose={() => setShowDirectionDialog(false)} dataIsLoading={directionDataIsLoading} />

        <Dialog disableBackdropClick open={props.open}>
            <DialogTitle id='form-dialog-title' className={s.title}>
                <KCIcon className={s.listIcon} />
            Контакт-центр
        </DialogTitle>
            <DialogContent>
                <OverlaySpinner active={props.dataIsLoading}>
                    <div className={s.grid}>
                        {dataElements}
                    </div>
                    <DirectionList data={props.data.directionList} getDirection={props.getDirection} showAlert={props.showAlert}
                        setShowDirectionDialog={setShowDirectionDialog} setDirectionDataIsLoading={setDirectionDataIsLoading} />
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

export default KC;