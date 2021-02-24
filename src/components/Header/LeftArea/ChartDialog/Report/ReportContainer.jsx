import { connect } from 'react-redux';
import Report from './Report';

let mapStateToProps = (state) => {
    return {
        reportData: state.header.reportData,
    }
}

export default connect(mapStateToProps, {})(Report);