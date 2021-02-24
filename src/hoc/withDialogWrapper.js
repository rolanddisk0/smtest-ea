import React from 'react';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        //В HOC можем получить данные из стора
    }
}

export const withDialogWrapper = (Component) => {
    const DialogComponent = (props) => {
        if (!props.open) { return null; }
        return <Component {...props} />
    }

    return connect(mapStateToProps)(DialogComponent);
}