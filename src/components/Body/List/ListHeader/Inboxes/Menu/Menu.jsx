import React, { useState } from 'react';
import { IconButton, Divider, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import s from './Menu.module.scss';

const MenuList = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 

  const handleOpenEditInbox = () => {
    setAnchorEl(null);
    props.getInbox(props.id, props.showAlert, props.updateQueryBuilder, props.setColoring);
  };

  const handleOpenDeleteInbox = () => {
    setAnchorEl(null);
    props.deleteInbox(props.id, props.showAlert, props.inboxLists);
  };

  const setCurrentInbox = () => {
    props.updateSelectedInbox({
      id: props.id
    });
    setAnchorEl(null);
    props.updateShowInboxesDialog(false)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={s.iconButton}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled={props.type != 'user'} onClick={handleOpenEditInbox}>Редактировать</MenuItem>
        <MenuItem onClick={setCurrentInbox}>Применить</MenuItem>
        <MenuItem disabled={true}>Установить по умолчанию</MenuItem>
        <MenuItem disabled={true}>Отключить</MenuItem>
        <MenuItem disabled={true}>Поделиться с другими пользователями</MenuItem>
        <Divider />
        <MenuItem disabled={props.type != 'user'} onClick={handleOpenDeleteInbox}>УДАЛИТЬ</MenuItem>
      </Menu>
    </div>
  );
}

export default MenuList