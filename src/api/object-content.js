import axios from 'axios';
import { httpErrorHandler, smAPIErrorHandler } from 'utils/errors';
import Cookie from 'js-cookie';
import history from 'redux/history';

const cfg = require('../config/config');
const environment = cfg.environment; //Среда. В зависимости от среды будут разные адреса. На проде нужен 1 порт на все сервисы, на локалхосте много портов, для каждого сво
const instance = axios.create({
  baseURL: environment === 'localhost' ? cfg.microservicesUrl + ':4004' : cfg.microservicesUrl
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
  /*const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return axios.get('/api/v1/auth', {headers: {'Authorization': 'Bearer ' + getRefreshToken()}})
      .then((responseData) => {
        setTokens(responseData.data.access_token, responseData.data.refresh_token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
        originalRequest.headers['Authorization'] = 'Bearer ' + getToken();
        return axios(originalRequest);
      }).catch(function (error) {
        console.log(error);
        setTokens(undefined, undefined);
        window.location.pathname = "/login";
      });
  }*/
  return Promise.reject(error);
});

export const objectContentAPI = {
  _sdPath: 'sm/dev/rec/sd/item/',
  _imPath: 'sm/dev/rec/im/item/',
  _cPath: 'sm/dev/rec/cm3/item/',
  _downloadAttachmentPath: 'sm/dev/rec/att/',

  _getPath(area) {
    switch (area) {
      case 'SD':
        return this._sdPath;
      case 'IM':
        return this._imPath;
      case 'C':
        return this._cPath;
      default:
        return null;
    }
  },

  getContent(id, area) {
    return instance.get(this._getPath(area) + id)
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      });
  },

  putContent(id, paramsNames, paramsValues, area, action = 'execSmAction') {
    return instance.put(this._getPath(area) + id, {
      paramsNames: paramsNames,
      paramsValues: paramsValues,
      action,
    }).then(response => {
      httpErrorHandler(response.status);
      smAPIErrorHandler(response.data);
      return response.data;
    });
  },

  createSD(interaction, createType) {
    return instance.post(this._getPath('SD'), { ...interaction, createType }).then(response => {
      httpErrorHandler(response.status);
      smAPIErrorHandler(response.data);
      return response.data;
    });
  },

  downloadAttachment(recordId, uid, area) {
    return instance.get(`${this._downloadAttachmentPath}${area}/${recordId}/${uid}`, {
      responseType: 'blob',
    })
      .then(response => {
        httpErrorHandler(response.status);
        return response.data;
      });
  },
}