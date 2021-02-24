import { logoutSuccess, signoutUser } from 'redux/rootReducer';
import UserMenu from './UserMenu';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAlert } from 'hoc/withAlert';
import { resetState as resetMainPageContentState } from 'redux/mainPageContentReducer';

let mapStateToProps = (state) => {
    return {
        user: state.root.user,
    }
}

export default compose(connect(mapStateToProps, { logoutSuccess, signoutUser, resetMainPageContentState }), withAlert)(UserMenu);