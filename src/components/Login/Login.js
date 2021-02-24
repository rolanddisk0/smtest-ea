
import React from 'react';
import s from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { Card, CardActions, Button, makeStyles, TextField, InputAdornment, CardContent } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ReactComponent as HumanIcon } from 'assets/icons/HumanIcon.svg';
import { ReactComponent as LockIcon } from 'assets/icons/LockIcon.svg';
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

// данные о пользователе храним в коде
const Login = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = data => {
    props.signinUser(data, props.showAlert);
  };
  const validation = (value) => {
    return true; //value === 'test';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card classes={{ root: classes.rootCard }} className={s.card}>
        <OverlaySpinner active={props.userIsLogging} text='Осуществление входа в систему'>
          <div className={s.content}>
            <div className={s.title}>Введите логин и пароль. ЭТО НОВЫЙ POD. ТЕСТ деплоя новой версии. ЕА.</div>
            <div>
              <TextField name='login' placeholder='логин' variant='outlined' required size='small'
                inputRef={register({ validate: { invalid: validation } })}
                InputProps={{
                  classes: { root: classes.input },
                  endAdornment: (
                    <InputAdornment>
                      <HumanIcon />
                    </InputAdornment>
                  )
                }}
              />
              {errors.login && errors.login.type === 'invalid' && <p>Неверный логин</p>}
            </div>
            <div>
              <TextField name='password' placeholder='пароль' type='password' variant='outlined' required size='small'
                inputRef={register({ validate: { invalid: validation } })}
                InputProps={{
                  classes: { root: classes.input },
                  endAdornment: (
                    <InputAdornment>
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
              />
              {errors.password && errors.password.type === 'invalid' && <p>Неверный пароль</p>}
            </div>
            <CardActions>
              <Button size='medium' type='submit' classes={{ root: classes.rootButton }}>Войти</Button>
            </CardActions>
            <NavLink to='/register'>Регистрация</NavLink>
          </div>
        </OverlaySpinner>
      </Card>
    </form>
  );
}

export default Login;


