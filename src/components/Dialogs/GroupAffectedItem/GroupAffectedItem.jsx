import React, { useState } from 'react';
import s from './GroupAffectedItem.module.scss';
import { Dialog, DialogContent, TextField, Checkbox } from '@material-ui/core';
import OkIcon from 'assets/icons/OkIcon.svg';
import DialogLogo from 'assets/icons/GroupAffectedItemIcon.svg';
import shortid from 'shortid';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { getCaption } from 'utils/captions';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import DirectionContainer from 'components/Dialogs/Direction/DirectonContainer';

//Тут спешил успеть, возможно стоит разбить на подкомпоненты
const GroupAffectedItem = (props) => {
    const [showDirectionDialog, setShowDirectionDialog] = useState(false);
    const [directionDataIsLoading, setDirectionDataIsLoading] = useState(false);

    const directionClick = (target) => {
        setShowDirectionDialog(true);
        props.getDirection(target.textContent, setDirectionDataIsLoading);
    }

    const getValueElement = (key, value) => {
        switch (key) {
            case 'direction':
                return <LinkButton text={value} onClick={(e) => { directionClick(e.target) }} />;
            case 'name':
            case 'responsibleContact':
            case 'coord':
                return <TextField variant='outlined' disabled fullWidth size='small' defaultValue={value} />;
            case 'additionalInfo':
                return <TextField multiline rows={4} disabled variant='outlined' fullWidth defaultValue={value} size='small' />;
            case 'isBlocked':
                return <Checkbox checked={value} disabled />;
            case 'managers':
                return value.map(manager => <React.Fragment key={shortid.generate()}>
                    <div> </div>
                    <div><LinkButton text={manager} /></div>
                </React.Fragment>);
            default:
                return value;
        }
    }

    let firstSectionElements = [];
    for (let key in props.data) {
        firstSectionElements = [
            ...firstSectionElements,
            <React.Fragment key={shortid.generate()}>
                {key !== 'managers' && key !== 'additionalInfo'
                    ? <><div className={s.field}>{getCaption(key, 'groupAffectedItem')}:</div>
                        <div>{getValueElement(key, props.data[key])}</div></>
                    : null}

            </React.Fragment>
        ];
    }

    let managers = [];
    for (let key in props.data) {
        managers = [
            ...managers,
            <React.Fragment key={shortid.generate()}>
                {key === 'managers'
                    ? <><div> </div>
                        <div>{getValueElement(key, props.data[key])}</div></>
                    : null}

            </React.Fragment>
        ];
    }

    let afterManagers = [];
    for (let key in props.data) {
        afterManagers = [
            ...afterManagers,
            <React.Fragment key={shortid.generate()}>
                {key === 'additionalInfo'
                    ? <><div className={s.multilineField}>{getCaption(key, 'groupAffectedItem')}:</div>
                        <div>{getValueElement(key, props.data[key])}</div></>
                    : null}

            </React.Fragment>
        ];
    }

    const handleClose = () => props.handleClose();

    return <>
        <DirectionContainer open={showDirectionDialog} handleClose={() => setShowDirectionDialog(false)} dataIsLoading={directionDataIsLoading} />
        <Dialog disableBackdropClick open={props.open} fullWidth={true} maxWidth='md'>
            <DialogContent>
                <OverlaySpinner active={props.dataIsLoading}>
                    <div className={s.content}>
                        <div className={s.titleGrid}>
                            <div className={s.logoContainer}><img src={DialogLogo} alt='DialogLogo' className={s.dialogIcon} /></div>
                            <div className={s.title}>Группа услуг</div>
                        </div>
                        <div className={s.contentGrid}>
                            {firstSectionElements}
                        </div>
                        <div className={`${s.managersContainer} ${s.contentGrid}`}>
                            <div className={s.field}>Руководство по группе услуг:</div>
                            <div> </div>
                            {managers}
                        </div>
                        <div className={s.contentGrid}>
                            {afterManagers}
                        </div>
                    </div>
                </OverlaySpinner>
            </DialogContent>

            <div className={s.actions}>
                <div onClick={handleClose} className={s.homeIconContainer}><img src={OkIcon} alt='OkIcon' /></div>
            </div>
        </Dialog>
    </>
}

export default GroupAffectedItem;