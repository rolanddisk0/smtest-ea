import { getDataMoreList } from 'redux/rightMenuReducer';
import { getDirection, getGroupAffectedItem, getCI, getService } from 'redux/dialogReducer';
import ContentRightMenu from './ContentRightMenu';
import { connect } from 'react-redux';
import { withAlert } from 'hoc/withAlert';
import { compose } from 'redux';
import React from 'react';

const ContentRightMenuContainer = (props) => {
  const getDirection = (value, setDataIsLoading) => props.getDirection(value, props.showAlert, setDataIsLoading);
  const getGroupAffectedItem = (value, setDataIsLoading) => props.getGroupAffectedItem(value, props.showAlert, setDataIsLoading);
  const getCI = (value, setDataIsLoading) => props.getCI(value, props.showAlert, setDataIsLoading);
  const getService = (value, setDataIsLoading) => props.getService(value, props.showAlert, setDataIsLoading);

  //Если maxCount = 0, то грузим все
  const getMoreData = (title, setMoreDataIsLoading, maxCount = 0) => props.getDataMoreList(props.showAlert, setMoreDataIsLoading, props.recordId, title, maxCount);

  return <ContentRightMenu rightSliderMenuData={props.rightSliderMenuData}
    getDirection={getDirection} getGroupAffectedItem={getGroupAffectedItem} getCI={getCI} getService={getService} contentIsLoading={props.contentIsLoading}
    moreDialogTitle={props.moreDialogTitle} moreDialogData={props.moreDialogData} getMoreData={getMoreData} />
}

let mapStateToProps = (state, props) => { 
  const recordId = state.mainPageContent.content[state.mainPageContent.activeRecord.id] ? state.mainPageContent.activeRecord.id : 'empty';;

  return {
    rightSliderMenuData: state.mainPageContent.content[recordId].rightSliderMenuData,
    moreDialogTitle: state.rightMenu.moreDialog.title,
    moreDialogData: state.rightMenu.moreDialog.data,
    recordId: state.mainPageContent.content[recordId].headerItems.number.value,
    contentIsLoading: state.mainPageContent.contentIsLoading,
    content: state.mainPageContent.content
  }
}

export default compose(
  connect(mapStateToProps, {
    getDirection, getGroupAffectedItem, getCI, getService, getDataMoreList
  }),
  withAlert
)(ContentRightMenuContainer);