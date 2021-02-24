/**
 * Код тут скорее всего будет дорабатываться и рефакториться, но общий принцип, я думаю, останется
 * Пока что не обращать внимания на кучу констант, вероятно есть способ лучше, но я пока о нем не знаю
 */

import { getSMDateFormat } from '../utils/custom';
import { objectContentAPI } from '../api/object-content';
import history from 'redux/history';
import { catalogDataAPI } from '../api/catalog-data-api';

const TOOGLE_ALERT_MARK = 'NEW_ALERT';
const ALERT_EXPANDED_CHANGE = 'ALERT_EXPANDED_CHANGE';
const ALERT_DELETE = 'ALERT_DELETE';
const ALERT_READ = 'ALERT_READ';
const ALERT_CHECK_NEW = 'ALERT_CHECK_NEW';
const ALERT_ADD = 'ALERT_ADD';
const CREATE_SD_DETAIL_DATA_CHANGE = 'CREATE_SD_DETAIL_DATA_CHANGE';
const CREATE_SD_DETAIL_DATA_CLEAR = 'CREATE_SD_DETAIL_DATA_CLEAR';
const CREATE_SD_DETAIL_DATA_IS_LOADING = 'CREATE_SD_DETAIL_DATA_IS_LOADING';
const SD_IS_CREATING = 'SD_IS_CREATING';
const SET_CREATE_SD_LISTS_IS_LOADING = 'SET_CREATE_SD_LISTS_IS_LOADING';
const SET_CREATE_SD_LIST = 'SET_CREATE_SD_LIST';
const CLEAR_CREATE_SD_LISTS = 'CLEAR_CREATE_SD_LISTS';
const CLEAR_CREATE_SD_ALL_LISTS = 'CLEAR_CREATE_SD_ALL_LISTS';
const CREATE_SD_REPEAT_DATA_IS_LOADING = 'CREATE_SD_REPEAT_DATA_IS_LOADING';
const CREATE_SD_REPEAT_DATA_CHAGE = 'CREATE_SD_REPEAT_DATA_CHAGE';
const SET_WORKFLOW_META_IS_LOADING = 'SET_WORKFLOW_META_IS_LOADING';
const SET_WORKFLOW_META = 'SET_WORKFLOW_META';

let initialState = {
    newMessageMarker: false, //Маркер новых сообщений
    newAlertMarker: false, //Маркер новых оповещений (Колокольчик справа)
    dashboardData: [
        { name: '1 января', Зарегистрировано: 3000, Выполнено: 1398 },
        { name: '1 февраля', Зарегистрировано: 2000, Выполнено: 9800 },
        { name: '1 марта', Зарегистрировано: 2780, Выполнено: 3908 },
        { name: '1 апреля', Зарегистрировано: 1890, Выполнено: 4800 },
        { name: '1 мая', Зарегистрировано: 2390, Выполнено: 3800 },
        { name: '1 июня', Зарегистрировано: 3490, Выполнено: 4300 }
    ],
    kpiData: [
        { name: '1 января', '%': 90 },
        { name: '1 февраля', '%': 100 },
        { name: '1 марта', '%': 120 },
        { name: '1 апреля', '%': 88 },
        { name: '1 мая', '%': 97 },
        { name: '1 июня', '%': 109 }
    ],
    reportData: [
        { name: 'АГ', Зарегистрировано: 3000, Выполнено: 1398 },
        { name: 'HPSM', Зарегистрировано: 2000, Выполнено: 9800 },
        { name: 'Образование', Зарегистрировано: 2780, Выполнено: 3908 },
        { name: 'КГХ', Зарегистрировано: 1890, Выполнено: 4800 },
        { name: 'БигДата', Зарегистрировано: 2390, Выполнено: 3800 },
        { name: 'Связь', Зарегистрировано: 3490, Выполнено: 4300 }
    ],
    alerts: [], //Алерты (В правой части хедера)
    maxAlertsId: 0,
    createSdDetailData: { //Данные формы заявки из "Обратиться к СТП"
        category: '',
        direction: '',
        groupAffectedItem: '',
        affectedItem: '',
        service: '',
        kc: '',
        ck: '',
        priority: '',
        title: '',
        description: '',
        sdTplName: '',
    },
    createSdDetailDataIsLoading: false,
    createSdRepeatListData: [],
    sdIsCreating: false,
    createSdLists: { //Списки для выбора в диалоге создания Обращения
        sdTplList: { data: [], isLoading: false },
        directionList: { data: [], isLoading: false },
        groupAffectedItemList: { data: [], isLoading: false },
        affectedItemList: { data: [], isLoading: false },
        serviceList: { data: [], isLoading: false },
        kcList: { data: [], isLoading: false },
        ckList: { data: [], isLoading: false },
    },
    createSdRepeatDataIsLoading: false,
    workflowMeta: {
        wfInfo: {},
        wfHistory: [],
    },
    workflowMetaIsLoading: false,
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOOGLE_ALERT_MARK:
            return {
                ...state,
                newAlertMarker: action.value,
            }
        case ALERT_EXPANDED_CHANGE:
            return {
                ...state,
                alerts: state.alerts.map((item, index) => {
                    item.expanded = item.id === action.alertId ? action.value : item.expanded;
                    return item;
                }),
            };
        case ALERT_ADD:
            return {
                ...state,
                alerts: [{
                    id: state.maxAlertsId + 1,
                    newAlert: true,
                    title: action.value.title,
                    date: getSMDateFormat(new Date()),
                    description: action.value.description,
                    expanded: false,
                    relativeObject: action.value.relObj || '',
                    relativeContact: action.value.relContact || 'Система',
                },
                ...state.alerts],
                maxAlertsId: state.maxAlertsId + 1,
            }
        case ALERT_DELETE: //TODO: Нашел баг: при удалении надо будет смотреть, остались ли алерты, чтобы снимать маркер о новых уведомлениях
            return {
                ...state,
                alerts: state.alerts.filter(item => item.id !== action.alertId),
            }
        case ALERT_READ:
            let isNewAlerts = false; //Если хоть один алерт не прочитан, маркер будет отображаться
            return {
                ...state,
                alerts: state.alerts.map(item => {
                    item.newAlert = item.id === action.alertId ? false : item.newAlert;
                    if (item.newAlert && !isNewAlerts) { isNewAlerts = true; }
                    return item;
                }),
                newAlertMarker: isNewAlerts,
            }
        case ALERT_CHECK_NEW: //Проверка на новые алерты
            let isNewAlertsCheck = false;
            return {
                ...state,
                alerts: state.alerts.map((item, index) => {
                    if (item.newAlert && !isNewAlertsCheck) { isNewAlertsCheck = true; }
                    return item;
                }),
                newAlertMarker: isNewAlertsCheck,
            }
        case CREATE_SD_DETAIL_DATA_CHANGE:
            //Чтобы в react-select отображался placeholder, пустое значение должно быть '', а не { value: '' }
            const prepareEmptyValues = (newData) => {
                let retObj = {};
                for (const key in newData) {
                    retObj[key] = newData[key].value ? newData[key] : '';
                }
                return retObj;
            }

            return {
                ...state,
                createSdDetailData: prepareEmptyValues(action.newData)
            }
        case CREATE_SD_DETAIL_DATA_CLEAR:
            return {
                ...state,
                createSdDetailData: initialState.createSdDetailData
            }
        case SD_IS_CREATING:
            return {
                ...state,
                sdIsCreating: action.value,
            }
        case SET_CREATE_SD_LISTS_IS_LOADING:
            return {
                ...state,
                createSdLists: {
                    ...state.createSdLists,
                    [action.listName]: {
                        ...state.createSdLists[action.listName],
                        isLoading: action.isLoading,
                    }
                }
            }
        case SET_CREATE_SD_LIST:
            let updatingList = { ...state.createSdLists[action.listName]};
            updatingList.data = [ ...updatingList.data, ...action.listData];
            return {
                ...state,
                createSdLists: {
                    ...state.createSdLists,
                    [action.listName]: updatingList, //Обновляем существующий список
                }
            }
        case CLEAR_CREATE_SD_LISTS:
            let clearedLists = {};
            const lists = Array.isArray(action.listNames) ? action.listNames : [action.listNames]; //Если один список чистим, то просто его в массив обернем
            lists.map(listName => {
                clearedLists[listName] = { data: [], isLoading: state.createSdLists[listName] ? state.createSdLists[listName].isLoading : false }
            });

            return {
                ...state,
                createSdLists: {
                    ...state.createSdLists,
                    ...clearedLists, //Очищаем переданные списки
                }
            }
        case CLEAR_CREATE_SD_ALL_LISTS:
            return {
                ...state,
                createSdLists: initialState.createSdLists
            }
        case CREATE_SD_DETAIL_DATA_IS_LOADING:
            return {
                ...state,
                createSdDetailDataIsLoading: action.value,
            }
        case CREATE_SD_REPEAT_DATA_IS_LOADING:
            return {
                ...state,
                createSdRepeatDataIsLoading: action.value,
            }
        case CREATE_SD_REPEAT_DATA_CHAGE:
            return {
                ...state,
                createSdRepeatListData: [...action.newData]
            }
        case SET_WORKFLOW_META_IS_LOADING:
            return {
                ...state,
                workflowMetaIsLoading: action.value
            }
        case SET_WORKFLOW_META:
            return {
                ...state,
                workflowMeta: {
                    wfInfo: { ...action.wfInfo },
                    wfHistory: [ ...action.wfHistory ],
                }
            }
        default:
            return state;
    }
}

const alertAdd = (value) => ({ type: ALERT_ADD, value }); //Добавление только через санку
const alertDelete = (alertId) => ({ type: ALERT_DELETE, alertId }); //Удаление только через санку
const alertCheckNew = () => ({ type: ALERT_CHECK_NEW }); //Вспомогательная функция, используется в санках
export const toogleAlertMark = (value) => ({ type: TOOGLE_ALERT_MARK, value });
export const alertExpandedChange = (alertId, value) => ({ type: ALERT_EXPANDED_CHANGE, alertId, value });
export const alertRead = (alertId) => ({ type: ALERT_READ, alertId });
const createSdDetailDataChange = (newData) => ({ type: CREATE_SD_DETAIL_DATA_CHANGE, newData });
export const createSdDetailedDataClear = () => ({ type: CREATE_SD_DETAIL_DATA_CLEAR });
export const setSdIsCreating = (value) => ({ type: SD_IS_CREATING, value });
const setCreateSdList = (listName, listData = []) => ({type: SET_CREATE_SD_LIST, listName, listData});
const setCreateSdListsIsLoading = (listName, isLoading) => ({type: SET_CREATE_SD_LISTS_IS_LOADING, listName, isLoading});
export const clearCreateSdLists = (listNames) => ({type: CLEAR_CREATE_SD_LISTS, listNames});
export const clearCreateSdAllLists = () => ({type: CLEAR_CREATE_SD_ALL_LISTS});
export const setCreateSdDetailDataIsLoading = (value) => ({type: CREATE_SD_DETAIL_DATA_IS_LOADING, value});
export const setCreateSdRepeatDataIsLoading = (value) => ({type: CREATE_SD_REPEAT_DATA_IS_LOADING, value});
const createSdRepeatDataChange = (newData) => ({ type: CREATE_SD_REPEAT_DATA_CHAGE, newData });
const setWorkflowMetaIsLoading = value => ({ type: SET_WORKFLOW_META_IS_LOADING, value });
const setWorkflowMeta = (wfInfo, wfHistory) => ({ type: SET_WORKFLOW_META, wfInfo, wfHistory });

export const createSD = (interaction, showAlert, handleCloseDialog, createType, updateCurrentRow) => (dispatch) => {
    dispatch(setSdIsCreating(true));
    objectContentAPI.createSD(interaction, createType)
        .then(data => {
            if (data.ditMFSMAPI.Status === 'SUCCESS') {
                updateCurrentRow({
                    tabMode: 'new',
                    key: data.ditMFSMAPI.Key
                });
                history.push(`/index/module/${data.ditMFSMAPI.Key}`);
                handleCloseDialog();
                showAlert(`Обращение успешно создано. ${data.ditMFSMAPI.Response}`, 'success', 'Успешное открытие Обращения', { relObj: data.ditMFSMAPI.Key });
            } else {
                showAlert(`Не удалось создать Обращение. ${data.Messages}`, 'error', 'Не удалось создать Обращение');
            }
        })
        .catch(error => {
            showAlert(`Не удалось создать Обращение. Ошибка: ${error}`, 'error', 'Не удалось создать Обращение');
        })
        .finally(() => dispatch(setSdIsCreating(false)));
}

export const addNewAlert = (alertData) => (dispatch) => {
    dispatch(alertAdd(alertData));
    dispatch(toogleAlertMark(true));
}

export const deleteAlert = (alertId) => (dispatch) => {
    dispatch(alertDelete(alertId));
    dispatch(alertCheckNew());
}

export const getSdCreateList = (filename, listName, recordNewVals, maxCount) => (dispatch, getState) => {
    const getDataPortion = (page, maxCount, startFromRecord, recordNewVals, filename) => {
        return catalogDataAPI.getDataList(page, maxCount, null, listName, startFromRecord, recordNewVals, filename).then(data => {
            dispatch(setCreateSdList(listName, data.data));
            if (!data.isGettingDataComplete) {
                if (data && data.message) {
                    dispatch(setCreateSdListsIsLoading(listName, false));
                    getDataPortion(page, maxCount, data.data ? data.data[data.data.length - 1] : null, recordNewVals, filename);
                } else {
                    //Продолжаем получать записи с последней полученной, пока не получим их все
                    getDataPortion(page + 1, maxCount, data.data[data.data.length - 1], recordNewVals, filename);
                }
                
            } else { 
                dispatch(setCreateSdListsIsLoading(listName, false));
                return data.data;    
            }
        })
        .catch(error => {
            dispatch(setCreateSdListsIsLoading(listName, false));
            console.error(`Не удалось загрузить список ${listName}. Ошибка: ${error}`);
        })
    }

    const getIsLoading = () => {
        const listInfo = getState().mainPageContent.editModeLists[listName];
        return listInfo ? listInfo.isLoading : false;
    }

    if (getIsLoading()) {
        return Promise.reject('REQUEST_ALREADY_IN_PROGRESS');
    }

    let page = 1;
    dispatch(clearCreateSdLists(listName));
    dispatch(setCreateSdListsIsLoading(listName, true));
    return getDataPortion(page, maxCount, null, recordNewVals, filename); //Берем данные по кусочкам. 2 параметр = 0 => берем все данные
}

export const getSdTplData = (tplName) => (dispatch) => {
    dispatch(setCreateSdDetailDataIsLoading(true));
    return catalogDataAPI.getSdTplData(tplName)
        .then(data => {
            dispatch(createSdDetailDataChange(data));
            return data;
        })
        .catch(error => {
            console.log('error: ' + JSON.stringify(error), error);
            
        })
        .finally(() => dispatch(setCreateSdDetailDataIsLoading(false)));
}

export const getLastCreatedSdList = () => (dispatch) => {
    //dispatch(setCreateSdRepeatDataIsLoading(true)); //Вызывается в RightArea.jsx
    return catalogDataAPI.getLastCreatedSdList()
        .then(data => {
            dispatch(createSdRepeatDataChange(data.lastCreatedSdList || []));
            return data;
        })
        .catch(error => {
            console.log('error: ' + JSON.stringify(error), error);
            
        })
        .finally(() => dispatch(setCreateSdRepeatDataIsLoading(false)));
}

export const getWorkflowMeta = (recordId) => (dispatch) => {
    dispatch(setWorkflowMetaIsLoading(true));
    return catalogDataAPI.getWorkflowMeta(recordId)
        .then(data => {
            dispatch(setWorkflowMeta(data.wfInfo || {}, data.wfHistory || []));
            return data;
        })
        .catch(error => {
            console.log('error: ' + JSON.stringify(error), error);
            
        })
        .finally(() => dispatch(setWorkflowMetaIsLoading(false)));
}

export default headerReducer;
