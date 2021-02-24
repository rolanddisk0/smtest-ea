import React, { useState } from 'react';
import s from '../Direction.module.scss';
import { Checkbox } from '@material-ui/core';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import GroupAffectedItemContainer from 'components/Dialogs/GroupAffectedItem/GroupAffectedItemContainer';

const GroupAffectedItemList = (props) => {
  const [showGroupAffectedItemDialog, setShowGroupAffectedItemDialog] = useState(false);
  const [groupAffectedItemDataIsLoading, setGroupAffectedItemDataIsLoading] = useState(false);

  const groupAffectedItemClick = (target) => {
      setShowGroupAffectedItemDialog(true);
      props.getGroupAffectedItem(target.textContent, setGroupAffectedItemDataIsLoading);
  }

  const columns = [
    {
      Header: 'Название',
      accessor: 'name',
      width: 300,
      Cell: e => <div onClick={ (e) => { groupAffectedItemClick(e.target) }} className={s.link}>{e.value}</div>
    },
    {
      Header: 'Заблокировано',
      id: 'isBlocked',
      accessor: d => {
        return <Checkbox disabled={true} checked={d.isBlocked} />
      }
    }
  ];

  return <>
    <GroupAffectedItemContainer open={showGroupAffectedItemDialog} handleClose={() => setShowGroupAffectedItemDialog(false)} dataIsLoading={groupAffectedItemDataIsLoading} />
    <ReactTableV6 data={props.listData} columns={columns} showPagination={true} />
  </>
}

export default GroupAffectedItemList;