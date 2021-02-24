import Moment from 'moment'

//TODO есть ли возможность перенести в redux
/*export const getCurrentRecordId = function (tabs) {
  const tabsetNode = tabs.getActiveTabset();
  const selectedIndex = tabsetNode._attributes.selected;
  const childrens = tabsetNode._children;

  if (childrens.length > 0 && childrens[selectedIndex]) {
    return childrens[selectedIndex]._attributes.id;
  }

  return 'empty';
}*/


export const getLocalizedDate = function (date) {
  //var localized = 'нет';
  var localized = null;

  if (date) {
    localized = Moment(date)
      .local()
      .format('DD-MM-YYYY HH:mm:ss')
  }

  return localized;
}

export const getSMDateFormat = function (date) {
  var localized = 'нет';

  if (date) {
    localized = Moment(date)
      .local()
      .format('DD/MM/YY HH:mm:ss')
  }

  return localized;
}

//Какие бы данные не пришли, функция берет за основу данные из initialState
//Позволяет не заморачиваться над структурой и порядком входящих данных - отрисовывается теперь все по одной схеме
//Теперь данные с бека не поломают фронт - УРА (надеюсь =) )
export const mergeObjectExistFields = (newData, initData) => {
  let retData = { ...initData };
  if (!newData) { return retData; } //Если вместо данных пришел undefined

  for (let key in retData) {
    if (newData[key] !== undefined) { retData[key] = newData[key]; }
  }

  return retData;
}

// проверка обьекта на пустоту
export const isEmpty = (obj) => {
  if (!obj) {
    return true;
  }
  for (let key in obj) {
    return false;
  }

  return true;
}

//Получает имя файла записи по номеру (Пока что в русском переводе. Если понадобится имя таблицы, можно будет параметр добавить)
export const getFilenameById = (id) => {
  const reFilename = id.match(/(\D+)\d+/);
  switch (RegExp.$1) {
    case 'IM':
      return 'Инцидент';
    case 'C':
      return 'Изменение';
    case 'SD':
      return 'Обращение';
    case 'P':
      return 'Проблема';
    default:
      return null;
  }
}

//Получает префикс номера файла
export const getRecordNumberPrefix = (id) => {
  if (!id) { return null; }
  id.match(/(\D+)\d+/);
  return RegExp.$1;
}

export const viewNameMapping = { // TODO: Глобаллисты?
  dit_p_sd_all: 'Обращения',
  dit_p_im_all: 'Инциденты',
  dit_p_cm3_all: 'Изменения'
}

export const isObject = (val) => {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
}

//Получает наименование ИД-поля файла
export const getIdField = (selectedTodo) => {
  let field;

  switch (selectedTodo) {
    case 'dit_p_sd_all':
      field = 'INCIDENT_ID';
      break;
    case 'dit_p_im_all':
      field = 'NUMBER';
      break;
    case 'dit_p_cm3_all':
      field = 'NUMBER';
      break;
    default:
      field = 'NUMBER';
      break;
  }

  return field;
}

//Одинаковы ли массивы
export const arrayEquals = (a, b) => {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}