import LeftArea from './LeftArea';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        newMessageMarker: state.header.newMessageMarker,
    }
}

export default connect(mapStateToProps, { })(LeftArea);