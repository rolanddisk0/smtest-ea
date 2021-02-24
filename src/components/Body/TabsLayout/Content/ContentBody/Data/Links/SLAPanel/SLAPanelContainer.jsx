import SLAPanel from './SLAPanel';
import { connect } from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state, props) => {
    return {
        slaData: state.mainPageContent.content[props.id].slaData,
    }
}

export default compose(
    connect(mapStateToProps, { }),
)(SLAPanel);