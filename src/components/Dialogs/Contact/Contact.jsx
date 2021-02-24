import React, { useState } from 'react';
import s from './Contact.module.scss';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import shortid from 'shortid';
import { getCaption } from 'utils/captions';
import KCList from './KCList/KCList';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import KCContainer from 'components/Dialogs/KC/KCContainer';

const Contact = (props) => {
    const [showKCDialog, setShowKCDialog] = useState(false);
    const [kcDataIsLoading, setKCDataIsLoading] = useState(false);

    const handleClose = () => props.handleClose();

    let dataElements = [];
    for (let key in props.contactData.data) {
        if (key === 'kcList' || key === 'internalPhoneExt') { continue; }

        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.field}>{getCaption(key, 'contact')}:</div>
                <div className={s.value}>{props.contactData.data[key]}</div>
            </React.Fragment>
        ];
    }

    return <>
        <KCContainer open={showKCDialog} handleClose={() => setShowKCDialog(false)} dataIsLoading={kcDataIsLoading} />
        <Dialog disableBackdropClick open={props.open} fullWidth={true} maxWidth='md'>
            <OverlaySpinner active={props.dataIsLoading}>
                <DialogTitle id='form-dialog-title' className={s.title}>
                    <span className={s.title}>Контакт</span>
                </DialogTitle>

                <DialogContent>
                    <div className={s.grid}>
                        {dataElements}
                        <div>{getCaption('kcList', 'contact')}</div>
                        <div>
                            <KCList data={props.contactData.data.kcList} setShowKCDialog={setShowKCDialog} getKC={props.getKC}
                                showAlert={props.showAlert} setKCDataIsLoading={setKCDataIsLoading} />
                        </div>
                    </div>
                </DialogContent>
            </OverlaySpinner>
            <div className={s.actions}>
                <div onClick={handleClose}>
                    <img src={OkIcon} alt='OkIcon' />
                </div>
            </div>
        </Dialog >
    </>
}

export default Contact;