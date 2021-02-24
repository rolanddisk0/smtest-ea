import React from 'react';
import s from '../Resolution.module.scss';
import commonDataStyle from '../../Data.module.scss';
import SectionLogoResolve from 'assets/contentLogos/ResoluctionSectionIcon_resolve.svg';
import { TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { TextFieldControl } from 'components/Forms/FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from 'components/Forms/FormControls/SelectControl/SelectControl';

const textFieldStyles = { style: { color: 'rgba(0, 0, 0, 0.65)' } }

const SimpleItem_ReadOnlyMode = (props) => {
    return <>
        <div className={s.fieldName}>{props.fieldName}:</div>
        <div><TextField fullWidth disabled value={props.value} variant='outlined' size='small' InputProps={textFieldStyles} /></div>
    </>;
}

const SimpleItem_EditMode = (props) => {
    return <>
        <div className={s.fieldName}>{props.fieldName}:</div>
        <div>
            <Field component={SelectControl} name={props.fieldReduxName} placeholder={props.fieldName} listData={props.list ? props.list.data : []} 
                isLoading={props.list.isLoading || false} isDisabled={props.isDisabled} />
        </div>
    </>;
}

const ResolutionData_ReadOnlyMode = (props) => {
    return <div>
        <div className={s.fieldsGrid}>
            <img src={SectionLogoResolve} className={commonDataStyle.sectionIcon} alt='SectionLogoResolve' />
            <div>
                <div className={s.gridFieldValue}>
                    <SimpleItem_ReadOnlyMode fieldName='Закрыто в КЦ или ЦК' value={props.data.closedCKKC.value} />
                    <SimpleItem_ReadOnlyMode fieldName='Код выполнения' value={props.data.resolutionCode.value} />
                </div>
            </div>
        </div>
        <div>Решение для пользователя:</div>
        <div>
            <TextField multiline rows={4} fullWidth disabled value={props.data.resolution.value} variant='outlined' size='small' InputProps={textFieldStyles} />
        </div>
    </div>
}

const ResolutionData_EditMode = reduxForm({ form: 'fullContentForm'})((props) => {
    return <div>
        <div className={s.fieldsGrid}>
            <img src={SectionLogoResolve} className={commonDataStyle.sectionIcon} alt='SectionLogoResolve' />
            <div>
                <div className={s.gridFieldValue}>
                    <SimpleItem_ReadOnlyMode fieldName='Закрыто в КЦ или ЦК' value={props.data.closedCKKC.value} />
                    <SimpleItem_EditMode fieldReduxName='resolutionCode' fieldName='Код выполнения' list={props.lists.resolutionCodeList} isLoading={props.isLoading} 
                        isDisabled={props.data.resolutionCode.readOnly} />
                </div>
            </div>
        </div>
        <div>Решение для пользователя:</div>
        <div>
            <Field multiline component={TextFieldControl} name='resolution' placeholder='Решение для пользователя' isDisabled={props.data.resolution.readOnly} />
        </div>
    </div>
});

const ResolutionData = (props) => {
    return props.isEditModeEnabled 
        ? <ResolutionData_EditMode data={props.data} lists={props.lists} />
        : <ResolutionData_ReadOnlyMode data={props.data} />;
}

export default ResolutionData;