import React, { useState } from 'react';
import s from './Service.module.scss';
import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import { ReactComponent as ServiceIcon } from 'assets/headerImgs/Workflow.svg';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { getCaption } from 'utils/captions';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import CIContainer from 'components/Dialogs/CI/CIContainer';

const Service = (props) => {
    const [showAffectedItemDialog, setShowAffectedItemDialog] = useState(false);
    const [affectedItemDataIsLoading, setAffectedItemDataIsLoading] = useState(false);

    const handleClose = () => props.handleClose();
    const affectedItemClick = (target) => {
        setShowAffectedItemDialog(true);
        props.getCI(target.textContent, setAffectedItemDataIsLoading);
    }

    return <>
        <CIContainer open={showAffectedItemDialog} handleClose={() => setShowAffectedItemDialog(false)} dataIsLoading={affectedItemDataIsLoading} 
            setCIDataIsLoading={setAffectedItemDataIsLoading} />
        <Dialog disableBackdropClick open={props.open}>
            <DialogTitle id='form-dialog-title' className={s.title}>
                <ServiceIcon className={s.listIcon} />
            Сервис
        </DialogTitle>
            <DialogContent>
                <OverlaySpinner active={props.dataIsLoading}>
                    <div className={s.grid}>
                        <div className={s.fieldNames}>
                            {getCaption('affectedItem', 'service')}
                        </div>
                        <div className={s.noOverflowTextContainer}>
                            <LinkButton text={props.data.affectedItem} onClick={(e) => { affectedItemClick(e.target) }} />
                        </div>
                        <div className={s.fieldNames}>
                            {getCaption('service', 'service')}
                        </div>
                        <div className={s.noOverflowTextContainer}>
                            <TextField variant='outlined' disabled fullWidth size='small' value={props.data.service} />
                        </div>
                        <div className={s.fieldNames}>
                            {getCaption('affectedCIs', 'service')}
                        </div>
                        <div className={s.noOverflowTextContainer}>
                            <ul className={s.list}>
                                {props.data.affectedCIs.map((ci, index) => (
                                    <li key={ci}>
                                        <LinkButton text={ci} />
                                    </li>
                                ))}
                                <li key={'more'} className={s.listItem}>Ещё..</li>
                            </ul>
                        </div>
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

export default Service;