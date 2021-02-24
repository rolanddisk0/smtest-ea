import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grow, Popper, Menu, MenuItem, Paper, ClickAwayListener } from '@material-ui/core';
import s from './ContextMenu.module.scss';

const ContextMenu = (props) => {
  const history = useHistory();
  const handleClose = () => {
    props.setContextMenuData({
      data: null,
      mouseX: null,
      mouseY: null
    });
  };
  const openInternalTab = () => {
    const key = props.contextMenuData.data.dataset.unique_key;
    props.updateCurrentRow({
      tabMode: 'new',
      key: key
    });
    history.push(`/index/${props.selectedTodo}/${key}`);
    props.setContextMenuData({
      data: null,
      mouseX: null,
      mouseY: null
    });
  };
  const openBrowserTab = () => {
    const key = props.contextMenuData.data.dataset.unique_key;
    props.updateCurrentRow({
      tabMode: 'new',
      key: key
    });
    window.open(`/index/${props.selectedTodo}/${key}`);
    props.setContextMenuData({
      data: null,
      mouseX: null,
      mouseY: null
    });
  };

  return <Menu
    keepMounted
    anchorEl={props.contextMenuData.data}
    open={Boolean(props.contextMenuData.data)}
    onClose={handleClose}
    anchorReference='anchorPosition'
    anchorPosition={
      props.contextMenuData.mouseY !== null && props.contextMenuData.mouseX !== null
        ? { top: props.contextMenuData.mouseY, left: props.contextMenuData.mouseX }
        : undefined
    }
  >
    <MenuItem onClick={openInternalTab}>Открыть в новом табе</MenuItem>
    <MenuItem onClick={openBrowserTab}>Открыть в новой вкладке</MenuItem>
  </Menu>
}

export default ContextMenu

/*
    <Menu
      anchorEl={props.contextMenuData}
      open={Boolean(props.contextMenuData)}
      onClose={handleClose}
    >
      <MenuItem onClick={openInternalTab}>Открыть в новом табе</MenuItem>
      <MenuItem onClick={openBrowserTab}>Открыть в новой вкладке</MenuItem>
    </Menu>
    */

/*
<ClickAwayListener onClickAway={handleClose} >
  <Popper open={Boolean(props.contextMenuData)} anchorEl={props.contextMenuData} placement={'bottom-end'} disablePortal transition className={s.menu}>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
      >
        <Paper>
          <Menu
            anchorEl={props.contextMenuData}
            open={Boolean(props.contextMenuData)}
            onClose={handleClose}
          >
            <MenuItem onClick={openInternalTab}>Открыть в новом табе</MenuItem>
            <MenuItem onClick={openBrowserTab}>Открыть в новой вкладке</MenuItem>
          </Menu>
        </Paper>
      </Grow>
    )}
  </Popper>
</ClickAwayListener >*/