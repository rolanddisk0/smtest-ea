import axios from 'axios';
import { httpErrorHandler } from 'utils/errors';
import Cookie from 'js-cookie';
import history from 'redux/history';
const cfg = require('../config/config');
const environment = cfg.environment; //Среда. В зависимости от среды будут разные адреса. На проде нужен 1 порт на все сервисы, на локалхосте много портов, для каждого свой

const instance = axios.create({
  baseURL: environment === 'localhost' ? cfg.microservicesUrl + ':4006' : cfg.microservicesUrl,
});

instance.interceptors.request.use(function (config) {
  config.headers['x-access-token'] = Cookie.get('token');
  config.headers['x-user-id'] = Cookie.get('userID');
  return config;
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401 || error.response.status === 403) {
    history.push('/login');
  }
  return Promise.reject(error);
});

export const catalogDataAPI = {
  getDirectionPath: 'sm/dev/hlp/direction/getItem/',
  getGroupAffectedItemPath: '/sm/dev/hlp/svcgrp/getItem/',
  getCIPath: '/sm/dev/hlp/svc/getItem/',
  getServicePath: '/sm/dev/hlp/func/getItem/',
  getDataListWithPaginationPath: '/sm/dev/hlp/data/getList',
  getContactPath: '/sm/dev/hlp/contact/getItem/',
  getCKPath: '/sm/dev/hlp/ck/getItem/',
  getKCPath: '/sm/dev/hlp/kc/getItem/',
  getSMActionFieldsDataPath: '/sm/dev/hlp/smaction/fdata/',
  getGlobalVarsPath: '/sm/dev/hlp/globalVars',
  preloadEditModeListsPath: '/sm/dev/hlp/preloadEditModeLists/',
  sdTplDataPath: '/sm/dev/hlp/sdTplData/',
  lastCreatedSdListPath: '/sm/dev/hlp/lastCreatedSdList',
  workflowMetaPath: '/sm/dev/hlp/workflowMeta/',

  getDirection(direction) {
    return instance.get(this.getDirectionPath + encodeURIComponent(direction)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getGroupAffectedItem(groupAffectedItem) {
    return instance.get(this.getGroupAffectedItemPath + encodeURIComponent(groupAffectedItem)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getCI(ci) {
    return instance.get(this.getCIPath + encodeURIComponent(ci)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getService(service) {
    return instance.get(this.getServicePath + encodeURIComponent(service)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },

  //Получение данных с поддержкой пагинации
  getDataList(page = 1, maxCount = 0, recordId, area, startFromRecord, recordNewVals = {}, filename) {
    const paginationStep = 1000;
  
    return instance.get(this.getDataListWithPaginationPath, {
      params: {
        maxCount,
        paginationStep,
        page,
        startFromRecord,
        recordId,
        area,
        recordNewVals,
        filename
      } 
    }).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },

  getContact(contact) {
    return instance.get(this.getContactPath + encodeURIComponent(contact)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getCK(ck) {
    return instance.get(this.getCKPath + encodeURIComponent(ck)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getKC(kc) {
    return instance.get(this.getKCPath + encodeURIComponent(kc)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  getSMActionFieldsData(smAction, recordId, additionalParams) {
    let query = `${this.getSMActionFieldsDataPath}${recordId}/${encodeURIComponent(smAction)}`;

    let body = {};
    if (additionalParams) {
      body.paramsNames = [];
      body.paramsValues = [];
      for (let key in additionalParams) {
        body.paramsNames.push(key);
        body.paramsValues.push(additionalParams[key]);
      }

      query += `/${JSON.stringify(body)}`;
    }

    return instance.get(query)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      })
  },
  getGlobalVars() {
    return instance.get(this.getGlobalVarsPath).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },
  preloadEditModeLists(recordId) {
    return instance.get(this.preloadEditModeListsPath + recordId).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },

  getSdTplData(tplName) {
    return instance.get(this.sdTplDataPath + encodeURIComponent(tplName)).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  },

  getLastCreatedSdList() {
    return instance.get(this.lastCreatedSdListPath).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  }, 

  getWorkflowMeta(recordId) {
    return instance.get(this.workflowMetaPath + recordId).then(response => {
      httpErrorHandler(response.status);
      return response.data;
    })
  }, 
}