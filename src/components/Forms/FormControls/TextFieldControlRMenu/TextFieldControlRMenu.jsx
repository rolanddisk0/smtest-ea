import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import s from './TextFieldControlRMenu.module.scss';

//NOTE: Пока что есть подозрение, что элемент может отличаться от того, что используется в SMAction. Поэтому он отдельный. Если будет такой-же, то удалить его

const useStyles = makeStyles({
  input: {
    backgroundColor: 'white'
  }
});

export const TextFieldControlRMenu = ({ input, meta, multiline, rows, mandatory, fullWidth, ...props }) => {
  const classes = useStyles();
  const hasError = meta.touched && meta.error;
  multiline = multiline || false;
  rows = rows || 4;
  fullWidth = fullWidth !== undefined ? fullWidth : true;

  return <TextField {...input} {...props} error={hasError ? true : false} label={hasError} variant='outlined' fullWidth={fullWidth} size='small'
    multiline={multiline} rows={rows}
    InputProps={{
      classes: { root: classes.input },
    }}
  />
}