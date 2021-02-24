import React from 'react';
import s from './Body.module.scss';
import ListContainer from './List/ListContainer';
import TabsLayoutContainer from './TabsLayout/TabsLayoutContainer';
import ContentRightMenuContainer from './TabsLayout/Content/ContentRightMenu/ContentRightMenuContainer';
import SplitPane from 'react-split-pane';

const Body = (props) => {
  return <>
    <SplitPane split='vertical' defaultSize={650} minSize={450} className={s.grid}>
      <ListContainer />
        <TabsLayoutContainer />
    </SplitPane>
    <ContentRightMenuContainer />
  </>
}

export default Body;