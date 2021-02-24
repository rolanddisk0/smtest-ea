import { catalogDataAPI } from '../api/catalog-data-api';
import { getRecordNumberPrefix } from 'utils/custom';

const SMACTION_SET_FIELDS_DATA = 'SMACTION_SET_FIELDS_DATA';
const SMACTION_CLEAR_FIELDS_DATA = 'SMACTION_CLEAR_FIELDS_DATA';

let initialState = {
    sd: {
        'Применить шаблон': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                templateList: [],
            },
        },
        'Передать Инженеру': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Передать Руководителю КЦ': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Продолжить регистрацию': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Вернуть на доработку': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Вернуть в КЦ': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                returnReasonsList: [],
            },
        },
        'Зарегистрировать': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Запрос доп. информации': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Закрыть': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                closureTitleList: [],
            },
        },
        'Выполнить': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                resolutionCodeList: [],
            },
        },
        'Маршрутизировать': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                assignmentList: [],
                assigneeList: [],
                cTemplateList: [],
            },
        },
    },

    im: {
        'Создать Проблему': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                logicalNameList: [],
                severityList: [],
            },
        },
        'Отложить': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                reasonList: [],
            },
        },
        'Направить в группу': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Отклонить': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'В работу': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Выполнить': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                codesList: [],
                subjList: []
            },
        },
        'Вернуть на доработку': {
            isSMActionDialogNeeded: true,
            isFieldsAvailListsLoadNeeded: true,
            fAvailVals: {
                codesList: [],
            },
        },
    },

    c: { //TODO: Пока что не прорабатывал действия, требующие заполнение формы. Кейсы с плюсиками не требуют заполнения форм и по сути уже готовы к использованию
        'К регистрации': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'К анализу': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'К планированию': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'На утверждение': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'К назначению': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Приостановить': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'В работу': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Выполнить': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Закрыть Запрос на Изменение': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Вернуть на доработку': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Новое задание': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Открытые задания': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Изменить шаблон': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Вернуть в ЦК': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Крайний срок': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Вернуть стандартный крайний срок': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Согласовать': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Не согласовать': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Утвердить': { //+
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
        'Отклонить': {
            isSMActionDialogNeeded: false,
            isFieldsAvailListsLoadNeeded: false,
            fAvailVals: {},
        },
    },
};

const doSMActionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SMACTION_SET_FIELDS_DATA':
            return { 
                ...state, 
                [action.area]: { 
                    ...state[action.area],
                    [action.smAction]: {
                        ...state[action.area][action.smAction],
                        fAvailVals: action.data
                    }
                }
            };
        case 'SMACTION_CLEAR_FIELDS_DATA':
            return { 
                ...state, 
                [action.area]: { 
                    ...state[action.area],
                    [action.smAction]: {
                        ...state[action.area][action.smAction],
                        fAvailVals: initialState[action.area][action.smAction].fAvailVals
                    }
                }
            };
        default:
            return state;
    }
}


const setSMActionFieldsData = (smAction, area, data) => ({ type: SMACTION_SET_FIELDS_DATA, smAction, area, data });
const setClearSMActionFieldsData = (smAction, area) => ({ type: SMACTION_CLEAR_FIELDS_DATA, smAction, area });

export const getSMActionFieldsData = (smAction, recordId, showAlert, setDataIsLoading, additionalParams) => (dispatch) => {
    const area = getRecordNumberPrefix(recordId).toLowerCase();
    setDataIsLoading(true);
    catalogDataAPI.getSMActionFieldsData(smAction, recordId, additionalParams).then(data => dispatch(setSMActionFieldsData(smAction, area, data)))
    .catch(error => {
        showAlert(`Не удалось загрузить данные для полей для текущего действия ${smAction}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные для полей для действия');
    })
    .finally(() => setDataIsLoading(false));
}

export const clearSMActionFieldsData = (smAction, recordId) => (dispatch) => {
    const area = getRecordNumberPrefix(recordId).toLowerCase();
    dispatch(setClearSMActionFieldsData(smAction, area));
}


export default doSMActionReducer;