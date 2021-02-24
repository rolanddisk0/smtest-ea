import React from 'react'
import s from './Download.module.scss';
import Button from '@material-ui/core/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import LinearProgressWithLabel from 'components/UIElements/LinearProgressWithLabel/LinearProgressWithLabel';
import io from 'socket.io-client';

const DownloadDialog = props => {
  const handleClose = () => {
    props.excelLoading.cancelTokenSource.cancel('Operation canceled by the user.');
    props.updateExcelLoading({
      ...props.excelLoading,
      progressCount: 0,
      isLoading: false
    })
    //let socket = io('http://localhost:4008?clientId=' + props.user.clientId); //, { transport : ['websocket'] }
    //socket.emit('closeExcel', {lang: 'js'});
  }
  const progress = Math.round(props.excelLoading.progressCount * 100 / props.selectedInbox.itemsCount);

  return <Dialog
    open={props.excelLoading.isLoading}
    onClose={handleClose}
    aria-labelledby='form-dialog-title'
    maxWidth={false}
  >
    <DialogTitle id='form-dialog-title' className={s.title}>
      Выгрузка в файл
          </DialogTitle>
    <DialogContent>
      <LinearProgressWithLabel value={progress} currentCount={props.excelLoading.progressCount} totalCount={props.selectedInbox.itemsCount} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color='primary'>
        Отмена
          </Button>
    </DialogActions>
  </Dialog>;
}

export default DownloadDialog
