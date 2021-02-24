

import React from 'react';
import s from './LinkButton.module.scss';

const LinkButton = (props) => {
    return <button className={s.btn} name={props.name} onClick={props.onClick}>
        <div className={`${s.btnText} ${props.noWrap ? s.noWrap : null}`}>{props.text}</div>
    </button>;
}

export default LinkButton;