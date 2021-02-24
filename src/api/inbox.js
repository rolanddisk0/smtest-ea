import axios from 'axios';
import { httpErrorHandler } from 'utils/errors';
import Cookie from 'js-cookie';
import history from 'redux/history';
const cfg = require('../config/config');
const environment = cfg.environment; //Среда. В зависимости от среды будут разные адреса. На проде нужен 1 порт на все сервисы, на локалхосте много портов, для каждого свой
const url = environment === 'localhost' ? cfg.microservicesUrl + ':4008' : cfg.microservicesUrl;
const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(function (config) {
  config.headers['x-access-token'] = Cookie.get('token');
  config.headers['x-user-id'] = Cookie.get('userID');
  return config;
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log('error=', error);
  if (error.response.status === 401 || error.response.status === 403) {
    history.push('/login');
  }
  return Promise.reject(error);
});

const joinSql = (obj) => {
  let sql = obj[0].sql;

  for (let i = 1; i < obj.length; i++) {
    sql += ' AND ' + obj[i].sql;
  }

  return sql;
};

const getFilters = (selectedInbox, user, selectedTodo) => {
  const smartFilter = selectedInbox.smartFilter;
  const additionalFilter = selectedInbox.additionalFilter;
  const advancedFilter = selectedInbox.advancedFilter;

  let result = user.scaccessFilters ? user.scaccessFilters[selectedTodo] : true;
  result = smartFilter ? `(${result}) and (${smartFilter})` : result;
  result = additionalFilter && additionalFilter.length > 0 ? `(${result}) and (${joinSql(additionalFilter)})` : result;
  result = advancedFilter && advancedFilter.sql ? `(${result}) and (${advancedFilter.sql})` : result;

  return result;
}

export const inboxAPI = {
  getInboxListsPath: 'sm/dev/view/getList/',
  getInboxDataPath: 'sm/dev/view/getItemData/',
  getMaxSysmodtimePath: 'sm/dev/view/getMaxSysmodtime/',
  getDefaultInboxIdPath: 'sm/dev/view/getDefaultItemId/',
  getFieldsPath: 'sm/dev/view/getFields/',
  deleteInboxPath: 'sm/dev/view/deleteItem/',
  getInboxPath: 'sm/dev/view/getItem/',
  saveInboxPath: 'sm/dev/view/setItem/',
  getInboxListPath: 'sm/dev/view/getList/',
  getExcelPath: 'sm/dev/view/getExcel/',
  socketIoUrl: url,

  getInboxLists(selectedTodo, user) {
    return instance.get(this.getInboxListsPath + selectedTodo + '/' + user)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },
  getMaxSysmodtime(selectedInbox, user) {
    console.log('getMaxSysmodtime');
    const id = selectedInbox.id;
    const data = {};
    data.filter = getFilters(selectedInbox, user, selectedInbox.viewName);

    return instance.post(this.getMaxSysmodtimePath + id + '/' + user.name, data).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getInboxData(selectedInbox, user, selectedTodo, sortByField, sortByOrder) {
    //console.log('getInboxData');
    //getInboxData(selectedInbox, user, sortByField, sortByOrder) {
    //console.log('getInboxData selectedInbox=', selectedInbox);
    const id = selectedInbox.id;
    const page = selectedInbox.pageConfig.pageIndex + 1;
    const limit = selectedInbox.pageConfig.pageSize;
    const data = {};
    data.filter = getFilters(selectedInbox, user, selectedTodo);

    return instance.post(this.getInboxDataPath + id + '/' + user.name + `?page=${page || 1}` + (limit ? `&limit=${limit}` : '')
      + (sortByField ? `&sortByField=${sortByField}` : '') + (sortByOrder ? `&sortByOrder=${sortByOrder}` : '')
      , data).then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  getDefaultInboxId(selectedTodo, userName) {
    return instance.get(this.getDefaultInboxIdPath + selectedTodo + '/' + userName)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  getFields(selectedTodo) {
    return instance.get(this.getFieldsPath + selectedTodo)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  deleteInbox(id, data) {
    return instance.delete(this.deleteInboxPath + id, data)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  getInbox(id) {
    return instance.get(this.getInboxPath + id)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  saveInbox(data) {
    return instance.post(this.saveInboxPath, data)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  getInboxList(selectedTodo, login) {
    return instance.get(this.getInboxListPath + selectedTodo + '/' + login)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },

  getExcel(selectedInbox, user, sortByField, sortByOrder, cancelToken, clientId) {
    const id = selectedInbox.id;
    const data = {};
    data.filter = getFilters(selectedInbox, user, selectedInbox.viewName);
    data.clientId =  clientId;

    return instance.post(this.getExcelPath + id + '/' + user.name, data, { responseType: 'blob', cancelToken: cancelToken })
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  }
}