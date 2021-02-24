import RMenuMore from './RMenuMore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import { withAlert } from 'hoc/withAlert';

let mapStateToProps = (state) => {
    return {
        data: state.rightMenu.moreDialog.data,
        totalCount: state.rightMenu.moreDialog.totalCount,
    }
}

export default compose(
    connect(mapStateToProps, {  }),
    withAlert,
    withDialogWrapper
)(RMenuMore);