import React from 'react';
import s from './AlertDialog.module.scss';
import commonHeaderStyle from '../../Header.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import AlertItem from './AlertItem/AlertItem';
import shortid from 'shortid';

const AlertDialog = (props) => {
    const handleClose = () => props.handleClose();

    let alertsElements = props.alerts.map(item => <AlertItem key={shortid.generate()} data={item} handleItemChange={props.alertExpandedChange}
        handleClose={props.handleClose} deleteAlert={props.deleteAlert} alertRead={props.alertRead}
        showAlert={props.showAlert} getContent={props.getContent} />
    );

    if (alertsElements.length === 0) { alertsElements = <div style={{ width: '100%' }}>У вас нет новых оповещений</div> }

    return (
        <Dialog disableBackdropClick open={props.open}>
            <DialogContent>
                {alertsElements}
            </DialogContent>

            <div className={s.actions}>
                <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
            </div>
        </Dialog>
    );
}

export default AlertDialog;