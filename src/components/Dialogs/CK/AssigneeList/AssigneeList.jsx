import React from 'react';
import s from '../CK.module.scss';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';

const AssigneeList = (props) => {
  const contactClick = (target) => {
    props.setShowContactDialog(true);
    props.getContact(target.textContent, props.setContactDataIsLoading);
}
  
  const data = props.data.map(assignee => ({name: assignee})); //Преобразуем данные для отрисовки

  const columns = [
    {
      Header: 'Инженер ЦК',
      accessor: 'name',
      width: 300,
      Cell: e =><div onClick={(e) => { contactClick(e.target) }} className={s.link}>{e.value}</div>
    }
  ];

  return <ReactTableV6 data={data} columns={columns} showPagination={true}/>;
}

export default AssigneeList;