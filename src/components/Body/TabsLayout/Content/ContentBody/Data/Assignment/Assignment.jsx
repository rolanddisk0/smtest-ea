import React, { useState } from 'react';
import s from './Assignment.module.scss';
import commonDataStyle from '../Data.module.scss';
import SectionLogo from 'assets/contentLogos/AssignmentSectionIcon.svg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import KCContainer from 'components/Dialogs/KC/KCContainer';
import CKContainer from 'components/Dialogs/CK/CKContainer';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';
import { Field, reduxForm, change, formValueSelector  } from 'redux-form';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { SelectControl } from 'components/Forms/FormControls/SelectControl/SelectControl';
import { AsyncSelectControl } from 'components/Forms/FormControls/AsyncSelectControl/AsyncSelectControl';
import { connect } from 'react-redux';

const Item_EditMode = (props) => {
    const getAsyncParams = (listName, inputField) => {
        const addParams = props.fieldReduxName === 'kcDisp' ? { kc: props.kcValue ? props.kcValue.value : null } : {};
        return  { defaultOptions: props.list.data, getDataPromise: props.getEditModeList, listName: listName, inputField: inputField, addParams }
    };
    const asyncParams = props.isAsync ? getAsyncParams(props.listName, props.fieldReduxName) : {};
    
    const onChange = (event) => {
        switch (props.fieldReduxName) {
            case 'kc':
                props.dispatch(change('fullContentForm', 'kcDisp', null));
                props.clearEditModeLists('dispKcList');
                props.getEditModeList('dispKcList', { kc: event ? event.value : '' }, true);
                break;
            case 'ck':
                props.dispatch(change('fullContentForm', 'ckInj', null));
                props.clearEditModeLists('ckInjList');
                props.getEditModeList('ckInjList', { ck: event ? event.value : '' });
                break;
        }
    }

    //Кеш отключен для AsyncSelectControl (Сейчас он только для kcDisp), так как при смене КЦ его надо как-то чистить, а с этим траблы и пока не получается
    const controlElement = props.isAsync
        ? <Field component={AsyncSelectControl} name={props.fieldReduxName} placeholder={props.fieldName} isLoading={props.list.isLoading || false} asyncParams={asyncParams} 
            isDisabled={props.isDisabled} />
        : <Field component={SelectControl} name={props.fieldReduxName} placeholder={props.fieldName} listData={props.list ? props.list.data : []} 
            isLoading={props.list.isLoading || false} onChange={onChange} isDisabled={props.isDisabled} />;

    return <>
        <div className={s.fieldNames}>{props.fieldName}:</div>
        {controlElement}
    </>;
}

const Item_ReadOnlyMode = (props) => {
    return <>
        <div className={s.fieldNames}>{props.fieldName}:</div>
        <div className={s.noOverflowTextContainer}>
            <LinkButton text={props.value} onClick={props.onClick} />
        </div>
    </>;
}

//Селектор и коннект только для своевременной передачи значения поля КЦ для правильной подгрузки списка диспетчеров КЦ
const selector = formValueSelector('fullContentForm');
const Assignment_EditMode = connect(state => ({ kcValue: selector(state, 'kc') }))(
    reduxForm({ form: 'fullContentForm' })((props) => {
        return <>
            <Item_EditMode fieldName='КЦ обработки' fieldReduxName='kc' list={props.editModeLists.kcList} dispatch={props.dispatch} clearEditModeLists={props.clearEditModeLists}
                getEditModeList={props.getEditModeList} isDisabled={props.data.kc.readOnly} />
            <Item_EditMode fieldName='Диспетчер КЦ' fieldReduxName='kcDisp' list={props.editModeLists.dispKcList} isAsync={true} listName='dispKcList'
                getEditModeList={props.getEditModeList} kcValue={props.kcValue} isDisabled={props.data.kcDisp.readOnly} />
            <Item_EditMode fieldName='ЦК' fieldReduxName='ck' list={props.editModeLists.ckList} dispatch={props.dispatch} clearEditModeLists={props.clearEditModeLists}
                getEditModeList={props.getEditModeList} isDisabled={props.data.ck.readOnly} />
            <Item_EditMode fieldName='Инженер ЦК' fieldReduxName='ckInj' list={props.editModeLists.ckInjList} isDisabled={props.data.ckInj.readOnly} />
        </>
    })
);

const Assignment_ReadOnlyMode = (props) => {
    const [showCKDialog, setShowCKDialog] = useState(false);
    const [showKCDialog, setShowKCDialog] = useState(false);
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);
    const [kcDataIsLoading, setKCDataIsLoading] = useState(false);
    const [ckDataIsLoading, setCKDataIsLoading] = useState(false);

    const onContactClick = (target) => {
        setShowContactDialog(true);
        props.getContact(target.textContent, setContactDataIsLoading);
    }

    const onKcClick = (target) => {
        setShowKCDialog(true);
        props.getKC(target.textContent, setKCDataIsLoading);
    }

    const onCkClick = (target) => {
        setShowCKDialog(true);
        props.getCK(target.textContent, setCKDataIsLoading);
    }

    return <>
        <CKContainer open={showCKDialog} handleClose={() => setShowCKDialog(false)} dataIsLoading={ckDataIsLoading} />
        <KCContainer open={showKCDialog} handleClose={() => setShowKCDialog(false)} dataIsLoading={kcDataIsLoading} />
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />

        <Item_ReadOnlyMode fieldName='КЦ обработки' value={props.data.kc.value} onClick={(e) => onKcClick(e.target)} />
        <Item_ReadOnlyMode fieldName='Диспетчер КЦ' value={props.data.kcDisp.value} onClick={(e) => onContactClick(e.target)} />
        <Item_ReadOnlyMode fieldName='ЦК' value={props.data.ck.value} onClick={(e) => onCkClick(e.target)} />
        <Item_ReadOnlyMode fieldName='Инженер ЦК' value={props.data.ckInj.value} onClick={(e) => onContactClick(e.target)} />
    </>
}

const Assignment = (props) => {
    return <>
        <div className={`${s.content} ${commonDataStyle.sectionBlock}`}>
            <div className={commonDataStyle.sectionIconCell}>
                <img src={SectionLogo} className={commonDataStyle.sectionIcon} alt='SectionLogo' />
            </div>
            <div className={s.grid}>
                <div>
                    <div className={s.sectionName}>Назначение</div>
                    <FormControlLabel disabled control={<Checkbox name='sendToCK' checked={props.data.sendToCk.value} />} label='Передано в ЦК' />
                </div>

                <div className={`${s.gridAssignmentItems} ${props.isEditModeEnabled && s.gridAssignmentEditMode}`}>
                    {props.isEditModeEnabled
                        ? <Assignment_EditMode data={props.data} editModeLists={props.editModeLists} clearEditModeLists={props.clearEditModeLists}
                            getEditModeList={props.getEditModeList} />
                        : <Assignment_ReadOnlyMode data={props.data} getContact={props.getContact} getCK={props.getCK} getKC={props.getKC} />}
                </div>
            </div>
        </div>
    </>;
}

export default Assignment;