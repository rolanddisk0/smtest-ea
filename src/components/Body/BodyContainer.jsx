import Body from './Body';
import { connect } from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
      contentIsLoading: state.mainPageContent.contentIsLoading
    }
}

export default compose(
    connect(mapStateToProps, {  })
)(Body);