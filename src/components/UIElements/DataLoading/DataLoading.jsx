import React from 'react';
import s from './DataLoading.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';


const DataLoading = (props) => {
  return <div className={s.initializationGrid}>
    <div className={s.initializationSpinnerContainer}><CircularProgress size={80} color='secondary' /></div>
    <div className={s.initializationTextContainer}>
      <div><span className={s.initializationText}>Загрузка данных</span></div>
    </div>
  </div>;
}

export default DataLoading;