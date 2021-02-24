import React from 'react';
import { TextField } from '@material-ui/core';

export const DatePickerControl = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    
    return <TextField {...input} {...props} error={hasError} label={hasError || 'Выберите дату'} variant='outlined' fullWidth size='small' 
        type='datetime-local' InputLabelProps={{ shrink: true }} />
}