import React, { useState } from 'react';
import s from './SMActionBtns.module.scss';
import Button from '@material-ui/core/Button';
import SMActionContainer from 'components/Dialogs/SMAction/SMActionContainer';

const SMActionBtns = (props) => {
    const [showSMActionDialog, setShowSMActionDialog] = useState(false);
    const [smActionFieldsDataIsLoading, setSMActionFieldsDataIsLoading] = useState(false);
    const [smAction, setSMAction] = useState(null);

    const doAction = smAction => {
        const isNeededInfo = props.getIsNeedInfo(smAction);
        if (isNeededInfo.isSMActionDialogNeeded) {
            props.clearSMActionFieldsData(smAction); //Очищаем старые списки данных
            setSMAction(smAction); //Обновляем название обрабатываемого действия
            if (isNeededInfo.isFieldsAvailListsLoadNeeded) {
                props.getSMActionFieldsData(smAction, setSMActionFieldsDataIsLoading); //Получаем списки значений полей
            }
            setShowSMActionDialog(true); //Открываем диалог
        } else {
            props.execSMAction(smAction);
        }
    }

    //Элементы кнопок smAction
    const smActionBtnsElements = props.btns.map(btn => {
        return <div className={s.smActionBtn} key={btn.name}>
            <Button variant='contained' color='primary' onClick={e => doAction(e.currentTarget.value)} fullWidth value={btn.name}>{btn.name}</Button>
        </div>
    });

    return <>
        <SMActionContainer open={showSMActionDialog} handleClose={() => setShowSMActionDialog(false)} smAction={smAction} dataIsLoading={smActionFieldsDataIsLoading}
            getSMActionFieldsData={props.getSMActionFieldsData} clearSMActionFieldsData={props.clearSMActionFieldsData} area={props.area} id={props.id}/>

        {smActionBtnsElements}
    </>;
}

export default SMActionBtns;