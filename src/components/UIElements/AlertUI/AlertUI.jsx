import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const AlertUI = (props) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose();
  };
  
  return <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
    <Alert variant='filled' severity={props.severity} onClose={handleClose} >
      <AlertTitle>{props.title}</AlertTitle>
      {props.description}
    </Alert>
  </Snackbar>;
}

export default AlertUI;