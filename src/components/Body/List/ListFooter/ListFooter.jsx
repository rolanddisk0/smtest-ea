import React from 'react';
import s from './ListFooter.module.scss';

const ListFooter = () => {
  return (
    <div className={s.body}>
      <div className={s.product}>
        Название моего продукта
      </div>
      <div className={s.account}>
        УЗ ITSM-Системы
      </div>
    </div>
  );
}

export default ListFooter;