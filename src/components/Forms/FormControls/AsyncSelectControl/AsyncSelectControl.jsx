import React from 'react';
import AsyncSelect from 'react-select/async';
import { isObject } from 'utils/custom';

export const AsyncSelectControl = ({ input, meta, isLoading, asyncParams, cachEnabled, isDisabled, isMulti, ...props }) => {
    isDisabled = isDisabled || false;
    cachEnabled = cachEnabled !== undefined ? cachEnabled : true;
    asyncParams = asyncParams || {};
    isMulti = isMulti || false;
    const addParams = asyncParams.addParams || {};
    const noOptionsMessage = 'Данные не найдены. Для поиска введите как минимум 3 символа';
    const loadingMessage = 'Загрузка данных...';

    const filterResult = (list, inputValue) => list ? list.filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
    ) : [];

    const optionsObjArrayAsync = (listData) => listData.map(item => {
        if (isObject(item) && item.label && item.value) { return item; } //Если уже готовые данные переданы, ничего делать не надо

        //Иначе преобразуем value в отображаемые значения
        return {
            value: item,
            label: typeof item === 'string' ? item[0].toUpperCase() + item.substring(1) : item,
        }
    });

    const promiseOptions = inputValue => {
        return new Promise(resolve => {
            const getData = (inputValue) => {
                asyncParams.getDataPromise(asyncParams.listName, { [asyncParams.inputField]: inputValue, ...addParams }, true).then(data => {
                    resolve(optionsObjArrayAsync(filterResult(data, inputValue)));
                }).catch(err => {
                    //Если санка вернет реджект с причиной, что запрос уже выполняется, пробуем еще разок, таким образом ждем окончания запроса для получения
                    //новых актуальных данных при быстром наборе текста, чтобы не словить ошибку 401 вследствие переполнения активных сессий юзера
                   
                    //if (err === 'REQUEST_ALREADY_IN_PROGRESS') { setTimeout(getData, 1000, inputValue); }
                })
            }

            if (inputValue.length > 2) { getData(inputValue); } else { resolve([]); }
        });
    }

    const getOptionsArray = (list) => {
        return list ? list.map(item => {
            if (isObject(item) && item.label && item.value) { return item; } //Если уже готовые данные переданы, ничего делать не надо

            //Иначе преобразуем value в отображаемые значения
            return {
                value: item,
                label: typeof item === 'string' ? item[0].toUpperCase() + item.substring(1) : item,
            }
        }) : [];
    }

    const handleChange = (value) => {
        input.onChange(value);
    }

    const handleBlur = () => {
        input.onBlur(input.value);
    }
    
    const defaultOptions = getOptionsArray(asyncParams.defaultOptions);

    return <AsyncSelect {...input} {...props} noOptionsMessage={() => noOptionsMessage} loadingMessage={() => loadingMessage} isClearable={true} isLoading={isLoading || false}
        onChange={handleChange} onBlur={handleBlur} cacheOptions={cachEnabled} loadOptions={promiseOptions} 
        defaultOptions={defaultOptions} isDisabled={isDisabled} isMulti={isMulti}/>
}