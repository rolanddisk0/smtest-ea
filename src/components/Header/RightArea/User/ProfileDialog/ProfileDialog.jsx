import React, { useState } from 'react';
import s from './ProfileDialog.module.scss';
import commonHeaderStyle from '../../../Header.module.scss';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import { Dialog, DialogTitle, DialogContent, Tab, Tabs } from '@material-ui/core';
import Fields from 'components/UIElements/Fields/Fields';
import { ReactComponent as DirectionIcon } from 'assets/icons/DirectionIcon.svg';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';

const ProfileDialog = (props) => {
    const [value, setValue] = useState(0);
    const handleClose = () => props.handleClose();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Dialog disableBackdropClick open={props.open}>
                <DialogTitle id='form-dialog-title' className={s.title}>
                    <DirectionIcon className={s.listIcon} />
                    Настройки пользователя
                </DialogTitle>
                <DialogContent>
                    <Fields data={{ name: props.user.name, role: props.user.role }} captionArea='userProfile' />
                    <div className={s.contentGrid}>
                        <div className={s.tabs}>
                            <Tabs
                                orientation='vertical'
                                variant='scrollable'
                                aria-label='Vertical tabs inbox'
                                value={value}
                                onChange={handleChange}
                            >
                                <Tab label='Основная информация' {...TabProps(0)} classes={{ selected: s.selected }} />
                                <Tab label='Безопасность' {...TabProps(1)} classes={{ selected: s.selected }} />
                                <Tab label='Настройки из ITSM-истемы' {...TabProps(2)} classes={{ selected: s.selected }} />
                            </Tabs>
                        </div>
                        <div className={s.panels}>
                            <TabPanel value={value} index={0}>
                                - стартовая страница (пользователь сам выбрать может)
                        </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ul className={s.list}>
                                    Группы безопасности:
                                    {props.user.scaccess.map(group => {
                                        return <li key={group}>
                                            {group}
                                        </li>
                                    })}
                                </ul>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Настройки из ITSM-истемы
                    </TabPanel>
                        </div>
                    </div>
                </DialogContent>
                <div className={s.actions}>
                    <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
                </div>
            </Dialog>
        </>
    );
}

export default ProfileDialog;

