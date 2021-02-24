import React from 'react';
import s from './HelpDialog.module.scss';
import commonHeaderStyle from '../../../Header.module.scss';
import HelpIcon from '@material-ui/icons/HelpOutline';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import { Dialog, DialogTitle, DialogContent, makeStyles } from '@material-ui/core';
import DitLogo from 'assets/logos/ditLogo.png';

const useStyles = makeStyles({
    root: {
        width: 40,
        height: 40
    }
});

const HelpDialog = (props) => {
    const classes = useStyles();
    const handleClose = () => props.handleClose();

    return <Dialog disableBackdropClick open={props.open} fullWidth={true} maxWidth='sm'>
        <DialogTitle id='form-dialog-title' className={s.title}>
            <HelpIcon classes={{ root: classes.root }} className={s.listIcon} />
                    Помощь
                </DialogTitle>
        <DialogContent>
            <div className={s.grid}>
                <div className={s.logoContainer}><img src={DitLogo} alt='DitLogo' className={s.ditLogo} /></div>
                <div>
                    <div>
                        <div>По вопросам технической поддержки обращаться:</div>
                        <div>E-mail: <a href='mailto:hpsm-HD@mos.ru'>hpsm-HD@mos.ru</a></div>
                        <div>Внутренний тел.: 77377</div>
                        <div>Городской тел.: +7 (495) 539-21-99</div>
                    </div>
                    <div className={s.links}>
                        <div><a href='https://sm.mos.ru/sm/docs/ext/orders.html' target='_blank'>Документация по системе</a></div>
                        <div><a href='https://sm.mos.ru/sm/docs/ext/archive.html' target='_blank'>Архив процессной документации</a></div>
                    </div>
                </div>
            </div>

        </DialogContent>
        <div className={s.actions}>
            <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
        </div>
    </Dialog>;
}

export default HelpDialog;

