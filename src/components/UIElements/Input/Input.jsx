
import React from 'react';
import s from './Input.module.scss';

const Input = (props) => {
  return <div className={s.div}>
    <input className={s.input} name={props.name} type={props.type} />
  </div>
}

export default Input;