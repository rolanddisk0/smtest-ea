import React, { useState } from 'react';
import s from './RightArea.module.scss';
import commonHeaderStyle from '../Header.module.scss';
import AlertIcon from 'assets/headerImgs/Alert.svg';
import SupportIcon from 'assets/headerImgs/Support.svg';
import BackIcon from 'assets/headerImgs/arrow_left.png';
import AlertDialogContainer from './AlertDialog/AlertDialogContainer';
//import { useHistory } from 'react-router-dom';
import User from './User/User';
import SupportDialogContainer from './SupportDialog/SupportDialogContainer';

const RightArea = (props) => {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [showSupportDialog, setShowSupportDialog] = useState(false);
    //const history = useHistory();
    const alertMarker = props.newAlertMarker ? <div className={commonHeaderStyle.alertMarker}></div> : null;
    const alertClick = () => setShowAlertDialog(true);
    const supportClick = () => {
        setShowSupportDialog(true);
        props.setCreateSdRepeatDataIsLoading(true);
        props.clearCreateSdAllLists();
        props.createSdDetailedDataClear();
        props.setCreateSdDetailDataIsLoading(true);
        props.getSdCreateList('sdTplList', null, true).then(() => {
            props.getSdCreateList('directionList').finally(() => {
                props.setCreateSdDetailDataIsLoading(false);
                props.getLastCreatedSdList();
            });
        });
    }
    const backButtonStyle = props.isGoBackActive ? commonHeaderStyle.clickable : commonHeaderStyle.inactive;
    const goBack = () => {
        if (props.isGoBackActive) {
            //history.goBack();
            props.goBack();
        }
    }

    return <div className={s.content}>
        <AlertDialogContainer open={showAlertDialog} handleClose={() => setShowAlertDialog(false)} />
        <SupportDialogContainer open={showSupportDialog} handleClose={() => setShowSupportDialog(false)} />
        <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.round} ${backButtonStyle}
            ${s.containerShort}`} onClick={goBack}
        >
            <img src={BackIcon} alt='BackIcon' />
        </div>
        <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.round} 
            ${s.containerShort} ${commonHeaderStyle.clickable}`} onClick={supportClick}
        >
            <img src={SupportIcon} alt='SupportIcon' />
        </div>
        <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.round} ${s.containerShort} 
            ${commonHeaderStyle.alertable} ${commonHeaderStyle.clickable}`} onClick={alertClick}
        >
            <img src={AlertIcon} alt='AlertIcon' />
            {alertMarker}
        </div>
        <User />
    </div>

}

export default RightArea;