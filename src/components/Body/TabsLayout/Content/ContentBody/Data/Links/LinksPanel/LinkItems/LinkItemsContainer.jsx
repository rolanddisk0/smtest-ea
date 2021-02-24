import LinkItems from './LinkItems';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFilenameById } from 'utils/custom';
import React from 'react';
import { updateCurrentRow } from 'redux/listReducer';

const LinkItemsContainer = (props) => {
    const data = props.data.map(item => ({
        ...item,
        filename: item.filename = getFilenameById(item.number)
    }));

    return <LinkItems data={data} {...props.getDataProps} updateCurrentRow={props.updateCurrentRow} />;
}

let mapStateToProps = (state) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, { updateCurrentRow }),
)(LinkItemsContainer);

