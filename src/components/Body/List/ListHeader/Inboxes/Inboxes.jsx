import React from 'react'
import s from './Inboxes.module.scss';
import Button from '@material-ui/core/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import { ReactComponent as InboxLogo } from 'assets/listHeader/InboxIcon.svg';
import { ReactComponent as ListIcon } from 'assets/icons/ListIcon.svg';
import InboxListsContainer from './InboxLists/InboxListsContainer';
import { viewNameMapping } from 'utils/custom';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';

const useStyles = makeStyles({
  root: {
    color: 'white',
    fontSize: '1rem'
  }
});

const Inboxes = (props) => {
  const classes = useStyles();
  const handleOpen = () => {
    props.getInboxList(props.user, props.selectedTodo, props.showAlert);
  }

  const handleClose = () => props.updateShowInboxesDialog(false);

  return (
    <>
      <IconButton aria-label='inbox' size='small' onClick={handleOpen} classes={{ root: classes.root }} className={s.iconButton}>
        <InboxLogo className={s.icon} />{props.selectedInbox.name}
      </IconButton>
      <Dialog
        open={props.showInboxesDialog}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth={false}
      >
        <DialogTitle id='form-dialog-title' className={s.title}>
          <ListIcon className={s.listIcon} />
            Представления ({viewNameMapping[props.selectedTodo]})
          </DialogTitle>
        <DialogContent>
          <OverlaySpinner active={props.inboxListsIsLoading}>
            <InboxListsContainer inboxLists={props.inboxLists} />
          </OverlaySpinner>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Inboxes
