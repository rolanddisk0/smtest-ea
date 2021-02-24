import Home from './Home';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
      user: state.root.user
    }
}

export default connect(mapStateToProps, {})(Home);