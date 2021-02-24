import InboxItems from './InboxItems';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
      selectedInbox: state.list.selectedInbox
    }
}

export default connect(mapStateToProps, {  })(InboxItems);