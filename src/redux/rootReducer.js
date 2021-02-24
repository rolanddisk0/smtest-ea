import { userAPI } from '../api/user';
import history from 'redux/history';
import { reset } from 'redux-form';
import Cookie from 'js-cookie';
import { getInboxData, getDefaultInboxId } from 'redux/listReducer';
import { getContent } from 'redux/mainPageContentReducer';
import { catalogDataAPI } from '../api/catalog-data-api';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const USER_IS_CREATING = 'USER_IS_CREATING';
const USER_IS_LOGGING = 'USER_IS_LOGGING';
const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_GLOBAL_VARS = 'SET_GLOBAL_VARS';

let initialState = {
  initialized: false, //Приложение инициализировано?
  user: null, // Текущий пользователь
  userIsCreating: false,
  userIsLogging: false,
  isGlobalVarsReceived: false,
  globalVariables: {}, //Глобальные переменные, в том числе из SM (gl, global variables)
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.value,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      }
    case USER_IS_CREATING:
      return {
        ...state,
        userIsCreating: action.value,
      }
    case USER_IS_LOGGING:
      return {
        ...state,
        userIsLogging: action.value,
      }
    case SET_INITIALIZED:
      return {
          ...state,
          initialized: action.value || false,
      }
    case SET_GLOBAL_VARS:
      return {
        ...state,
        isGlobalVarsReceived: true,
        globalVariables: { ...action.data },
      }
    default:
      return state;
  }
}

export const loginSuccess = (value) => ({ type: LOGIN_SUCCESS, value: value });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const setUserIsCreating = (value) => ({ type: USER_IS_CREATING, value });
export const setUserIsLogging = (value) => ({ type: USER_IS_LOGGING, value });
export const setInitialized = (value) => ({ type: SET_INITIALIZED, value });
export const setGlobalVars = (data) => ({ type: SET_GLOBAL_VARS, data });

export const signupUser = (user, showAlert) => (dispatch) => {
  dispatch(setUserIsCreating(true));
  userAPI.signupUser(user)
    .then(data => {
      if (data.success) {
        showAlert(`Пользователь успешно создан.`, 'success', 'Пользователь успешно создан');
        dispatch(reset('registerForm'));
        history.push('/login');
      } else {
        showAlert(`Не удалось зарегистрировать Пользователя. ${data.message}`, 'error', 'Не удалось зарегистрировать Пользователя');
      }
    })
    .catch(error => {
      console.log('error: ' + JSON.stringify(error), error);
      showAlert(`Не удалось зарегистрировать Пользователя. Ошибка: ${error}`, 'error', 'Не удалось зарегистрировать Пользователя');
    })
    .finally(() => dispatch(setUserIsCreating(false)));
}

//TODO: Пароль в открытом виде передается? Надо шифровать как-то
export const signinUser = (user, showAlert) => (dispatch) => {
  dispatch(setUserIsLogging(true));
  userAPI.signinUser(user)
    .then(data => {
      if (data.success) {
        Cookie.set('token', data.accessToken);
        Cookie.set('userId', data.id); //Для повторной аутентификации при рефреше страницы или копипасте пути
        data.clientId = 'client' + new Date().getTime(); //id клиента для socket.io
        dispatch(loginSuccess(data));
        history.push('/index');
      } else {
        showAlert(`Не удалось осуществить вход. ${data.message}`, 'error', 'Не удалось осуществить вход');
      }
    })
    .catch(error => {
      console.log('error: ' + JSON.stringify(error), error);
      showAlert(`Не удалось осуществить вход. Ошибка: ${error}`, 'error', 'Не удалось осуществить вход');
    })
    .finally(() => dispatch(setUserIsLogging(false)));
}

export const signoutUser = (showAlert, resetMainPageContentState) => (dispatch) => {
  userAPI.signoutUser()
    .then(data => {
      if (data.success) {
        Cookie.remove('token');
        Cookie.remove('userId');
        dispatch(setInitialized(false));
        resetMainPageContentState();
        logoutSuccess();
        history.push('/login');
      } else {
        showAlert(`Не удалось осуществить выход. ${data.message}`, 'error', 'Не удалось осуществить выход');
      }
    })
    .catch(error => {
      console.log('error: ' + JSON.stringify(error), error);
      showAlert(`Не удалось осуществить выход. Ошибка: ${error}`, 'error', 'Не удалось осуществить выход');
    })
}

//Повторная аутентификация юзера, если вход в систему под ним уже был выполнен и была произведена перезагрузка страницы или открытие в новой вкладке
const reSigninUser = (userId) => (dispatch) => {
  return userAPI.signinUser({userId})
    .then(data => {
      if (data.success) {
        Cookie.set('token', data.accessToken); //По идее он должен уже быть, но я не уверен, возможно он может потереться или измениться, лучше пока присвою
        data.clientId = 'client' + new Date().getTime(); //id клиента для socket.io
        dispatch(loginSuccess(data));
      } else {
        history.push('/login');
        console.log(`Не удалось переинициализировать пользователя. Ошибка: ${data.message}`);
      }
    })
    .catch(error => {
      history.push('/login');
      console.log(`Не удалось переинициализировать пользователя. Ошибка: ${error}`);
    })
}

export const initializeApp = (showAlert, contentId, module, loadingSubProps) => (dispatch, getState) => {
  const userId = Cookie.get('userId');
  if (userId) { 
    const reSigninPromise = dispatch(reSigninUser(userId));

    reSigninPromise.then(() => {
      const user = getState().root.user;
      const selectedTodo = getState().list.selectedTodo;
      
      loadingSubProps.setIsInitListStartLoading(true);
      const getDefaultInboxIdPromise = dispatch(getDefaultInboxId(selectedTodo, showAlert, user));
      getDefaultInboxIdPromise.then(() => {
        const getInboxDataPromise = dispatch(getInboxData(getState().list.selectedInbox, user, selectedTodo, showAlert, null, null, contentId, module));
        // const selectedInboxId = getState().list.selectedInbox.id;
        // const getInboxDataPromise = dispatch(getInboxData(selectedInboxId, user, selectedTodo, showAlert, 1, 50, null, null, contentId, module));
        if (getInboxDataPromise) {
          getInboxDataPromise.then(() => {
            loadingSubProps.setIsInitListLoadComplete(true);
            loadingSubProps.setIsContentListStartLoading(true); 
  
            //NOTE: Возможно, имеет смысл сразу диспатчить айдишник и не вычислять его таким образом
            const getId = () => {
              const listData = getState().list.listData;
              if (!listData || !listData[0]) { return null; }
              return selectedTodo == 'dit_p_sd_all' ? listData[0].INCIDENT_ID : listData[0].NUMBER;
            }
            const id = contentId || getId();
            if (!id) { dispatch(setInitialized(true)); return; }
  
            const getContentPromise = dispatch(getContent(id, showAlert));
            Promise.all([getContentPromise]).then(() => {
              loadingSubProps.setIsContentListLoadComplete(true);
              dispatch(setInitialized(true)); 
            });
          });
        } else {
          dispatch(setInitialized(true));
        }
      });
    });  
  } else {
    //Тут пока нет логики, поэтому просто сразу ставим пометку об инициализации
    dispatch(setInitialized(true));
  }
}

export const getGlobalVars = () => (dispatch) => {
  return catalogDataAPI.getGlobalVars()
      .then(data => {
          dispatch(setGlobalVars(data));
      })
      .catch(error => {
          console.error(`Не удалось загрузить глобальные переменные. Ошибка: ${error}`);
      })
}

export default rootReducer;