import { mergeObjectExistFields } from '../utils/custom';
import { catalogDataAPI } from '../api/catalog-data-api';

const DIRECTION_SET_DATA = 'DIRECTION_SET_DATA';
const GROUP_AFFECTED_ITEM_SET_DATA = 'GROUP_AFFECTED_ITEM_SET_DATA';
const SERVICE_SET_DATA = 'SERVICE_SET_DATA';
const CI_SET_DATA = 'CI_SET_DATA';
const CONTACT_SET_DATA = 'CONTACT_SET_DATA';
const CK_SET_DATA = 'CK_SET_DATA';
const KC_SET_DATA = 'KC_SET_DATA';

let initialState = {
    directionData: {
        direction: '',
        responsibleContact: '',
        coord: '',
        product: '',
        ckList: [],
        kcList: [],
        groupAffectedItemList: [],
    },
    groupAffectedItemData: {
        direction: '',
        name: '',
        responsibleContact: '',
        coord: '',
        isBlocked: false,
        managers: [],
        additionalInfo: '',
    },
    ciData: {
        commonData: {
            category: '',
            type: '',
            logicalName: '',
            fullName: '',
            status: '',
            direction: '',
            groupAffectedItem: '',
        },
        assignmentData: {
            product: '',
            adminGroup: '',
            ciOwner: '',
            responsibleGroup: '',
            curator: '',
            ownerOrg: '',
            baseTransfer: '',
            controlLevel: '',
            usageStart: '',
            severity: '',
            restrictedCategories: []
        },
        links: {
            up: [],
            down: []
        }
    },
    serviceData: {
        service: '',
        affectedItem: '',
        affectedCIs: [],
    },
    contactData: {
        data: {
            lastName: '',
            firstName: '',
            middleName: '',
            product: '',
            position: '',
            manager: '',
            internalPhone: '',
            internalPhoneExt: '',
            mobilePhone: '',
            emailFirst: '',
            emailSecond: '',
            loginSM: '',
            kcList: [],
        },
        org: {
            dept: '',
            deptShort: '',
            fullStructure: '',
            oiv: '',
        },
        location: {
            location: '',
            region: '',
            district: '',
        },
    },
    ckData: {
        name: '',
        coord: '',
        isBlocked: false,
        assignees: [],
        directionList: [],
    },
    kcData: {
        name: '',
        manager: '',
        isBlocked: false,
        directionList: [],
    },
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIRECTION_SET_DATA:
            return {
                ...state,
                directionData: mergeObjectExistFields(action.value, initialState.directionData),
            }
        case GROUP_AFFECTED_ITEM_SET_DATA:
            return {
                ...state,
                groupAffectedItemData: mergeObjectExistFields(action.value, initialState.groupAffectedItemData),
            }
        case CI_SET_DATA:
            return {
                ...state,
                ciData: {
                    ...state.ciData,
                    commonData: mergeObjectExistFields(action.value, initialState.ciData.commonData),
                    assignmentData: mergeObjectExistFields(action.value, initialState.ciData.assignmentData),
                    links: {
                        ...state.ciData.links,
                        up: action.value.links.up || [],
                        down: action.value.links.down || [],
                    }
                }
            }
        case SERVICE_SET_DATA:
            return {
                ...state,
                serviceData: mergeObjectExistFields(action.value, initialState.serviceData),
            }
        case CONTACT_SET_DATA:
            return {
                ...state,
                contactData: {
                    ...state.contactData,
                    data: mergeObjectExistFields(action.value, initialState.contactData.data),
                    org: mergeObjectExistFields(action.value.org, initialState.contactData.org),
                    location: mergeObjectExistFields(action.value.location, initialState.contactData.location),
                }
            }
        case CK_SET_DATA:
            return {
                ...state,
                ckData: mergeObjectExistFields(action.value, initialState.ckData),
            }
        case KC_SET_DATA:
            return {
                ...state,
                kcData: mergeObjectExistFields(action.value, initialState.kcData),
            }
        default:
            return state;
    }
}

export const directionSetData = (value) => ({ type: DIRECTION_SET_DATA, value });
export const groupAffectedItemSetData = (value) => ({ type: GROUP_AFFECTED_ITEM_SET_DATA, value });
export const ciSetData = (value) => ({ type: CI_SET_DATA, value });
export const serviceSetData = (value) => ({ type: SERVICE_SET_DATA, value });
export const contactSetData = (value) => ({ type: CONTACT_SET_DATA, value });
export const ckSetData = (value) => ({ type: CK_SET_DATA, value });
export const kcSetData = (value) => ({ type: KC_SET_DATA, value });

export const getDirection = (direction, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getDirection(direction).then(data => dispatch(directionSetData(data)))
        .catch(error => {
            showAlert(`Не удалось загрузить данные по Направлению ${direction}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по Направлению');
        })
        .finally(() => setDataIsLoading(false));
}

export const getGroupAffectedItem = (groupAffectedItem, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getGroupAffectedItem(groupAffectedItem)
        .then(data => dispatch(groupAffectedItemSetData(data)))
        .catch(error => {
            showAlert(`Не удалось загрузить данные по Группе услуг ${groupAffectedItem}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по Группе услуг');
        })
        .finally(() => setDataIsLoading(false));
}

export const getCI = (ci, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getCI(ci)
        .then(data => {
            dispatch(ciSetData(data))
        })
        .catch(error => {
            showAlert(`Не удалось загрузить данные по КЕ ${ci}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по КЕ');
        })
        .finally(() => setDataIsLoading(false));
}

export const getService = (service, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getService(service)
        .then(data => dispatch(serviceSetData(data)))
        .catch(error => {
            showAlert(`Не удалось загрузить данные по Сервису ${service}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по Сервису');
        })
        .finally(() => setDataIsLoading(false));
}

export const getContact = (contact, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getContact(contact)
        .then(data => {
            dispatch(contactSetData(data))
        })
        .catch(error => {
            showAlert(`Не удалось загрузить данные по Контакту ${contact}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по Контакту');
        })
        .finally(() => setDataIsLoading(false));
}

export const getCK = (ck, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getCK(ck).then(data => dispatch(ckSetData(data)))
        .catch(error => {
            showAlert(`Не удалось загрузить данные по ЦК ${ck}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по ЦК');
        })
        .finally(() => setDataIsLoading(false));
}

export const getKC = (kc, showAlert, setDataIsLoading) => (dispatch) => {
    setDataIsLoading(true);
    catalogDataAPI.getKC(kc).then(data => dispatch(kcSetData(data)))
        .catch(error => {
            showAlert(`Не удалось загрузить данные по КЦ ${kc}. Ошибка: ${error}`, 'error', 'Не удалось загрузить данные по КЦ');
        })
        .finally(() => setDataIsLoading(false));
}

export default dialogReducer;
