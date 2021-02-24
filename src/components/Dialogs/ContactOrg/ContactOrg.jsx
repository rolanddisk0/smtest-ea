import React from 'react';
import s from './ContactOrg.module.scss';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import shortid from 'shortid';
import { getCaption } from 'utils/captions';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';

//TODO: Этот диалог непонятно нужен будет или нет. Он почти одинаковый выходит с Адресом. Может слить их в один?
const ContactOrg = (props) => {
    const handleClose = () => props.handleClose();

    let dataElements = [];
    for (let key in props.data) {
        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.field}>{getCaption(key, 'contactOrg')}:</div>
                <div className={s.value}>{props.data[key]}</div>
            </React.Fragment>
        ];
    }

    return <Dialog open={props.open} fullWidth={true} maxWidth='sm'>
        <OverlaySpinner active={props.dataIsLoading}>
            <DialogTitle id='form-dialog-title' className={s.title}>
                <span className={s.title}>Организация</span>
            </DialogTitle>

            <DialogContent>
                <div className={s.grid}>
                    {dataElements}
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

export default ContactOrg;