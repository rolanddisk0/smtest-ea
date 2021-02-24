import React, { useState } from 'react';
import s from './Classification.module.scss';
import commonDataStyle from '../Data.module.scss';
import SectionLogo from 'assets/contentLogos/ClassificationSectionIcon.svg';
import DirectionContainer from 'components/Dialogs/Direction/DirectonContainer';
import GroupAffectedItemContainer from 'components/Dialogs/GroupAffectedItem/GroupAffectedItemContainer';
import CIContainer from 'components/Dialogs/CI/CIContainer';
import ServiceContainer from 'components/Dialogs/Service/ServiceContainer';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { Field, reduxForm, change } from 'redux-form';
import { SelectControl } from 'components/Forms/FormControls/SelectControl/SelectControl';

const Item_EditMode = (props) => {
    const onChange = (event) => {
        switch(props.fieldReduxName) {
            case 'direction':
                props.dispatch(change('fullContentForm', 'groupAffectedItem', null));
                props.dispatch(change('fullContentForm', 'affectedItem', null));
                props.dispatch(change('fullContentForm', 'service', null));
                props.dispatch(change('fullContentForm', 'kc', null));
                props.dispatch(change('fullContentForm', 'kcDisp', null));
                props.dispatch(change('fullContentForm', 'ck', null));
                props.dispatch(change('fullContentForm', 'ckInj', null));
                props.clearEditModeLists(['groupAffectedItemList', 'affectedItemList', 'serviceList']);
                const direction = event ? event.value : '';
                props.getEditModeList('groupAffectedItemList', {direction}).then(() => {
                    props.getEditModeList('kcList', {direction}).then(() => {
                        props.getEditModeList('ckList', {direction});      
                    });  
                });
                break;
            case 'groupAffectedItem':
                props.dispatch(change('fullContentForm', 'affectedItem', null));
                props.dispatch(change('fullContentForm', 'service', null));
                props.clearEditModeLists(['affectedItemList', 'serviceList']);
                props.getEditModeList('affectedItemList', {groupAffectedItem: event ? event.value : ''});
                break;
            case 'affectedItem':
                props.dispatch(change('fullContentForm', 'service', null));
                props.clearEditModeLists('serviceList');
                props.getEditModeList('serviceList', {affectedItem: event ? event.value : ''});
                break;
        }
    }

    return <>
        <div className={s.fieldNames}>{props.fieldName}:</div>
        <Field component={SelectControl} name={props.fieldReduxName} placeholder={props.fieldName} listData={props.list ? props.list.data : []} isLoading={props.list.isLoading || false}
            onChange={onChange} isDisabled={props.isDisabled} />
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

const Classification_EditMode = reduxForm({ form: 'fullContentForm' })((props) => {
    return <div className={`${s.gridClassification} ${s.gridClassificationEditMode}`}>
        <Item_EditMode fieldName='Направление' fieldReduxName='direction' list={props.editModeLists.directionList} isDisabled={props.data.direction.readOnly}
            dispatch={props.dispatch} clearEditModeLists={props.clearEditModeLists} getEditModeList={props.getEditModeList} />
        <Item_EditMode fieldName='Группа услуг' fieldReduxName='groupAffectedItem' list={props.editModeLists.groupAffectedItemList} 
            isDisabled={props.data.groupAffectedItem.readOnly} dispatch={props.dispatch} clearEditModeLists={props.clearEditModeLists} getEditModeList={props.getEditModeList} />
        <Item_EditMode fieldName='Услуга' fieldReduxName='affectedItem' list={props.editModeLists.affectedItemList} isDisabled={props.data.affectedItem.readOnly}
            dispatch={props.dispatch} clearEditModeLists={props.clearEditModeLists} getEditModeList={props.getEditModeList} />
        <Item_EditMode fieldName='Сервис' fieldReduxName='service' list={props.editModeLists.serviceList} isDisabled={props.data.service.readOnly} />
    </div>
});

const Classification_ReadOnlyMode = (props) => {
    const [showDirectionDialog, setShowDirectionDialog] = useState(false);
    const [showGroupAffectedItemDialog, setShowGroupAffectedItemDialog] = useState(false);
    const [showCIDialog, setShowCIDialog] = useState(false);
    const [showServiceDialog, setShowServiceDialog] = useState(false);
    const [directionDataIsLoading, setDirectionDataIsLoading] = useState(false);
    const [groupAffectedItemDataIsLoading, setGroupAffectedItemDataIsLoading] = useState(false);
    const [ciDataIsLoading, setCIDataIsLoading] = useState(false);
    const [serviceDataIsLoading, setServiceDataIsLoading] = useState(false);

    const directionClick = (target) => {
        setShowDirectionDialog(true);
        props.getDirection(target.textContent, setDirectionDataIsLoading);
    }

    const groupAffectedItemClick = (target) => {
        setShowGroupAffectedItemDialog(true);
        props.getGroupAffectedItem(target.textContent, setGroupAffectedItemDataIsLoading);
    }

    const affectedItemClick = (target) => {
        setShowCIDialog(true);
        props.getCI(target.textContent, setCIDataIsLoading);
    }

    const serviceClick = (target) => {
        setShowServiceDialog(true);
        props.getService(target.textContent, setServiceDataIsLoading);
    }

    return <>
        <DirectionContainer open={showDirectionDialog} handleClose={() => setShowDirectionDialog(false)} dataIsLoading={directionDataIsLoading} />
        <GroupAffectedItemContainer open={showGroupAffectedItemDialog} handleClose={() => setShowGroupAffectedItemDialog(false)} dataIsLoading={groupAffectedItemDataIsLoading} />
        <CIContainer open={showCIDialog} handleClose={() => setShowCIDialog(false)} dataIsLoading={ciDataIsLoading} setCIDataIsLoading={setCIDataIsLoading} />
        <ServiceContainer open={showServiceDialog} handleClose={() => setShowServiceDialog(false)} dataIsLoading={serviceDataIsLoading} />

        <div className={s.gridClassification}>
            <Item_ReadOnlyMode fieldName='Направление' value={props.data.direction.value} onClick={(e) => directionClick(e.target)} />
            <Item_ReadOnlyMode fieldName='Группа услуг' value={props.data.groupAffectedItem.value} onClick={(e) => groupAffectedItemClick(e.target)} />
            <Item_ReadOnlyMode fieldName='Услуга' value={props.data.affectedItem.value} onClick={(e) => affectedItemClick(e.target)} />
            <Item_ReadOnlyMode fieldName='Сервис' value={props.data.service.value} onClick={(e) => serviceClick(e.target)} />
        </div>
    </>
}

const Classification = (props) => {
    return <>
        <div className={`${s.content} ${commonDataStyle.sectionBlock}`}>
            <div className={commonDataStyle.sectionIconCell}>
                <img src={SectionLogo} className={commonDataStyle.sectionIcon} alt='SectionLogo' />
            </div>
            <div className={s.grid}>
                <div className={s.sectionName}>Классификация</div>
                {props.isEditModeEnabled
                    ? <Classification_EditMode data={props.data} editModeLists={props.editModeLists} clearEditModeLists={props.clearEditModeLists} 
                        getEditModeList={props.getEditModeList} />
                    : <Classification_ReadOnlyMode data={props.data} getDirection={props.getDirection} getGroupAffectedItem={props.getGroupAffectedItem}
                        getCI={props.getCI} getService={props.getService} />}
            </div>
        </div>
    </>;
}

export default Classification;