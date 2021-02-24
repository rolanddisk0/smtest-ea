import Coloring from './Coloring';
import { connect } from 'react-redux';
import { updateColoring, addColoring } from 'redux/uiElements';

let mapStateToProps = (state) => {
    return {
      coloring: state.uiElements.coloring,
      queryBuilder: state.uiElements.queryBuilder,
      fields: state.list.fields
    }
}

export default connect(mapStateToProps, { updateColoring, addColoring })(Coloring);