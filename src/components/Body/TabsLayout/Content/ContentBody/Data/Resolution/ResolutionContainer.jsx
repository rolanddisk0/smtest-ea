import Resolution from './Resolution';
import { connect } from 'react-redux';

let mapStateToProps = (state, props) => {
    return {
        resolutionData: state.mainPageContent.content[props.id].resolutionData,
        feedbackData: state.mainPageContent.content[props.id].feedbackData,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        closeMarkList: state.root.globalVariables.closeMarkList,
        editModeLists: state.mainPageContent.editModeLists,
    }
}

export default connect(mapStateToProps, {})(Resolution);