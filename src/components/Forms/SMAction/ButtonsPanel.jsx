import React from 'react';
import s from './ButtonsPanel.module.scss';
import { Button } from '@material-ui/core';

export const ButtonsPanel = (props) => {
    return <div className={s.actions}>
        <div><Button variant='outlined' color='secondary' onClick={() => props.handleClose()}>Отменить</Button></div>
        <div><Button variant='contained' color='primary' type='submit'>{props.smAction}</Button></div>
    </div>
}