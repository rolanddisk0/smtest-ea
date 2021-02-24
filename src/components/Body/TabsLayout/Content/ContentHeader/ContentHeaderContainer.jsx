import ContentHeader from './ContentHeader';
import { connect } from 'react-redux';

let mapStateToProps = (state, props) => {
    return {
        headerItems: state.mainPageContent.content[props.id].headerItems,
        slaData: state.mainPageContent.content[props.id].slaData,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        categoryList: state.root.globalVariables.categoryList,
        priorityList: state.root.globalVariables.priorityList,
    }
}

export default connect(mapStateToProps, {})(ContentHeader);