import React from 'react';
import s from './CatalogDialog.module.scss';
import commonHeaderStyle from '../../Header.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import CatalogIcon from 'assets/headerImgs/Catalog.svg';
import LinkButton from '../../../UIElements/LinkButton/LinkButton';

const CatalogDialog = (props) => {
    const handleClose = () => props.handleClose();

    return (
        <Dialog disableBackdropClick open={props.open}>
            <DialogContent>
                <div className={s.header}>
                    <img src={CatalogIcon} alt='CatalogIcon' className={s.dialogIcon} />
                    <div className={s.title}>Справочники</div>
                </div>
                <ul>
                    <li className={s.list}>
                        <LinkButton text='CMDB' />
                    </li>
                    <ul>
                        <li>
                            <LinkButton text='Информационная система (ИС)' />
                        </li>
                        <li>
                            <LinkButton text='Сервер' />
                        </li>
                        <li>
                            <LinkButton text='...' />
                        </li>
                    </ul>
                    <li className={s.list}>
                        <LinkButton text='Классификация' />
                    </li>
                    <ul>
                        <li>
                            <LinkButton text='Продукт' />
                        </li>
                        <li>
                            <LinkButton text='Направление' />
                        </li>
                        <li>
                            <LinkButton text='Группа услуг' />
                        </li>
                        <li>
                            <LinkButton text='Услуга' />
                        </li>
                        <li>
                            <LinkButton text='Сервис' />
                        </li>
                    </ul>
                </ul>
            </DialogContent>

            <div className={s.actions}>
                <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
            </div>
        </Dialog>
    );
}

export default CatalogDialog;