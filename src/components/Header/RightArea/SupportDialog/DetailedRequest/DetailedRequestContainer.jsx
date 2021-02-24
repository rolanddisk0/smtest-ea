import React from 'react';
import DetailedRequest from './DetailedRequest';
import { getSdTplData, getSdCreateList, clearCreateSdLists } from 'redux/headerReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

const DetailedRequestContainer = (props) => {
    const getSdTplData = tplName => props.getSdTplData(tplName).then(data => data);

    const getSdCreateList = (listName, recordNewVals, isAsync = false) => {
        const maxRecords = isAsync ? 50 : 0; //Если isAsync, значит записей много и надо грузить их пачками. Иначе можем грузить все (max === 0 -> грузим все записи)
        return props.getSdCreateList('incidents', listName, recordNewVals, maxRecords).then(data => data);
    }

    const onFieldChange = (fieldReduxName, fieldValue) => {
        switch (fieldReduxName) {
            case 'direction':
                props.clearCreateSdLists(['groupAffectedItemList', 'affectedItemList', 'serviceList', 'kcList', 'ckList']);
                getSdCreateList('groupAffectedItemList', { direction: fieldValue }).then(() => {
                    getSdCreateList('kcList', { direction: fieldValue }).then(() => {
                        getSdCreateList('ckList', { direction: fieldValue });
                    });
                });
                break;
            case 'groupAffectedItem':
                props.clearCreateSdLists(['affectedItemList', 'serviceList']);
                getSdCreateList('affectedItemList', { groupAffectedItem: fieldValue });
                break;
            case 'affectedItem':
                props.clearCreateSdLists('serviceList');
                getSdCreateList('serviceList', { affectedItem: fieldValue });
                break;
        }
    }

    const onTplChange = (tplName) => {
        getSdTplData(tplName).then((data) => {
            if (data) {
                const direction = data.direction ? data.direction.value : null;
                if (direction) {
                    getSdCreateList('groupAffectedItemList', { direction }).then(() => {
                        getSdCreateList('kcList', { direction }).then(() => {
                            getSdCreateList('ckList', { direction }).then(() => {
                                const groupAffectedItem = data.groupAffectedItem ? data.groupAffectedItem.value : null;
                                if (groupAffectedItem) {
                                    getSdCreateList('affectedItemList', { groupAffectedItem }).then(() => {
                                        const affectedItem = data.affectedItem ? data.affectedItem.value : null;
                                        if (affectedItem) {
                                            getSdCreateList('serviceList', { affectedItem });
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
            }
        });
    }

    const setFormInitialValues = () => {
        //Достает простое скалярное значение для TextField
        const getSimpleValue = (value) => {
            return value
                ? value.label ? value.label : value.value
                : value;
        }

        //Подготавливает значения для react-select в формате { value, label }
        const getReactSelectValue = (value) => {
            const toUp = (val) => val && val.length > 0 ? val[0].toUpperCase() + val.slice(1) : val;
            return value
                ? {
                    value: value.value !== undefined ? toUp(value.value) : toUp(value),
                    label: value.label !== undefined ? toUp(value.label) : value.value !== undefined ? toUp(value.value) : toUp(value)
                }
                : toUp(value);
        }

        return {
            category: getReactSelectValue(props.createSdDetailData.category),
            direction: getReactSelectValue(props.createSdDetailData.direction),
            groupAffectedItem: getReactSelectValue(props.createSdDetailData.groupAffectedItem),
            affectedItem: getReactSelectValue(props.createSdDetailData.affectedItem),
            service: getReactSelectValue(props.createSdDetailData.service),
            kc: getReactSelectValue(props.createSdDetailData.kc),
            ck: getReactSelectValue(props.createSdDetailData.ck),
            priority: getReactSelectValue(props.createSdDetailData.priority),
            title: getSimpleValue(props.createSdDetailData.title),
            description: getSimpleValue(props.createSdDetailData.description),
            sdTplName: getReactSelectValue(props.createSdDetailData.sdTplName),
        };
    }

    return <DetailedRequest onSendClick={props.onSendClick} data={props.createSdDetailData} createSdLists={props.createSdLists} initialValues={setFormInitialValues()}
        tplDataIsLoading={props.createSdDetailDataIsLoading} categoryList={props.categoryList} priorityList={props.priorityList} getSdCreateList={getSdCreateList}
        onFieldChange={onFieldChange} onTplChange={onTplChange} />
}

let mapStateToProps = (state) => {
    return {
        createSdDetailData: state.header.createSdDetailData,
        createSdLists: state.header.createSdLists,
        createSdDetailDataIsLoading: state.header.createSdDetailDataIsLoading,
        categoryList: state.root.globalVariables.categoryList,
        priorityList: state.root.globalVariables.priorityList,
    }
}

export default compose(
    connect(mapStateToProps, {
        getSdTplData, getSdCreateList, clearCreateSdLists
    }),
)(DetailedRequestContainer);