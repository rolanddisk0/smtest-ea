import React from 'react';
import s from './OverlaySpinner.module.scss';
import LoadingOverlay from 'react-loading-overlay';

const OverlaySpinner = (props) => {
    const textElement = props.text || <div className={s.spinnerText}>Идет загрузка данных, пожалуйста, подождите...</div>;

    return <LoadingOverlay
        active={props.active}
        spinner
        text={textElement}
    >
        {props.children}
    </LoadingOverlay>
}

export default OverlaySpinner;