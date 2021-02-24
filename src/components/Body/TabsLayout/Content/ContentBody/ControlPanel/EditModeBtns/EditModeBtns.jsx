import React from 'react';
import s from './EditModeBtns.module.scss';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';

const SaveButton = withStyles(() => ({
    root: {
        backgroundColor: green[600],
        '&:hover': {
            backgroundColor: green[800],
        },
    },
}))(Button);

const EditModeBtns = (props) => {
    const handleStopEditClick = () => props.deactivateEditMode();

    return <>
        <div className={s.editModeBtn}><Button variant='contained' color='secondary' fullWidth onClick={handleStopEditClick}>Отмена</Button></div>
        <div className={s.editModeBtn}><SaveButton variant='contained' color='primary' fullWidth type='submit'>Сохранить</SaveButton></div>
    </>
}

export default EditModeBtns;