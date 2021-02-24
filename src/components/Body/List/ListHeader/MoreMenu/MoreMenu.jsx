import React, { useState } from 'react';
import s from './MoreMenu.module.scss';
import { Grow, Popper, MenuItem, MenuList, Paper, ClickAwayListener, IconButton } from '@material-ui/core';
import { ReactComponent as MenuIconLogo } from 'assets/listHeader/MenuIconWhite.svg';
import DownloadContainer from '../Download/DownloadContainer';

const UserMenu = (props) => {
    const [showDownloadDialog, setShowDownloadDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleDownloadClick = (event) => {
        setShowDownloadDialog(true);
        props.getExcel(props.selectedInbox, props.user);
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <DownloadContainer open={showDownloadDialog} handleClose={() => setShowDownloadDialog(false)} />
            <ClickAwayListener onClickAway={handleClose}>
                <div onClick={handleToggle}
                >
                    <IconButton aria-label='search' size='small' className={s.iconButton}>
                      <MenuIconLogo className={s.icon} />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} disablePortal transition className={s.menu}>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <MenuList autoFocusItem={open}>
                                        <MenuItem onClick={handleDownloadClick}>Выгрузить в xlsx</MenuItem>
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

