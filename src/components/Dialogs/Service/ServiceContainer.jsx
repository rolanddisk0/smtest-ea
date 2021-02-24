import { getCI } from 'redux/dialogReducer';
import Service from './Service';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';
import React from 'react';

const ServiceContainer = (props) => {
    const getCI = (value, setDataIsLoading) => props.getCI(value, props.showAlert, setDataIsLoading);

    return <Service data={props.data} getCI={getCI} handleClose={props.handleClose} open={props.open} dataIsLoading={props.dataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
        data: state.dialog.serviceData,
    }
}

export default compose(
    connect(mapStateToProps, { getCI }),
    withAlert,
    withDialogWrapper
)(ServiceContainer);