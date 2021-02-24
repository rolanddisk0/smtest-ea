import { catalogDataAPI } from '../api/catalog-data-api';

const MORE_DIALOG_SET_TITLE = 'MORE_DIALOG_SET_TITLE';
const MORE_DIALOG_PUSH_DATA = 'MORE_DIALOG_PUSH_DATA';
const MORE_DIALOG_CLEAR_DATA = 'MORE_DIALOG_CLEAR_DATA';
const MORE_DIALOG_SET_COUNT = 'MORE_DIALOG_SET_COUNT';

let initialState = {
    moreDialog: {
        title: '',
        totalCount: 0,
        data: [],
    },
};

const rightMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case MORE_DIALOG_SET_TITLE:
            return {
                ...state,
                moreDialog: {
                    ...state.moreDialog,
                    title: action.title,
                }
            }
        case MORE_DIALOG_PUSH_DATA:
            return {
                ...state,
                moreDialog: {
                    ...state.moreDialog,
                    data: [...state.moreDialog.data, ...action.data],
                }
            }
        case MORE_DIALOG_CLEAR_DATA:
            return {
                ...state,
                moreDialog: {
                    ...state.moreDialog,
                    data: [],
                    totalCount: 0,
                }
            }
        case MORE_DIALOG_SET_COUNT:
            return {
                ...state,
                moreDialog: {
                    ...state.moreDialog,
                    totalCount: action.totalCount,
                }
            }
        default:
            return state;
    }
}

const moreDialogSetTitle = (title = '') => ({ type: MORE_DIALOG_SET_TITLE, title });
export const moreDialogPushData = (data = []) => ({ type: MORE_DIALOG_PUSH_DATA, data });
const moreDialogClearData = () => ({ type: MORE_DIALOG_CLEAR_DATA });
const moreDialogSetCount = (totalCount = 0) => ({ type: MORE_DIALOG_SET_COUNT, totalCount });

//NOTE: Запрос не прервется, пока не выгрузит все данные. 
//При необходимости прерывания запроса (А она по-хорошему нужна хотя бы при закрытии диалога) смотреть в сторону Axios Cancel Token
export const getDataMoreList = (showAlert, setDataIsLoading, recordId, area, maxCount) => (dispatch) => {
    const getAreaInfo = area => {
        switch (area) {
            case 'Направление':
                return {
                    errorText: 'Не удалось загрузить список Направлений (По кнопке "Еще.."). Подробности в консоли.',
                    errorTitle: 'Не удалось загрузить список Направлений',
                }
            case 'Группа услуг':
                return {
                    errorText: 'Не удалось загрузить список Групп услуг (По кнопке "Еще.."). Подробности в консоли.',
                    errorTitle: 'Не удалось загрузить список Групп услуг',
                }
            case 'Услуга':
                return {
                    errorText: 'Не удалось загрузить список Услуг (По кнопке "Еще.."). Подробности в консоли.',
                    errorTitle: 'Не удалось загрузить список Услуг',
                }
            case 'Сервис':
                return {
                    errorText: 'Не удалось загрузить список Сервисов (По кнопке "Еще.."). Подробности в консоли.',
                    errorTitle: 'Не удалось загрузить список Сервисов',
                }
            default:
                return null;
        }
    };
    
    const info = getAreaInfo(area);
    if (!info) {
        showAlert(`Не удалось получить информацию об области ${area} (Для правой панели).`, 'error', 'Не удалось получить информацию об области');
        return null;
    }

    const getDataPortion = (page, maxCount, startFromRecord) => {
        catalogDataAPI.getDataList(page, maxCount, recordId, area, startFromRecord).then(data => {
            dispatch(moreDialogSetCount(data.totalCount));
            dispatch(moreDialogPushData(data.data));
            if (!data.isGettingDataComplete) {
                getDataPortion(page + 1, maxCount, data.data[data.data.length - 1]); //Продолжаем получать записи с последней полученной, пока не получим их все
            } else { setDataIsLoading(false); }
        })
        .catch(error => {
            setDataIsLoading(false);
            showAlert(info.errorText, 'error', info.errorTitle);
        })
    }

    let page = 1;
    setDataIsLoading(true);
    dispatch(moreDialogClearData()); //Очищаем список - будем его перезагружать
    dispatch(moreDialogSetTitle(area));
    getDataPortion(page, maxCount); //Берем данные по кусочкам
}

export default rightMenuReducer;