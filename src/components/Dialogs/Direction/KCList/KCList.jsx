import React, { useState } from 'react';
import s from '../Direction.module.scss';
import { Checkbox } from '@material-ui/core';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import KCContainer from 'components/Dialogs/KC/KCContainer';

const KCList = (props) => {
  const [showKCDialog, setShowKCDialog] = useState(false);
  const [kcDataIsLoading, setKCDataIsLoading] = useState(false);

  const kcClick = (target) => {
    setShowKCDialog(true);
    props.getKC(target.textContent, setKCDataIsLoading);
}
  
  const columns = [
    {
      Header: 'Название',
      accessor: 'name',
      width: 300,
      Cell: e =><div onClick={ (e) => { kcClick(e.target) }} className={s.link}>{e.value}</div>
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
    <KCContainer open={showKCDialog} handleClose={() => setShowKCDialog(false)} dataIsLoading={kcDataIsLoading} />
    <ReactTableV6 data={props.data} columns={columns} showPagination={true}/>
  </>;
}

export default KCList;