import QueryBuilder from './QueryBuilder';
import { connect } from 'react-redux';
import { updateQueryBuilder } from 'redux/uiElements';

let mapStateToProps = (state) => {
    return {
        queryBuilder: state.uiElements.queryBuilder,
        fields: state.list.fields
    }
}

export default connect(mapStateToProps, { updateQueryBuilder })(QueryBuilder);