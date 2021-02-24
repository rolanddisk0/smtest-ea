import { inboxAPI } from '../api/inbox';
import { getColumns } from '../utils/inbox';
import { getColoringFormatted } from 'utils/coloringBuilder';
import history from 'redux/history';
import { Utils as QbUtils } from 'react-awesome-query-builder';
import io from 'socket.io-client';
import axios from 'axios';
const CancelToken = axios.CancelToken;
const cfg = require('../config/config');
const environment = cfg.environment;
const LIST_IS_LOADING = 'LIST_IS_LOADING';
const FIELDS_IS_LOADING = 'FIELDS_IS_LOADING';
const LIST_SET_DATA = 'LIST_SET_DATA';
const SHOW_INBOXES_DIALOG = 'SHOW_INBOXES_DIALOG';
const SHOW_INBOX_DIALOG = 'SHOW_INBOX_DIALOG';
const CHECK_SELECTED_TODO = 'CHECK_SELECTED_TODO';
const SET_SELECTED_COLUMNS = 'SET_SELECTED_COLUMNS';
const SET_INBOX_LISTS = 'SET_INBOX_LISTS';
const SET_INBOX = 'SET_INBOX';
const SET_SELECTED_INBOX = 'SET_SELECTED_INBOX';
const INBOX_LISTS_IS_LOADING = 'INBOX_LISTS_IS_LOADING';
const SET_CURRENT_ROW = 'SET_CURRENT_ROW_INDEX';
const SET_LIST_ACTION = 'SET_LIST_ACTION';
const SET_FIELDS = 'SET_FIELDS';
const EXCEL_LOADING = 'EXCEL_LOADING';

let initialState = {
    showInboxesDialog: false,
    showInboxDialog: false,
    interactionFields: [
        { fieldName: 'id', fieldCaption: 'ID' },
        { fieldName: 'status', fieldCaption: 'Группа услуг' },
        { fieldName: 'status', fieldCaption: 'Диспетчер КЦ' },
        { fieldName: 'title', fieldCaption: 'Заголовок' },
        { fieldName: 'status', fieldCaption: 'Инициатор' },
        { fieldName: 'status', fieldCaption: 'Инженер ЦК' },
        { fieldName: 'category', fieldCaption: 'Категория' },
        { fieldName: 'contactName', fieldCaption: 'Код выполнения' },
        { fieldName: 'status', fieldCaption: 'Контактное лицо' },
        { fieldName: 'nextBreach', fieldCaption: 'Крайний срок' },
        { fieldName: 'nextBreach', fieldCaption: 'КЦ обработки' },
        { fieldName: 'status', fieldCaption: 'Направление' },
        { fieldName: 'status', fieldCaption: 'Обратная связь' },
        { fieldName: 'status', fieldCaption: 'Организация' },
        { fieldName: 'status', fieldCaption: 'Оценка' },
        { fieldName: 'status', fieldCaption: 'Приоритет' },
        { fieldName: 'status', fieldCaption: 'Сервис' },
        { fieldName: 'status', fieldCaption: 'Статус' },
        { fieldName: 'status', fieldCaption: 'Способ обращения' },
        { fieldName: 'status', fieldCaption: 'ЦК' }
    ],
    listIsLoading: false, //Спиннер подгрузки списка
    fieldsIsLoading: false,
    listData: [],
    selectedTodo: 'dit_p_sd_all',
    selectedColumns: [],
    inboxLists: {
        myInboxData: [],
        systemInboxData: [],
        otherInboxData: []
    },
    inboxListsIsLoading: false,
    inbox: {
        name: '',
        id: null,
        //isCurrent: false,
        isDefault: false,
        isActive: true
    },
    selectedInbox: {
        name: '',
        id: '',
        viewName: '',
        columns: [],
        uniqueKey: null,
        itemsCount: 0,
        smartFilter: null,
        additionalFilter: [],
        advancedFilter: {
            queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
            sql: null
        },
        pageConfig: {
            pageIndex: 0,
            pageSize: 50,
            sortBy: null
        },
        maxSysmodtime: null,
        needRefresh: false
    },
    currentRow: {// TODO убрать это?
        key: null,
        tabMode: null,
        //index: 0 // для RV
    },
    listAction: null,
    fields: [],
    excelLoading: {
        progressCount: 0,
        isLoading: false,
        cancelTokenSource: CancelToken.source()
    }
};

//Чтобы react-redux понял что state поменялся и надо перерисовать компоненту
const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXCEL_LOADING:
            return {
                ...state,
                excelLoading: action.value,
            }           
        case SET_SELECTED_COLUMNS:
            return {
                ...state,
                selectedColumns: action.value,
            }
        case CHECK_SELECTED_TODO:
            return {
                ...state,
                selectedTodo: action.value,
            }
        case SHOW_INBOXES_DIALOG:
            return {
                ...state,
                showInboxesDialog: action.value,
            }
        case SHOW_INBOX_DIALOG:
            return {
                ...state,
                showInboxDialog: action.value,
            }
        case LIST_IS_LOADING:
            return {
                ...state,
                listIsLoading: action.value,
            }
        case FIELDS_IS_LOADING:
            return {
                ...state,
                fieldsIsLoading: action.value,
            }
        case LIST_SET_DATA:
            return {
                ...state,
                //listData: action.data.page && action.data.page != 1 ? state.listData.concat(action.data.records): action.data.records, // для VT
                listData: action.data.records,
            }
        case SET_INBOX_LISTS:
            return {
                ...state,
                inboxLists: action.data,
            }
        case SET_INBOX:
            let data = action.data;
            let inbox = { ...state.inbox };

            if (data.hasOwnProperty('name')) {
                inbox.name = data.name
            }

            if (data.hasOwnProperty('id')) {
                inbox.id = data.id
            }

            if (data.hasOwnProperty('isDefault')) {
                inbox.isDefault = data.isDefault
            }

            if (data.hasOwnProperty('isActive')) {
                inbox.isActive = data.isActive
            }

            // if (data.hasOwnProperty('isCurrent')) {
            //     inbox.isCurrent = data.isCurrent
            // }

            return {
                ...state,
                inbox: inbox
            };
        case SET_SELECTED_INBOX:
            return {
                ...state,
                selectedInbox: { ...state.selectedInbox, ...action.data },
            }
        case INBOX_LISTS_IS_LOADING:
            return {
                ...state,
                inboxListsIsLoading: action.value,
            }
        case SET_CURRENT_ROW:
            return {
                ...state,
                currentRow: action.value,
            }
        case SET_LIST_ACTION:
            return {
                ...state,
                listAction: action.value,
            }
        case SET_FIELDS:
            return {
                ...state,
                fields: action.value,
            }
        default:
            return state;
    }
}

export const updateListIsLoading = (value) => ({ type: LIST_IS_LOADING, value: value });
export const updateFieldsIsLoading = (value) => ({ type: FIELDS_IS_LOADING, value: value });
export const listSetData = (data) => ({ type: LIST_SET_DATA, data: data });
export const updateShowInboxesDialog = (value) => ({ type: SHOW_INBOXES_DIALOG, value: value });
export const updateShowInboxDialog = (value) => ({ type: SHOW_INBOX_DIALOG, value: value })
export const updateSelectedTodo = (value) => ({ type: CHECK_SELECTED_TODO, value: value })
export const updateSelectedColumns = (value) => ({ type: SET_SELECTED_COLUMNS, value: value })
export const updateInboxLists = (data) => ({ type: SET_INBOX_LISTS, data: data })
export const updateInbox = (data) => ({ type: SET_INBOX, data: data })
export const updateSelectedInbox = (data) => ({ type: SET_SELECTED_INBOX, data: data })
export const updateInboxListsIsLoading = (value) => ({ type: INBOX_LISTS_IS_LOADING, value: value })
export const updateCurrentRow = (value) => ({ type: SET_CURRENT_ROW, value: value })
export const updateListAction = (value) => ({ type: SET_LIST_ACTION, value: value })
export const updateFields = (value) => ({ type: SET_FIELDS, value: value })
export const updateExcelLoading = (value) => ({ type: EXCEL_LOADING, value: value });

export const getInboxLists = (selectedTodo, user, showAlert) => (dispatch) => {
    dispatch(updateInboxListsIsLoading(true));
    dispatch(updateShowInboxesDialog(true));
    return inboxAPI.getInboxLists(selectedTodo, user)
        .then(response => {
            dispatch(updateInboxLists({
                myInboxData: response.myInboxData,
                systemInboxData: response.systemInboxData,
                otherInboxData: response.otherInboxData
            }))
        })
        .catch(error => {
            showAlert(`Не удалось загрузить список представлений. Ошибка: ${error}`, 'error', 'Не удалось загрузить список представлений.');
        })
        .finally(() => {
            dispatch(updateInboxListsIsLoading(false));
        });
}

export const getInboxData = (selectedInbox, user, selectedTodo, showAlert, sortByField, sortByOrder, contentId, module, autoSelect) => (dispatch) => {
    if (!user) {
        history.push(`/login`);
        return;
    }
    dispatch(updateListIsLoading(true));
    return inboxAPI.getInboxData(selectedInbox, user, selectedTodo, sortByField, sortByOrder)
        .then(response => {
            let records = response.records;
            let coloringFormatted = getColoringFormatted(response.coloring, response.fields);

            if (coloringFormatted.length > 0) {
                records.forEach((record) => {
                    let color = null;

                    for (let coloringEl of coloringFormatted) {
                        try {
                            let checkResult = new Function('record', `return ${coloringEl.condition}`)(record);
                            if (checkResult) {
                                color = coloringEl.color;
                                break;
                            }
                        } catch (e) {
                            console.log('Ошибка выполнения подсветки ', e)
                        }
                    }
                    record.color = color;
                })
            }

            dispatch(updateSelectedInbox({
                name: response.name,
                id: response.id,
                columns: getColumns(response.columns),
                uniqueKey: response.uniqueKey,
                viewName: response.viewName,
                itemsCount: response.itemsCount,
                maxSysmodtime: response.maxSysmodtime,
                needRefresh: false
            }));
            dispatch(listSetData({ records: records })); //, page: page 

            if (response.records.length > 0 && !(contentId && module) && autoSelect !== false) {
                let id = selectedTodo == 'dit_p_sd_all' ? response.records[0].INCIDENT_ID : response.records[0].NUMBER;
                dispatch(updateCurrentRow({ index: 0, key: id }));
                history.push(`/index/module/${id}`);
            }

            dispatch(updateListIsLoading(false));
        })
        .catch(error => {
            console.log('getInboxData error=', error);
            showAlert(`Не удалось получить данные по представлению ${selectedInbox.id} (getList). Ошибка: ${error}`, 'error', 'Не удалось получить данные по представлению');
            dispatch(updateListIsLoading(false));
        });
}

export const checkNeedRefresh = () => (dispatch, getState) => {
    const selectedInbox = getState().list.selectedInbox;
    return inboxAPI.getMaxSysmodtime(selectedInbox, getState().root.user)
        .then(response => {
            //console.log('response.maxSysmodtime=', response.maxSysmodtime);
            //console.log('selectedInbox.maxSysmodtime=', selectedInbox.maxSysmodtime);

            if (response.maxSysmodtime != selectedInbox.maxSysmodtime && !selectedInbox.needRefresh) {
                dispatch(updateSelectedInbox({
                    needRefresh: true
                }));
            }
        })
        .catch(error => {
            console.log('getMaxSysmodtime error=', error);
        });
}

export const getDefaultInboxId = (selectedTodo, showAlert, user) => (dispatch) => {
    //dispatch(updateListIsLoading(true));
    if (!selectedTodo) {
        showAlert(`Не удалось получить представление по умолчанию. Ошибка: представление не выбрано`, 'error', 'Не удалось получить представление по умолчанию');
        return;
    }

    if (!user) {
        history.push(`/login`);
        return;
    }

    return inboxAPI.getDefaultInboxId(selectedTodo, user.login)
        .then(response => {
            dispatch(updateSelectedInbox({
                id: response.id,
                smartFilter: null,
                additionalFilter: []//null
            }));
            //dispatch(updateListIsLoading(false));
        })
        .catch(error => {
            console.log('getDefaultInboxId error=', error);
            showAlert(`Не удалось получить представление по умолчанию. Ошибка: ${error}`, 'error', 'Не удалось получить представление по умолчанию');
            dispatch(updateListIsLoading(false));
        })
        .finally(() => {
            dispatch(getFields(selectedTodo));
        });
}

export const getFields = (selectedTodo) => (dispatch) => {
    dispatch(updateFieldsIsLoading(true));
    return inboxAPI.getFields(selectedTodo)
        .then(response => {
            dispatch(updateFields(response));
            dispatch(updateFieldsIsLoading(false));
        })
        .catch(error => {
            console.log('getFields error: ' + JSON.stringify(error), error);
            dispatch(updateFieldsIsLoading(false));
        });
}

// TODO: сделать сообщение с подтверждением удаления представления
export const deleteInbox = (id, showAlert, inboxLists) => (dispatch) => {
    return inboxAPI.deleteInbox(id, { params: { id: id } })
        .then(response => {
            if (response === true) {
                dispatch(updateInboxLists({
                    ...inboxLists,
                    myInboxData: inboxLists.myInboxData.filter(n => n._id !== id)
                }));
            }
        })
        .catch(error => {
            console.log('deleteInbox error: ' + JSON.stringify(error), error);
            showAlert(`Ошибка удаления представления. Ошибка: ${error}`, 'error', 'Ошибка удаления представления');
        });
}

// получение данных обьекта-представления по id
export const getInbox = (id, showAlert, updateQueryBuilder, setColoring) => (dispatch) => {
    return inboxAPI.getInbox(id)
        .then(response => {
            if (response) {
                updateQueryBuilder({
                    queryTree: response.queryTree,
                    queryColumns: response.columns
                })
                dispatch(updateInbox({
                    id: id,
                    name: response.name,
                    isActive: response.isActive,
                    isDefault: response.isDefault,
                    //isCurrent: response.isCurrent
                }));
                setColoring(response.coloring);
                dispatch(updateShowInboxDialog(true));
            }
        })
        .catch(error => {
            //console.log('getInbox error=', error);
            showAlert(`Ошибка получения представления (getInbox). Ошибка: ${error}`, 'error', 'Ошибка получения представления');
        });
}

export const saveInbox = (data, showAlert, updateQueryBuilder, user, setColoring, selectedInbox, selectedTodo) => (dispatch) => {
    const newInboxData = {
        queryTree: data.queryTree,
        viewName: data.selectedTodo,
        name: data.inboxName,
        sql: data.sqlFormat,
        columns: data.queryColumns,
        _id: data._id,
        type: 'user',
        user: user.login,
        coloring: data.coloring,
        isActive: data.isActive,
        isDefault: data.isDefault,
        //isCurrent: data.isCurrent
    };

    return inboxAPI.saveInbox(newInboxData)
        .then(response => {
            if (response && response.success) {
                showAlert('Представление успешно сохранено.', 'success', 'Представление успешно сохранено');
                updateQueryBuilder({
                    queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
                    queryColumns: []
                });
                dispatch(updateInbox({
                    id: null,
                    name: '',
                    //isCurrent: false,
                    isDefault: false,
                    isActive: true
                }));
                setColoring([{
                    queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
                    color: null
                }]);
                dispatch(getInboxLists(selectedTodo, user.login, showAlert));
                dispatch(updateShowInboxDialog(false));
                if (selectedInbox.id === response.data._id) {
                    dispatch(getInboxData(selectedInbox, user, selectedTodo, showAlert));
                }
            } else {
                showAlert('Ошибка добавления представления.', 'error', 'Ошибка добавления представления');
            }
        })
        .catch(error => {
            console.log('error=', error);
            showAlert(`Ошибка добавления представления. Ошибка: ${error}`, 'error', 'Ошибка добавления представления');
        });
}

export const getInboxList = (user, selectedTodo, showAlert) => (dispatch) => {
    dispatch(updateInboxListsIsLoading(true));
    dispatch(updateShowInboxesDialog(true));
    return inboxAPI.getInboxList(selectedTodo, user.login)
        .then(response => {
            if (response && response.myInboxData !== undefined && response.systemInboxData !== undefined && response.otherInboxData !== undefined) {
                dispatch(updateInboxLists({
                    myInboxData: response.myInboxData,
                    systemInboxData: response.systemInboxData,
                    otherInboxData: response.otherInboxData
                }));
            } else {
                showAlert('Не удалось загрузить список представлений. data is empty', 'error', 'Не удалось загрузить список представлений');
            }
        })
        .catch(error => {
            showAlert(`Не удалось загрузить список представлений (InboxesContainer getList). Ошибка: ${error}`, 'error', 'Не удалось загрузить список представлений');
        })
        .finally(() => {
            dispatch(updateInboxListsIsLoading(false));
        });
}

export const getExcel = (selectedInbox, user) => (dispatch, getState) => {
    let source = CancelToken.source();
    dispatch(updateExcelLoading({
        progressCount: 0,
        cancelTokenSource: source,
        isLoading: true
    }));
    let socket = environment === 'localhost' ? io(`${inboxAPI.socketIoUrl}?clientId=` + user.clientId, { transport : ['websocket'] }) : io(`${inboxAPI.socketIoUrl}?clientId=` + user.clientId, { transport : ['websocket'], path: '/mysocket' });
    socket.on('excelProgress', data => {
        //console.log('records loaded', data); 
        dispatch(updateExcelLoading({
            ...getState().list.excelLoading,
            progressCount: data.count
        }));
    });
    
    return inboxAPI.getExcel(selectedInbox, user, null, null, source.token, user.clientId) //cancelToken
        .then(data => {
            const url = window.URL.createObjectURL(new Blob([data], { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'export.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.log('getExcel error: ' + JSON.stringify(error), error);
        })
        .finally(() => {
            dispatch(updateExcelLoading({
                ...getState().list.excelLoading,
                isLoading: false,
                progressCount: 0
            }));
        });
}


export default listReducer;