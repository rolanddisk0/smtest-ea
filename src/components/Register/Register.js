import React from 'react';
import s from './Register.module.scss';
import { Card, CardActions, Button, makeStyles, TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import OverlaySpinner from '../UIElements/OverlaySpinner/OverlaySpinner';

const useStyles = makeStyles({
  rootButton: {
    backgroundColor: '#D28107',
    color: '#FFFBFB',
    '&:hover': {
      backgroundColor: '#5D78BE',
    }
  },
  rootCard: {
    backgroundColor: 'var(--colorMainDarkGrey)',
    color: '#FFFBFB'
  },
  input: {
    backgroundColor: 'white'
  }
});

const TextFieldControl = ({ input, meta, multiline, rows, mandatory, ...props }) => {
  const classes = useStyles();
  const hasError = meta.touched && meta.error;
  multiline = multiline || false;
  rows = rows || 4;

  return <TextField {...input} {...props} error={hasError} label={hasError} variant='outlined' size='small'  
      multiline={multiline} rows={rows} 
      InputProps={{
          classes: { root: classes.input },
        }}
      />
}

const RegisterForm = (props) => {
  const classes = useStyles();

  return (
    <form onSubmit={props.handleSubmit}>
      <Card classes={{ root: classes.rootCard }} className={s.card}>
        <OverlaySpinner active={props.userIsCreating} text='Регистрация..'>
          <div className={s.content}>
            <div>Логин</div>
            <Field name='login' component={TextFieldControl} placeholder='Логин' />
            <div>Пароль</div>
            <Field name='password' type='password' component={TextFieldControl} placeholder='Пароль' />
            <div>Логин (HPSM)</div>
            <Field name='hpsmLogin' component={TextFieldControl} placeholder='Логин (HPSM)' />
            <div>Пароль (HPSM)</div>
            <Field name='hpsmPassword' type='password' component={TextFieldControl} placeholder='Пароль (HPSM)' />
            <CardActions>
              <Button size='medium' type='submit' classes={{ root: classes.rootButton }}>Зарегистрироваться</Button>
            </CardActions>
            <NavLink to='/login'>Вход</NavLink>
          </div>
        </OverlaySpinner>
      </Card>
    </form>
  );
}

let RegisterReduxForm = reduxForm({ form: 'registerForm', enableReinitialize: true })(RegisterForm)

const Register = (props) => {
  const onSubmit = (formData) => {
    props.signupUser(formData, props.showAlert);
  }

  return <RegisterReduxForm onSubmit={onSubmit} userIsCreating={props.userIsCreating} />
}

export default Register;


