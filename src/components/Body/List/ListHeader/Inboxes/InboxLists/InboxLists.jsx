import React from 'react';
import InboxItemsContainer from '../InboxItems/InboxItemsContainer';
import InboxContainer from '../Inbox/InboxContainer'

const InboxLists = (props) => {

  return <div>
    <InboxItemsContainer header='Мои представления' type='user' data={props.inboxLists.myInboxData} />
    <InboxContainer />
    <InboxItemsContainer header='Общесистемные представления' type='system' data={props.inboxLists.systemInboxData} />
    <InboxItemsContainer header='Представления других пользователей' type='other' data={props.inboxLists.otherInboxData} />
  </div>
}

export default InboxLists;