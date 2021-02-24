import React from 'react';
import s from '../KC.module.scss';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';

const DirectionList = (props) => {
  const directionClick = (target) => {
    props.setShowDirectionDialog(true);
    props.getDirection(target.textContent, props.setDirectionDataIsLoading);    
}

  const data = props.data.map(direction => ({name: direction})); //Преобразуем данные для отрисовки
  
  const columns = [
    {
      Header: 'Направление',
      accessor: 'name',
      width: 300,
      Cell: e =><div onClick={ (e) => { directionClick(e.target) }} className={s.link}>{e.value}</div>
    }
  ];

  return <ReactTableV6 data={data} columns={columns} showPagination={true}/>;
}

export default DirectionList;