import { createStore, combineReducers, applyMiddleware } from 'redux';
import headerReducer from './headerReducer';
import mainPageContentReducer from './mainPageContentReducer';
import listReducer from './listReducer';
import rootReducer from './rootReducer';
import dialogReducer from './dialogReducer';
import { connectRouter } from 'connected-react-router';
import uiElementsReducer from './uiElements';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import doSMActionReducer from './doSMActionReducer';
import rightMenuReducer from './rightMenuReducer';
import history from './history'

let reducers = combineReducers({
    router: connectRouter(history),
    mainPageContent: mainPageContentReducer,
    header: headerReducer,
    list: listReducer,
    root: rootReducer,
    uiElements: uiElementsReducer,
    dialog: dialogReducer,
    form: formReducer,
    smAction: doSMActionReducer,
    rightMenu: rightMenuReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store; //TODO: DEBUG LINE

export default store;