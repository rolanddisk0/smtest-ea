import React from 'react';
import Select from 'react-select';
import { isObject } from 'utils/custom';

export const SelectControl = ({ input, meta, listData, isLoading, selectedValue, isDisabled, ...props }) => {
    listData = listData || [];
    selectedValue = selectedValue || null;
    isDisabled = isDisabled || false;
    const noOptionsMessage = 'Данные не найдены';
    const loadingMessage = 'Загрузка данных...';

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

    const optionsObjArray = getOptionsArray(listData);

    const hasError = meta.touched && meta.error;
    const errorStyles = {
        control: (base) => ({
            ...base,
            '&:hover': { borderColor: 'red' },
            border: '1px solid red',
            boxShadow: 'none',
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: 'red',
            }
        }
    };

    return <Select {...input} {...props} noOptionsMessage={() => noOptionsMessage} loadingMessage={() => loadingMessage} isClearable={true}
            onChange={value => input.onChange(value)} onBlur={() => input.onBlur(input.value)} options={optionsObjArray} isLoading={isLoading || false} 
            styles={hasError && errorStyles} isDisabled={isDisabled} />
}