import axios from 'axios';
import { httpErrorHandler } from 'utils/errors';

const cfg = require('../config/config');
const environment = cfg.environment; //Среда. В зависимости от среды будут разные адреса. На проде нужен 1 порт на все сервисы, на локалхосте много портов, для каждого свой

const instance = axios.create({
  baseURL: environment === 'localhost' ? cfg.microservicesUrl + ':4001' : cfg.microservicesUrl
});

export const userAPI = {
  signupUserPath: 'sm/dev/api/auth/signup/', // создать нового пользователя в базе данных
  signinUserPath: 'sm/dev/api/auth/signin/', // авторизация
  signoutUserPath: 'sm/dev/api/auth/signout/',
  getUserPath: 'sm/dev/api/auth/getuser/:id',

  async signupUser(user) {
    return instance.post(this.signupUserPath, user, {
      validateStatus: function (status) {
        return true; //status == 422 || status == 401;
      }
    })
      .then(response => {
        httpErrorHandler(response.status, response.data.messageText);
        return response.data;
      })
  },

  async signinUser(user) {
    return instance.post(this.signinUserPath, user, {
      validateStatus: function (status) {
        return true;
      }
    })
      .then(response => {
        httpErrorHandler(response.status, response.data.messageText);
        return response.data;
      })
  },

  async signoutUser(user) {
    return instance.post(this.signoutUserPath, user, {
      validateStatus: function (status) {
        return true;
      }
    })
      .then(response => {
        httpErrorHandler(response.status, response.data.messageText);
        return response.data;
      })
  }
}