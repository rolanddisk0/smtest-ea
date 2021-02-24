import { connect } from 'react-redux';
import Kpi from './Kpi';

let mapStateToProps = (state) => {
    return {
        kpiData: state.header.kpiData,
    }
}

export default connect(mapStateToProps, {})(Kpi);