import React, { useEffect, useState } from 'react';
import s from './App.module.scss';
import theme from './Theme.module.scss';
import Header from './components/Header/Header';
import BodyContainer from './components/Body/BodyContainer';
import { Route } from 'react-router-dom';
import HomeContainer from './components/Home/HomeContainer';
import { ConnectedRouter } from 'connected-react-router';
import history from './redux/history';
import RegisterContainer from './components/Register/RegisterContainer';
import LoginContainer from './components/Login/LoginContainer';
import { initializeApp } from 'redux/rootReducer';
import { checkNeedRefresh } from 'redux/listReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withAlert } from 'hoc/withAlert';
import { withRouter } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import config from 'config/config';

const InitializationScreen = (props) => {
  return <div className={s.initializationGrid}>
    <div className={s.initializationSpinnerContainer}><CircularProgress size={80} color='secondary' /></div>
    <div className={s.initializationTextContainer}>
      <div><span className={s.initializationText}>Пожалуйста, подождите, идет инициализация приложения</span></div>
      {props.isInitListStartLoading && <div>
        <span className={s.initializationSubText}>Загружаем представления...</span>
        {props.isInitListLoadComplete 
          ? <DoneIcon style={{ color: green[500], fontSize: 20 }} /> 
          : <CircularProgress size={15} />}
      </div>}
      {props.isContentListStartLoading && <div>
        <span className={s.initializationSubText}>Загружаем данные Service Manager...</span>
        {props.isContentListLoadComplete 
          ? <DoneIcon style={{ color: green[500], fontSize: 20 }} /> 
          : <CircularProgress size={15} />}
      </div>}
    </div>
  </div>;
}

const Main = (props) => {
  const [isInitListStartLoading, setIsInitListStartLoading] = useState(false);
  const [isInitListLoadComplete, setIsInitListLoadComplete] = useState(false);
  const [isContentListStartLoading, setIsContentListStartLoading] = useState(false);
  const [isContentListLoadComplete, setIsContentListLoadComplete] = useState(false);
  const loadingSubProps = { setIsInitListStartLoading, setIsInitListLoadComplete, setIsContentListStartLoading, setIsContentListLoadComplete }
  const refreshTodo = () => {
      props.checkNeedRefresh(props.selectedInbox, props.user, props.selectedTodo);
  }

  //Сначала я думал инициализацию делать в App компоненте. Но сейчас, по сути, нам не нужна инициализация для логин скрина.
  //+ Я хочу попробовать засунуть получения левой и правой части в единую инициализацию, а при логин скрине такое делать не очень как-то
  useEffect(() => {
    props.initializeApp(props.showAlert, props.match.params.contentId, props.match.params.module, loadingSubProps);
  }, []);

  //отправка запросов на сервер для обновления 
  useEffect(() => {
    if (config.refresh.todo.enabled && props.user) {
      const interval = setInterval(() => {
        refreshTodo();
      }, config.refresh.todo.interval * 1000);
      return () => clearInterval(interval);
    }
  }, [props.user])

  if (!props.initialized) {
    return <InitializationScreen isInitListStartLoading={isInitListStartLoading} isInitListLoadComplete={isInitListLoadComplete}
      isContentListStartLoading={isContentListStartLoading} isContentListLoadComplete={isContentListLoadComplete} />;
  }

  return <div className={`${s.content} ${theme}`}>
    <div className={s.grid}>
      <Header />
      <div className={s.body}>
        <BodyContainer />
      </div>
    </div>
  </div>
}

const mapStateToProps = (state) => ({
  initialized: state.root.initialized,
  user: state.root.user,
  selectedInbox: state.list.selectedInbox,
  selectedTodo: state.list.selectedTodo
})

const MainContainer = compose(
  connect(mapStateToProps, { initializeApp, checkNeedRefresh}),
  withRouter,
  withAlert
)(Main);

const App = (props) => {
  return <ConnectedRouter history={history}>
    <Route exact path='/' component={HomeContainer} />
    <Route exact path='/index/:module?/:contentId?' component={MainContainer} />
    <Route path='/register' component={RegisterContainer} />
    <Route path='/login' component={LoginContainer} />
  </ConnectedRouter>;

}

export default App;