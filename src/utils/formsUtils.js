import { isObject } from 'utils/custom';

//Постобработка значений от react-select
export const getReactSelectControlValues = (reactSelectValues) => {
    if (reactSelectValues && isObject(reactSelectValues)) {
        let retValues = {...reactSelectValues};

        for (var key in retValues) {
            if (isObject(retValues[key])) { retValues[key] = retValues[key].value }
        }
        return retValues;
    } else { return reactSelectValues; }
}

//Формат даты из DatePicker к формату, понятному SM
export const formatDatetimeLocalToSMDate = (datetime) => {
    return `${datetime.slice(8, 10)}/${datetime.slice(5, 7)}/${datetime.slice(2, 4)} ${datetime.slice(11, 13)}:${datetime.slice(14, 16)}`;
}