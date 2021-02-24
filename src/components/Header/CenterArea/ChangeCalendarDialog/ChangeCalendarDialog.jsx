import React from 'react';
import s from './ChangeCalendarDialog.module.scss';
import commonHeaderStyle from '../../Header.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import HomeIcon from 'assets/icons/HomeIcon.svg';

const ChangeCalendarDialog = (props) => {
    const handleClose = () => props.handleClose();

    return (
        <Dialog disableBackdropClick open={props.open}>
            <DialogContent>
                <div>Change Calendar: в формате “диаграмма Ганта” отображение ЗНИ, заданий и исполнителей</div>
            </DialogContent>

            <div className={s.actions}>
                <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
            </div>
        </Dialog>
    );
}

export default ChangeCalendarDialog;