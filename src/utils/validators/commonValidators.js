export const required = value => {
    if (value) return undefined;
    return 'Заполните это поле';
}

export const digitsOnly = value => {
    if (value === null || value === undefined || Number.isInteger(+value)) return undefined;
    return 'Введите число';
}

export const maxDigitValue = (maxValue) => value => {
    if (value === null || value === undefined || Number.isInteger(+value) && +value <= maxValue) return undefined;
    return `Максимум ${maxValue}`;
}

export const minDigitValue = (minValue) => value => {
    if (value === null || value === undefined || Number.isInteger(+value) && +value >= minValue) return undefined;
    return `Минимум ${minValue}`;
}