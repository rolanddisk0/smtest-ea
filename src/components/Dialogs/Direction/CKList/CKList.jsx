import React, { useState } from 'react';
import s from '../Direction.module.scss';
import { Checkbox } from '@material-ui/core';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import CKContainer from 'components/Dialogs/CK/CKContainer';

const CKList = (props) => {
  const [showCKDialog, setShowCKDialog] = useState(false);
  const [ckDataIsLoading, setCKDataIsLoading] = useState(false);

  const ckClick = (target) => {
    setShowCKDialog(true);
    props.getCK(target.textContent, setCKDataIsLoading);
  }

  const columns=[
    {
      Header: 'Название',
      accessor: 'name',
      width: 300,
      Cell: e =><div onClick={ (e) => { ckClick(e.target) }} className={s.link}>{e.value}</div>
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
    <CKContainer open={showCKDialog} handleClose={() => setShowCKDialog(false)} dataIsLoading={ckDataIsLoading} />
    <ReactTableV6 data={props.data} columns={columns} showPagination={true} />
  </>;
}

export default CKList;