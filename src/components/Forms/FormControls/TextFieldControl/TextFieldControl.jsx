import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
      backgroundColor: 'white'
    }
  });

export const TextFieldControl = ({ input, meta, multiline, rows, mandatory, fullWidth, isDisabled, ...props }) => {
    const classes = useStyles();
    const hasError = meta.touched && meta.error;
    multiline = multiline || false;
    rows = rows || 4;
    fullWidth = fullWidth !== undefined ? fullWidth : true;
    isDisabled = isDisabled || false;

    return <TextField {...input} {...props} error={hasError ? true : false} label={hasError} variant='outlined' fullWidth={fullWidth} size='small'  
        multiline={multiline} rows={rows} disabled={isDisabled}
        InputProps={{
            classes: { root: classes.input },
          }}
        />
}