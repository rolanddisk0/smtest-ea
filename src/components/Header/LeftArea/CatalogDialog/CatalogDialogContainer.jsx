import { connect } from 'react-redux';
import CatalogDialog from './CatalogDialog';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';

let mapStateToProps = (state) => {
    return {
        
    }
}

export default compose(
    connect(mapStateToProps, { }),
    withDialogWrapper
)(CatalogDialog);