import React, { useState } from 'react';
import s from './UserMenu.module.scss';
import commonHeaderStyle from '../../../Header.module.scss';
import { Grow, Popper, MenuItem, MenuList, Paper, Divider, ClickAwayListener } from '@material-ui/core';
import ProfileIcon from 'assets/headerImgs/Profile.svg';
import ProfileDialogContainer from '../ProfileDialog/ProfileDialogContainer';
import HelpDialogContainer from '../HelpDialog/HelpDialogContainer';

const UserMenu = (props) => {
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [showHelpDialog, setShowHelpDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleProfileClick = (event) => {
        setShowProfileDialog(true);
        setAnchorEl(null);
    };
    const handleLogoutClick = () => {
        props.signoutUser(props.showAlert, props.resetMainPageContentState);
    }
    const handleHelpClick = (event) => {
        setShowHelpDialog(true);
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ProfileDialogContainer open={showProfileDialog} handleClose={() => setShowProfileDialog(false)} />
            <HelpDialogContainer open={showHelpDialog} handleClose={() => setShowHelpDialog(false)} />
            <ClickAwayListener onClickAway={handleClose}>
                <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.round} 
                    ${commonHeaderStyle.clickable}`} onClick={handleToggle}
                >
                    <img src={ProfileIcon} alt='ProfileIcon' />
                    <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} disablePortal transition className={s.menu}>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <MenuList autoFocusItem={open}>
                                        <MenuItem onClick={handleProfileClick}>{props.user.name}</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleProfileClick}>Профиль</MenuItem>
                                        <MenuItem onClick={handleHelpClick}>Помощь</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleLogoutClick}>Выход</MenuItem>
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </ClickAwayListener>
        </>
    );
}

export default UserMenu;

