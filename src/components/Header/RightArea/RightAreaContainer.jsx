import React from 'react';
import RightArea from './RightArea';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
    getSdCreateList, setCreateSdDetailDataIsLoading, clearCreateSdAllLists, createSdDetailedDataClear, getLastCreatedSdList,
    setCreateSdRepeatDataIsLoading
} from 'redux/headerReducer';
import { updateCurrentRow } from 'redux/listReducer';
import { updateTabsHistory } from 'redux/mainPageContentReducer';
import history from 'redux/history';
//import { getCurrentRecordId } from 'utils/custom';

class RightAreaContainer extends React.Component {
    getSdCreateList = (listName, recordNewVals, isAsync = false) => {
        const maxRecords = isAsync ? 50 : 0; //Если isAsync, значит записей много и надо грузить их пачками. Иначе можем грузить все (max === 0 -> грузим все записи)
        return this.props.getSdCreateList('incidents', listName, recordNewVals, maxRecords).then(data => data);
    }

    goBack = () => {
        let histories = this.props.tabsHistory[this.props.activeRecord.historyId];
        const lastId = histories[histories.length - 1];
        histories.splice(histories.length - 1, 1);
        this.props.updateTabsHistory({
            ...this.props.tabsHistory,
            [this.props.activeRecord.historyId]: histories
        });
        this.props.updateCurrentRow({
            tabMode: 'existBack',
            key: lastId
        });
        history.push(`/index/module/${lastId}`);
    }

render() {
    const isGoBackActive = this.props.tabsHistory[this.props.activeRecord.historyId] && this.props.tabsHistory[this.props.activeRecord.historyId].length > 0;

    return (
        <RightArea isGoBackActive={isGoBackActive} goBack={this.goBack} 
            //isGoBackActive={this.state.isGoBackActive} 
            newAlertMarker={this.props.newAlertMarker} getSdTplList={this.getSdTplList}
            getSdCreateList={this.getSdCreateList} setCreateSdDetailDataIsLoading={this.props.setCreateSdDetailDataIsLoading}
            clearCreateSdAllLists={this.props.clearCreateSdAllLists} createSdDetailedDataClear={this.props.createSdDetailedDataClear}
            getLastCreatedSdList={this.props.getLastCreatedSdList} setCreateSdRepeatDataIsLoading={this.props.setCreateSdRepeatDataIsLoading} />
    )
}
}

let mapStateToProps = (state) => {
    //const currentRecordId = getCurrentRecordId(state.mainPageContent.tabs);

    return {
        newAlertMarker: state.header.newAlertMarker,
        currentRow: state.list.currentRow,
        activeRecord: state.mainPageContent.activeRecord,
        tabsHistory: state.mainPageContent.tabsHistory
    }
}

export default compose(
    connect(mapStateToProps, {
        getSdCreateList, setCreateSdDetailDataIsLoading, clearCreateSdAllLists, createSdDetailedDataClear, getLastCreatedSdList,
        setCreateSdRepeatDataIsLoading, updateCurrentRow, updateTabsHistory
    }),
    withRouter
)(RightAreaContainer);