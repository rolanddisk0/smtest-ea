const ENVIRONMENT = process.env.REACT_APP_DIT_ENV || 'localhost'; //Устанавливаем среду (localhost или берем smtest из системной переменной)

const BACKEND_URLS = new Map();
BACKEND_URLS.set('localhost', 'http://localhost');
BACKEND_URLS.set('smtest', 'http://212.11.155.226/smtest');

module.exports = {
    environment: ENVIRONMENT,
    microservicesUrl: BACKEND_URLS.get(ENVIRONMENT),
    refresh: {
        'todo': {
          'enabled': true,
          'interval': 20 // seconds
        }
    }
};