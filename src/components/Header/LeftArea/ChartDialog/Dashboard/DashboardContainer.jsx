import { connect } from 'react-redux';
import Dashboard from './Dashboard';

let mapStateToProps = (state) => {
    return {
        dashboardData: state.header.dashboardData,
    }
}

export default connect(mapStateToProps, {})(Dashboard);