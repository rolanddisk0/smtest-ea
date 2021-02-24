import Register from './Register';
import { connect } from 'react-redux';
import { signupUser } from 'redux/rootReducer';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
      userIsCreating: state.root.userIsCreating
    }
}

export default compose(connect(mapStateToProps, { signupUser }), withAlert)(Register);