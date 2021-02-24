import React from 'react';
import s from './ScheduleDialog.module.scss';
import commonHeaderStyle from '../../Header.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import ScheduleIcon from 'assets/headerImgs/Schedule.svg';
import LinkButton from '../../../UIElements/LinkButton/LinkButton';

const ScheduleDialog = (props) => {
    const handleClose = () => props.handleClose();

    return (
        <Dialog disableBackdropClick open={props.open}>
            <DialogContent>
                <div className={s.header}>
                    <img src={ScheduleIcon} alt='CatalogIcon' className={s.dialogIcon} />
                    <div className={s.title}>Сервисное событие</div>
                </div>
                <ul className={s.list}>
                    <li>
                        <LinkButton text='Обращение' />
                    </li>
                    <li>
                        <LinkButton text='Инцидент' />
                    </li>
                    <li>
                        <LinkButton text='Запрос на изменение (ЗНИ)' />
                    </li>
                    <li>
                        <LinkButton text='Задание по ЗНИ' />
                    </li>
                    <li>
                        <LinkButton text='Проблема' />
                    </li>
                    <li>
                        <LinkButton text='Задание по Проблеме' />
                    </li>
                </ul>
            </DialogContent>

            <div className={s.actions}>
                <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
            </div>
        </Dialog>
    );
}

export default ScheduleDialog;