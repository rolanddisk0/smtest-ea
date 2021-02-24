import MoreMenu from './MoreMenu';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getExcel } from 'redux/listReducer';

let mapStateToProps = (state) => {
    return {
      selectedInbox: state.list.selectedInbox,
      user: state.root.user
    }
}

export default compose(
  connect(mapStateToProps, { getExcel }),
)(MoreMenu);