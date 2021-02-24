import React from 'react';
import s from '../Contact.module.scss';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';

const KCList = (props) => {
  const kcClick = (target) => {
    props.setShowKCDialog(true);
    props.getKC(target.textContent, props.setKCDataIsLoading);
  }

  const data = props.data.map(kc => ({name: kc})); //Преобразуем данные для отрисовки

  const columns = [
    {
      Header: 'Название',
      accessor: 'name',
      Cell: e =><div onClick={ (e) => { kcClick(e.target) }} className={s.link}>{e.value}</div>,
      className: s.kcList
    },
  ];

  return <ReactTableV6 data={data} columns={columns} showPagination={true}/>;
}

export default KCList;