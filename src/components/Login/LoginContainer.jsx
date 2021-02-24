import { signinUser } from '../../redux/rootReducer';
import Login from './Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAlert } from 'hoc/withAlert';

let mapStateToProps = (state) => {
    return {
      user: state.root.user,
      userIsLogging: state.root.userIsLogging
    }
}

export default compose(connect(mapStateToProps, { signinUser }), withAlert)(Login);