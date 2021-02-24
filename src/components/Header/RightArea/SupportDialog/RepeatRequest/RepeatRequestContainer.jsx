import React from 'react';
import RepeatRequest from './RepeatRequest';
import { connect } from 'react-redux';
import { compose } from 'redux';

const RepeatRequestContainer = (props) => {
    return <RepeatRequest onSendClick={props.onSendClick} dataList={props.repeatListData} createSdRepeatDataIsLoading={props.createSdRepeatDataIsLoading}/> 
}

let mapStateToProps = (state) => {
    return {
        repeatListData: state.header.createSdRepeatListData,
        createSdRepeatDataIsLoading: state.header.createSdRepeatDataIsLoading,
    }
}

export default compose(
    connect(mapStateToProps, {
       
    }),
)(RepeatRequestContainer);