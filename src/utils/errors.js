//import React from 'react';

//TODO: Скорее всего обработчик ошибок пишется как-то по-другому, но пока что он в таком виде.

export const httpErrorHandler = (statusCode, messageText) => {
  if (messageText) { throw messageText; }
  if (statusCode !== 200 && statusCode !== 201) { throw (getHttpError(statusCode)); }
}

export const smAPIErrorHandler = (data) => {
  if (!data || !data.ditMFSMAPI) { throw ('SM API ERROR: Не удалось получить данные'); }
  if (data.ditMFSMAPI.Status !== 'SUCCESS') { 
    const error = getSmAPIErrorHandler(data.ditMFSMAPI.Status);
    const messages = Array.isArray(data.Messages) && data.Messages.length > 0 ? `${data.Messages}` : '';
    const response = Array.isArray(data.ditMFSMAPI.Response) && data.ditMFSMAPI.Response.length > 0 ? `${data.ditMFSMAPI.Response}` : '';

    console.log(`${error}\nResponse: ${response}\nMessages: ${messages}`);
    throw (messages || error); 
  }
}

const getHttpError = (statusCode) => {
  switch (statusCode) {
    case 204:
      return 'Данные не найдены';
    default:
      return `Неопознанная ошибка (Код ошибки: ${statusCode})`;
  }
}

const getSmAPIErrorHandler = (status) => {
  switch (status) {
    case 'ERROR: Change is not found':
      return 'SM API ERROR: Изменение не найдено';
    case 'ERROR: Change cannot be denied':
      return 'SM API ERROR: Изменение не может быть отклонено';
    case 'ERROR: Change cannot be agreed':
      return 'SM API ERROR: Изменение не может быть согласовано';
    case 'ERROR: Unable to find approval':
      return 'SM API ERROR: Не удается найти утверждение';
    case 'ERROR: No descriptions found':
      return 'SM API ERROR: Описание не найдено';
    case 'ERROR: Record is not found':
      return 'SM API ERROR: Запись не найдена';
    case 'ERROR: Found uninitialized variables in action condition':
      return 'SM API ERROR: Найдены неинициализированные переменные, пожалуйста, обратитесь к администраторам системы!';
    case 'ERROR: Missing parameters':
      return 'SM API ERROR: Не заполнены обязательные параметры';
    case 'ERROR: SMAction is not found':
      return 'SM API ERROR: Действие не найдено';
    case 'ERROR: Action is not allowed':
      return 'SM API ERROR: Действие не может быть выполнено';
    case 'ERROR: Failed to complete SMAction':
      return 'SM API ERROR: Ошибка при выполнении действия';
    case 'ERROR: Failed to create SMRecord':
      return 'SM API ERROR: Ошибка создания записи';
    case 'ERROR: Failed to update SMRecord':
      return 'SM API ERROR: Ошибка обновления записи';
    case 'ERROR: Record creation prohibited':
      return 'SM API ERROR: Нет прав для создания записи';
    case 'ERROR: REST action is not defined':
      return 'SM API ERROR: Даннное REST действие не определено в API';
    case 'ERROR: Not consistent parameters':
      return 'SM API ERROR: Неконсистентные параметры';
    case 'ERROR: Record is locked':
      return 'SM API ERROR: Запись заблокирована. Пожалуйста, повторите попытку позже';
    case 'ERROR: Filename is not supported':
      return 'SM API ERROR: Используемая таблица не поддерживается API';
    case 'ERROR: Create record error':
      return 'SM API ERROR: Ошибка создания записи таблицы';
    case 'ERROR: Record creation is prohibited':
      return 'SM API ERROR: Создание записи таблицы запрещено';
    case 'ERROR: Cant find workflow phase/workflow record':
      return 'SM API ERROR: Не удается найти фазу и/или рабочий процесс';
    default:
      return `SM API ERROR: Неопознанная ошибка (Код ошибки: ${status})`;
  }
}