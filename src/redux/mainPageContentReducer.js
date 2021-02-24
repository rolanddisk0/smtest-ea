import { mergeObjectExistFields } from '../utils/custom';
import { objectContentAPI } from '../api/object-content';
import { getRecordNumberPrefix } from 'utils/custom';
import { formatDatetimeLocalToSMDate } from 'utils/formsUtils';
import fileDownload from 'js-file-download';
import { getGlobalVars } from './rootReducer';
import { catalogDataAPI } from '../api/catalog-data-api';
import _ from 'underscore';
import * as FlexLayout from 'flexlayout-react';

const UPDATE_CONTENT_DATA = 'UPDATE_CONTENT_DATA';
const CONTENT_IS_LOADING = 'CONTENT_IS_LOADING';
const UPDATE_SHOW_CONTENT_ALERT = 'UPDATE_SHOW_CONTENT_ALERT';
const TOOGLE_EDIT_MODE = 'TOOGLE_EDIT_MODE';
const SET_PRELOADED_EDIT_MODE_LISTS = 'SET_PRELOADED_EDIT_MODE_LISTS';
const CLEAR_EDIT_MODE_LISTS = 'CLEAR_EDIT_MODE_LISTS';
const SET_EDIT_MODE_LIST = 'SET_EDIT_MODE_LIST';
const SET_EDIT_MODE_LIST_ISLOADING = 'SET_EDIT_MODE_LIST_ISLOADING';
const SET_EDIT_MODE_ALL_LISTS_ISLOADING = 'SET_EDIT_MODE_ALL_LISTS_ISLOADING';
const UPDATE_TABS = 'UPDATE_TABS';
const UPDATE_TABS_HISTORY = 'UPDATE_TABS_HISTORY';
const UPDATE_ACTIVE_RECORD = 'UPDATE_ACTIVE_RECORD';
const RESET_STATE = 'RESET_STATE';


const getEmptyContent = () => {
    return {
        prefix: '',
        headerItems: {
            number: { value: '' },
            status: { value: '' },
            category: { value: '', label: '' },
            feedbackType: { value: '' },
            deadline: { value: '' },
            priority: { value: '', label: '' },
        },
        assignmentData: {
            sendToCk: false,
            kc: { value: '' },
            kcDisp: { value: '' },
            ck: { value: '' },
            ckInj: { value: '' },
        },
        classificationData: {
            direction: { value: '' },
            groupAffectedItem: { value: '' },
            affectedItem: { value: '' },
            service: { value: '' },
        },
        contactsData: {
            contactName: {
                name: { value: '' },
                vip: false,
                skype: '',
                whatsApp: '',
                telegramm: '',
                organization: null,
                location: null,
            },
            callbackContact: {
                name: { value: '' },
                vip: false,
                skype: null,
                whatsApp: null,
                telegramm: null,
                organization: '',
                location: '',
            },
        },
        cmdbPanelData: {
            logicalName: { value: '' },
            assets: { value: '' },
        },
        linksPanelData: {
            sd: [],
            im: [],
            c: [],
            p: [],
        },
        slaData: {
            nextBreach: { value: '' },
            passed50Percent: { value: '' },
            passed75Percent: { value: '' },
            passed100Percent: { value: '' },
        },
        feedbackData: {
            closeMark: { value: '', label: '' },
            feedback: { value: '' },
        },
        resolutionData: {
            knowledgeArticle: { value: '' },
            resolutionCode: { value: '' },
            closedCKKC: { value: '' },
            resolution: { value: '' },
        },
        descriptionData: {
            title: { value: '' },
            description: { value: '' },
        },
        recordAttachments: [],
        isEditModeEnabled: false,
        controlPanelBtns: [], //Кнопки управления записью
        rightSliderMenuData: { //Списки данных в правом меню
            directionList: [],
            groupAffectedItemList: [],
            affectedItemList: [],
            serviceList: [],
        }
    }
}

const getEmptyTabsObj = () => {
    return FlexLayout.Model.fromJson({
        global: {
            tabEnableClose: true,
            tabSetEnableDivide: false // временная заглушка
        },
        layout: {
            'type': 'row',
            'weight': 100,
            'children': [
                {
                    'type': 'tabset',
                    'weight': 50,
                    'selected': 0,
                    'children': []
                }
            ]
        }
    })
}

let initialState = {
    activeRecord: {
        id: 'empty',
        historyId: null
    },
    content: {
        empty: getEmptyContent()
    },
    contentIsLoading: false, //Спиннер подгрузки контента
    showContentAlert: false, //Алерт на контент
    editModeLists: { //Списки для выбора в editMode
        resolutionCodeList: { data: [], isLoading: false },
        kcList: { data: [], isLoading: false },
        dispKcList: { data: [], isLoading: false },
        ckList: { data: [], isLoading: false },
        ckInjList: { data: [], isLoading: false },
        directionList: { data: [], isLoading: false },
        groupAffectedItemList: { data: [], isLoading: false },
        affectedItemList: { data: [], isLoading: false },
        serviceList: { data: [], isLoading: false },
        contactNameList: { data: [], isLoading: false },
        callbackContactList: { data: [], isLoading: false },
        ciList: { data: [], isLoading: false },
        assetsList: { data: [], isLoading: false },
    },
    tabs: getEmptyTabsObj(),
    tabsHistory: {}
};

const getNewContent = (action, state) => {
    const emptyContent = getEmptyContent();
    const headerItems = mergeObjectExistFields(action.data, emptyContent.headerItems);
    const numberValue = headerItems.number.value || 'empty';
    const rightSliderMenuData = state.content[numberValue] ? state.content[numberValue].rightSliderMenuData : {};

    return {
        prefix: action.area,
        headerItems: headerItems,
        assignmentData: mergeObjectExistFields(action.data, emptyContent.assignmentData),
        classificationData: mergeObjectExistFields(action.data, emptyContent.classificationData),
        contactsData: {
            ...state.contactsData,
            contactName: mergeObjectExistFields(action.data.contactName, emptyContent.contactsData.contactName),
            callbackContact: mergeObjectExistFields(action.data.callbackContact, emptyContent.contactsData.callbackContact),
        },
        feedbackData: mergeObjectExistFields(action.data, emptyContent.feedbackData),
        resolutionData: mergeObjectExistFields(action.data, emptyContent.resolutionData),
        descriptionData: mergeObjectExistFields(action.data, emptyContent.descriptionData),
        cmdbPanelData: mergeObjectExistFields(action.data, emptyContent.cmdbPanelData),
        linksPanelData: {
            ...state.linksPanelData,
            sd: action.data.links.sd,
            im: action.data.links.im,
            c: action.data.links.c,
            p: action.data.links.p,
        },
        slaData: mergeObjectExistFields(action.data.sla, emptyContent.slaData),
        recordAttachments: action.data.attachments,
        controlPanelBtns: action.data._btns.btns ? action.data._btns.btns.map(btn => ({ name: btn, type: 'SM_ACTION' })) : emptyContent.controlPanelBtns,
        rightSliderMenuData: {
            ...rightSliderMenuData,
            directionList: action.data.rmLists.directions || [],
            groupAffectedItemList: action.data.rmLists.groupServices || [],
            affectedItemList: action.data.rmLists.affectedItems || [],
            serviceList: action.data.rmLists.services || [],
        }
    }
}

const mainPageContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_STATE:
            return {
                ...state,
                content: {
                    empty: getEmptyContent()
                },
                tabs: getEmptyTabsObj()
            }
        case UPDATE_CONTENT_DATA:
            // если существует обновить
            let newContent = null;
            switch (action.actionType) {
                case 'update':
                case 'get':
                    newContent = getNewContent(action, state);
                    return {
                        ...state,
                        content: { ...state.content, [action.id]: newContent }
                    }
                case 'delete':
                    delete state.content[action.id];
                    return {
                        ...state
                    }
                default:
                    newContent = getNewContent(action, state);
                    return {
                        ...state,
                        content: { ...state.content, [action.id]: newContent }
                    }
            }
        case CONTENT_IS_LOADING:
            return {
                ...state,
                contentIsLoading: action.value,
            }
        case UPDATE_SHOW_CONTENT_ALERT:
            return {
                ...state,
                showContentAlert: action.value,
            }
        case TOOGLE_EDIT_MODE:
            return {
                ...state,
                content: {
                    ...state.content,
                    [action.id]: {
                        ...state.content[action.id],
                        isEditModeEnabled: action.value
                    }
                }
            }
        case SET_PRELOADED_EDIT_MODE_LISTS:
            let preloadedLists = {};
            for (let listName in action.lists) {
                preloadedLists[listName] = { data: action.lists[listName], isLoading: false }
            }

            return {
                ...state,
                editModeLists: preloadedLists,
            }
        case SET_EDIT_MODE_LIST_ISLOADING:
            return {
                ...state,
                editModeLists: {
                    ...state.editModeLists,
                    [action.listName]: {
                        ...state.editModeLists[action.listName],
                        isLoading: action.isLoading,
                    }
                }
            }
        case SET_EDIT_MODE_ALL_LISTS_ISLOADING:
            let listsAllLoading = { ...state.editModeLists };

            for (let listName in state.editModeLists) {
                listsAllLoading[listName] = { data: state.editModeLists[listName].data, isLoading: action.isLoading }
            }

            return {
                ...state,
                editModeLists: listsAllLoading,
            }
        case CLEAR_EDIT_MODE_LISTS:
            let clearedLists = {};
            const lists = Array.isArray(action.listNames) ? action.listNames : [action.listNames]; //Если один список чистим, то просто его в массив обернем
            lists.map(listName => {
                clearedLists[listName] = { data: [], isLoading: state.editModeLists[listName] ? state.editModeLists[listName].isLoading : false }
            });

            return {
                ...state,
                editModeLists: {
                    ...state.editModeLists,
                    ...clearedLists, //Очищаем переданные списки
                }
            }
        case SET_EDIT_MODE_LIST:
            let updatingList = { ...state.editModeLists[action.listName] };
            updatingList.data = [...updatingList.data, ...action.listData];
            return {
                ...state,
                editModeLists: {
                    ...state.editModeLists,
                    [action.listName]: updatingList, //Обновляем существующий список
                }
            }
        case UPDATE_TABS:
            //console.log('UPDATE_TABS');
            if (action.actionType == 'sync') {
                let tabsIds = [];
                state.tabs._root._children.forEach((tabset) => {
                    tabset._children.forEach((tab) => {
                        tabsIds.push(tab._attributes.id);
                    })
                })
                Object.keys(state.content).forEach((key) => {
                    if (key != 'empty' && tabsIds.indexOf(key) == -1) {
                        delete state.content[key];
                    }
                })
                return state
            } else {
                const tabsetNode = state.tabs.getActiveTabset();
                const childrens = tabsetNode._children;
                let existingTabIndex = childrens.findIndex((tab) => {
                    return tab._attributes.id == action.value.id;
                })
                let newModel = state.tabs.toJson();
                if (existingTabIndex != -1) {
                    //активировать открытую вкладку с этой записью
                    newModel.layout.children[0].selected = existingTabIndex;
                } else if (['exist', 'existBack'].indexOf(action.value.tabMode) != -1 && childrens.length > 0) {
                    //обновить текущую вкладку
                    const selectedIndex = tabsetNode._attributes.selected;
                    const oldId = newModel.layout.children[0].children[selectedIndex].id;
                    delete state.content[oldId];
                    action.value.config = { historyId: childrens[selectedIndex]._attributes.config.historyId };
                    newModel.layout.children[0].children[selectedIndex] = action.value;

                    if (action.value.tabMode != 'existBack') {
                        state.tabsHistory[action.value.config.historyId].push(oldId);
                    }
                } else {
                    //открыть новый tab
                    action.value.config = { historyId: 'tab' + new Date().getTime() };
                    newModel.layout.children[0].children = newModel.layout.children[0].children.concat(action.value);
                    newModel.layout.children[0].selected = newModel.layout.children[0].children.length - 1;
                    state.tabsHistory[action.value.config.historyId] = [];
                }

                return {
                    ...state,
                    tabs: FlexLayout.Model.fromJson(newModel)
                }
            }
        case UPDATE_TABS_HISTORY:
            return {
                ...state,
                tabsHistory: action.value
            }
        case UPDATE_ACTIVE_RECORD:
            return {
                ...state,
                activeRecord: action.value
            }
        default:
            return state;
    }
}

export const resetState = () => ({ type: RESET_STATE });
export const updateActiveRecord = (value) => ({ type: UPDATE_ACTIVE_RECORD, value });
export const updateContentData = (data, area, actionType, id) => ({ type: UPDATE_CONTENT_DATA, data, area, actionType, id });
export const contentIsLoading = (value) => ({ type: CONTENT_IS_LOADING, value });
export const updateTabs = (value, actionType) => ({ type: UPDATE_TABS, value, actionType });
export const updateTabsHistory = (value) => ({ type: UPDATE_TABS_HISTORY, value });
const setEditMode = (value, id) => ({ type: TOOGLE_EDIT_MODE, value, id });
const setPreloadedEditModeLists = (lists) => ({ type: SET_PRELOADED_EDIT_MODE_LISTS, lists });
export const clearEditModeLists = (listNames) => ({ type: CLEAR_EDIT_MODE_LISTS, listNames });
const setEditModeList = (listName, listData = []) => ({ type: SET_EDIT_MODE_LIST, listName, listData });
const setEditModeListIsLoading = (listName, isLoading) => ({ type: SET_EDIT_MODE_LIST_ISLOADING, listName, isLoading });
const setEditModeAllListsIsLoading = (isLoading) => ({ type: SET_EDIT_MODE_ALL_LISTS_ISLOADING, isLoading });
//const setEditModeListReqInProgress = (listName, cToken) => ({type: SET_EDIT_MODE_LIST_REQ_IN_PROGRESS, listName, cToken});

export const getEditModeList = (recordId, listName, recordNewVals, maxCount) => (dispatch, getState) => {
    const getDataPortion = (page, maxCount, startFromRecord, recordNewVals) => {
        return catalogDataAPI.getDataList(page, maxCount, recordId, listName, startFromRecord, recordNewVals).then(data => {
            dispatch(setEditModeList(listName, data.data));
            if (!data.isGettingDataComplete) {
                if (data && data.message) {
                    dispatch(setEditModeListIsLoading(listName, false));
                    getDataPortion(page, maxCount, data.data ? data.data[data.data.length - 1] : null, recordNewVals);
                } else {
                    getDataPortion(page + 1, maxCount, data.data[data.data.length - 1], recordNewVals); //Продолжаем получать записи с последней полученной, пока не получим их все
                }

            } else {
                dispatch(setEditModeListIsLoading(listName, false));
                return data.data;
            }
        })
            .catch(error => {
                dispatch(setEditModeListIsLoading(listName, false));
                console.error(`Не удалось загрузить список ${listName}. Ошибка: ${error}`);
            })
    }

    const getIsLoading = () => {
        const listInfo = getState().mainPageContent.editModeLists[listName];
        return listInfo ? listInfo.isLoading : false;
    }

    // const getIsReqAlreadyInProgress = () => {
    //     const listInfo = getState().mainPageContent.editModeLists[listName];
    //     return listInfo ? listInfo.cToken : null;
    // }

    if (getIsLoading()) {
        //console.log('REQUEST_ALREADY_IN_PROGRESS');
        return Promise.reject('REQUEST_ALREADY_IN_PROGRESS');
    }

    let page = 1;
    dispatch(clearEditModeLists(listName));
    dispatch(setEditModeListIsLoading(listName, true));
    return getDataPortion(page, maxCount, null, recordNewVals); //Берем данные по кусочкам. 2 параметр = 0 => берем все данные
}

export const toogleEditMode = (isEditModeEnabled, recordId) => (dispatch) => {
    dispatch(setEditMode(isEditModeEnabled, recordId));
    if (isEditModeEnabled) {
        dispatch(setEditModeAllListsIsLoading(true));
        return catalogDataAPI.preloadEditModeLists(recordId)
            .then(data => {
                dispatch(setPreloadedEditModeLists(data));
            })
            .catch(error => {
                console.log(`Не удалось загрузить списки для редактирования записи. Ошибка: ${error}`);
                //Не могу понять, но showAlert упорно не хочет передаваться в эту функцию
                //showAlert(`Не удалось загрузить списки для редактирования записи. Ошибка: ${error}`, 'error', 'Не удалось загрузить списки для редактирования записи');
            })
            .finally(() => dispatch(setEditModeAllListsIsLoading(false)));
    }
}

export const getContent = (id, showAlert) => (dispatch, getState) => {
    //console.log('getContent');
    const area = getRecordNumberPrefix(id);
    if (!area) {
        showAlert(`Запись ${id} не найдена!`, 'error', `Запись ${id} не найдена!`);
        return null;
    }

    dispatch(contentIsLoading(true));
    return objectContentAPI.getContent(id, area)
        .then(data => {
            const tabMode = getState().list.currentRow.tabMode;
            let newTab = {
                'type': 'tab',
                'name': id,
                'id': id,
                'component': 'content',
                'tabMode': tabMode
            }
            // TODO: как лучше синхронизировать
            dispatch(updateTabs(newTab, 'get'));
            dispatch(updateContentData(data, area, 'get', id));
            //dispatch(updateTabs(newTab, 'get'));
            if (!getState().root.isGlobalVarsReceived) { dispatch(getGlobalVars()); }
        })
        .catch(error => {
            if (error == 'Данные не найдены') {
                showAlert(`У вас нет прав на просмотр данных по записи`, 'warning', `У вас нет прав на просмотр данных по записи ${id}`);
            } else {
                showAlert(`Не удалось загрузить данные по записи. Ошибка: ${error}`, 'error', `Не удалось загрузить данные по записи ${id}`);
            }
        })
        .finally(() => {
            dispatch(toogleEditMode(false));
            dispatch(contentIsLoading(false));
        });
}

//Кнопка сохранить
export const updateContent = (id, showAlert, formValues) => (dispatch) => {
    const area = getRecordNumberPrefix(id);
    const paramsNames = ['updatedFields'];
    const paramsValues = [JSON.stringify(formValues)];

    dispatch(contentIsLoading(true));
    objectContentAPI.putContent(id, paramsNames, paramsValues, area, 'update')
        .then(data => {
            if (data.ditMFSMAPI.Status === 'SUCCESS') {
                objectContentAPI.getContent(id, area)
                    .then(data => {
                        dispatch(updateContentData(data, area, 'update', id));
                        showAlert(`Запись успешно обновлена!`, 'success', `Успешное обновление записи ${id}`, { relObj: id });
                    })
                    .catch(error => {
                        showAlert(error, 'error', `Не удалось обновить запись ${id}`, { relObj: id });
                    })
                    .finally(() => {
                        dispatch(toogleEditMode(false));
                        dispatch(contentIsLoading(false));
                    });
            }
            else {
                const err = data.ditMFSMAPI.Response.join('\n') + '\nMessages: ' + data.Messages.join('\n');
                showAlert(err, 'error', `Не удалось обновить запись ${id}`, { relObj: id });
                dispatch(contentIsLoading(false));
            }
        })
        .catch(error => {
            showAlert(error, 'error', `Не удалось обновить запись ${id}`, { relObj: id });
            dispatch(contentIsLoading(false));
        });
}

//Инициировать нажатие кнопки SM
export const execSMAction = (id, showAlert, smAction, formValues) => (dispatch) => {
    const area = getRecordNumberPrefix(id);
    const getParams = (smAction, area) => {
        let names = ['SMAction'];
        let values = [smAction];

        switch (area) {
            case 'SD':
                switch (smAction) {
                    case 'Вернуть в КЦ':
                        names = [...names, 'КЦ: Причина возврата', 'КЦ: Комментарий'];
                        values = [...values, formValues.returnReason, formValues.message];
                        break;
                    case 'Выполнить':
                        const workHours = +(formValues.workHours || 0) * 60 + +(formValues.workMinutes || 0);
                        names = [...names, 'Поле: Решение', 'Поле: Код выполнения'];
                        values = [...values, formValues.resolution, formValues.resolutionCode];
                        if (workHours > 0) {
                            names = [...names, 'Трудозатраты'];
                            values = [...values, workHours];
                        }
                        break;
                    case 'Закрыть':
                        if (formValues.closureTitle && formValues.message) {
                            names = [...names, 'Тематика закрытия', 'Сообщение'];
                            values = [...values, formValues.closureTitle, formValues.message];
                        }
                        break;
                    case 'Запрос доп. информации':
                        names = [...names, 'Запрос: Сообщение'];
                        values = [...values, formValues.message];
                        break;
                    case 'Применить шаблон':
                        names = [...names, 'Шаблон'];
                        values = [...values, formValues.template];
                        break;
                    case 'Маршрутизировать':
                        if (formValues.assignment && formValues.assignee) {
                            names = [...names, 'Поле: Рабочая группа', 'Поле: Исполнитель'];
                            values = [...values, formValues.assignment, formValues.assignee];
                        } else if (formValues.template) {
                            names = [...names, 'Шаблон Изменения'];
                            values = [...values, formValues.template];
                        }
                        break;
                }
                break;
            case 'IM':
                switch (smAction) {
                    case 'Создать Проблему':
                        names = [...names, 'Проблема: Основное КЕ', 'Проблема: Влияние'];
                        values = [...values, formValues.logicalName, formValues.severity];
                        break;
                    case 'Выполнить':
                        names = [...names, 'Поле: Решение', 'Поле: Код выполнения'];
                        values = [...values, formValues.resolution, formValues.resolutionCode];

                        if (formValues.subject && formValues.comment) {
                            names = [...names, 'Тематика', 'Комментарий'];
                            values = [...values, formValues.subject, formValues.comment];
                        }
                        break;
                    case 'Вернуть на доработку':
                        names = [...names, 'Код возврата', 'Причина возврата'];
                        values = [...values, formValues.code, formValues.reason];
                        break;
                    case 'Отложить':
                        const formattedDate = formValues.pendingDate ? formatDatetimeLocalToSMDate(formValues.pendingDate) : null;

                        names = [...names, 'Приостановить до', 'Причина приостановки', 'Комментарий'];
                        values = [...values, formattedDate, formValues.reason, formValues.comment];
                        break;
                }
                break;
            case 'C':
                break;
        }

        return { names, values };
    }

    const params = getParams(smAction, area);

    dispatch(contentIsLoading(true));
    objectContentAPI.putContent(id, params.names, params.values, area, 'execSmAction')
        .then(data => {
            if (data.ditMFSMAPI.Status === 'SUCCESS') {
                objectContentAPI.getContent(id, area)
                    .then(data => {
                        dispatch(updateContentData(data, area, 'update', id));
                        showAlert(`Запись ${id} успешно обновлена!`, 'success', 'Успешное обновление записи', { relObj: id });
                    })
                    .catch(error => {
                        showAlert(`Не удалось обновить запись ${id}. Ошибка: ${error}`, 'error', 'Не удалось обновить запись');
                    })
                    .finally(() => {
                        dispatch(toogleEditMode(false));
                        dispatch(contentIsLoading(false));
                    });
            }
            else {
                const err = data.ditMFSMAPI.Response.join('\n') + '\nMessages: ' + data.Messages.join('\n');
                showAlert(`Не удалось обновить запись ${id}. Ошибка: ${err}`, 'error', 'Не удалось обновить запись');
                dispatch(contentIsLoading(false));
            }
        })
        .catch(error => {
            console.log('error: ' + JSON.stringify(error));
            showAlert(`Не удалось обновить запись ${id}. Ошибка: ${error}`, 'error', 'Не удалось обновить запись');
            dispatch(contentIsLoading(false));
        })
}

export const downloadAttachment = (recordId, uid, filename, showAlert) => (dispatch) => {
    const area = getRecordNumberPrefix(recordId);
    if (!area) {
        showAlert(`Запись ${recordId} не найдена!`, 'error', `Не удалось загрузить вложение!`);
        return null;
    }

    objectContentAPI.downloadAttachment(recordId, uid, area)
        .then(data => {
            fileDownload(data, filename);
        })
        .catch(error => {
            showAlert(`Не удалось загрузить данные по записи. Ошибка: ${error}`, 'error', 'Не удалось загрузить вложение!');
        })
}

export default mainPageContentReducer;