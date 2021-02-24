import React from 'react'
import s from './Inbox.module.scss';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InboxDialogContainer from './InboxDialog/InboxDialogContainer';

const Inbox = props => {
  const handleOpen = () => props.updateShowInboxDialog(true);

  return (
    <>
      <IconButton aria-label='inbox' size='small' onClick={handleOpen} className={s.iconButton}>
        <AddIcon className={s.icon} />
      </IconButton>
      <InboxDialogContainer />
    </>
  )
}

export default Inbox
