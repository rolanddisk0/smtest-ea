import React from 'react';
import s from './ContactLoc.module.scss';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import { getCaption } from 'utils/captions';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';

const ContactLoc = (props) => {
    const handleClose = () => props.handleClose();

    return <Dialog open={props.open} fullWidth={true} maxWidth='sm'>
        <OverlaySpinner active={props.dataIsLoading}>
            <DialogTitle id='form-dialog-title' className={s.title}>
                <span className={s.title}>Адрес</span>
            </DialogTitle>

            <DialogContent>
                <div className={s.grid}>
                    <div className={s.field}>{getCaption('location', 'contactLoc')}:</div>
                    <div className={s.value}>
                        <span>{props.data.location}</span>
                        {props.data.location
                            && <span className={s.onMapText}><a href={`https://maps.google.com/?q=${props.data.location}`} target='_blank'>На карте</a></span>}
                    </div>
                    <div className={s.field}>{getCaption('region', 'contactLoc')}:</div>
                    <div className={s.value}>{props.data.region}</div>
                    <div className={s.field}>{getCaption('district', 'contactLoc')}:</div>
                    <div className={s.value}>{props.data.district}</div>
                </div>
            </DialogContent>
        </OverlaySpinner>

        <div className={s.actions}>
            <div onClick={handleClose}>
                <img src={OkIcon} alt='OkIcon' />
            </div>
        </div>
    </Dialog >
}

export default ContactLoc;