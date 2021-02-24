import React from 'react';
import s from './DetailedRequest.module.scss';
import { Button } from '@material-ui/core';
import Attachments from 'components/UIElements/Attachments/Attachments';
import { Field, reduxForm, change } from 'redux-form';
import { SelectControl } from 'components/Forms/FormControls/SelectControl/SelectControl';
import { TextFieldControl } from 'components/Forms/FormControls/TextFieldControl/TextFieldControl';
import { isObject } from 'utils/custom';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';
import { AsyncSelectControl } from 'components/Forms/FormControls/AsyncSelectControl/AsyncSelectControl';
import { required } from 'utils/validators/commonValidators';

const TplFieldItem = (props) => {
    const onChange = (event) => {
        switch (props.fieldReduxName) {
            case 'direction':
                props.dispatch(change('supportDialogDetailedRequestForm', 'groupAffectedItem', null));
                props.dispatch(change('supportDialogDetailedRequestForm', 'affectedItem', null));
                props.dispatch(change('supportDialogDetailedRequestForm', 'service', null));
                props.dispatch(change('supportDialogDetailedRequestForm', 'kc', null));
                props.dispatch(change('supportDialogDetailedRequestForm', 'ck', null));
                props.onFieldChange(props.fieldReduxName, event ? event.value : '')
                break;
            case 'groupAffectedItem':
                props.dispatch(change('supportDialogDetailedRequestForm', 'affectedItem', null));
                props.dispatch(change('supportDialogDetailedRequestForm', 'service', null));
                props.onFieldChange(props.fieldReduxName, event ? event.value : '')
                break;
            case 'affectedItem':
                props.dispatch(change('supportDialogDetailedRequestForm', 'service', null));
                props.onFieldChange(props.fieldReduxName, event ? event.value : '')
                break;
        }
    }

    return <>
        <div>{props.fieldName}: </div>
        <div>
            <Field component={SelectControl} name={props.fieldReduxName} placeholder={props.fieldName} listData={props.list ? props.list.data : []}
                isLoading={props.list.isLoading || false} onChange={onChange} validate={props.required && [required]} />
        </div>
    </>;
}

const DetailedRequestForm = (props) => {
    const onTplChange = (event) => {
        if (event && event.value) { props.onTplChange(event.value); }
    }

    const getTplAsyncParams = (listName, inputField) => {
        return {
            defaultOptions: props.createSdLists.sdTplList ? props.createSdLists.sdTplList.data : [], getDataPromise: props.getSdCreateList,
            listName: listName, inputField: inputField
        }
    };
    const sdTplAsyncParams = getTplAsyncParams('sdTplList', 'sdTplName');

    return <form onSubmit={props.handleSubmit}>
        <div className={s.grid}>
            <div className={s.selectTemplateContainer}>
                <Field component={AsyncSelectControl} name='sdTplName' placeholder='Шаблон' isLoading={props.createSdLists.sdTplList.isLoading || false}
                    asyncParams={sdTplAsyncParams} onChange={onTplChange} />
            </div>
            <OverlaySpinner active={props.tplDataIsLoading}>
                <div className={s.twoColumnsGrid}>
                    <div className={s.columnGrid}>
                        <TplFieldItem fieldName='Направление' fieldReduxName='direction' list={props.createSdLists.directionList} dispatch={props.dispatch} required
                            onFieldChange={props.onFieldChange} />
                        <TplFieldItem fieldName='Группа услуг' fieldReduxName='groupAffectedItem' list={props.createSdLists.groupAffectedItemList} dispatch={props.dispatch}
                            onFieldChange={props.onFieldChange} />
                        <TplFieldItem fieldName='Услуга' fieldReduxName='affectedItem' list={props.createSdLists.affectedItemList} dispatch={props.dispatch}
                            onFieldChange={props.onFieldChange} />
                        <TplFieldItem fieldName='Сервис' fieldReduxName='service' list={props.createSdLists.serviceList} dispatch={props.dispatch}
                        />
                    </div>
                    <div className={s.columnGrid}>
                        <div>Категория: </div>
                        <div><Field name='category' component={SelectControl} placeholder='Категория' listData={props.categoryList || []} /></div>
                        <div>Приоритет: </div>
                        <div><Field name='priority' component={SelectControl} placeholder='Приоритет' listData={props.priorityList || []} /></div>
                        <TplFieldItem fieldName='КЦ' fieldReduxName='kc' list={props.createSdLists.kcList} dispatch={props.dispatch} required />
                        <TplFieldItem fieldName='ЦК' fieldReduxName='ck' list={props.createSdLists.ckList} dispatch={props.dispatch} required />
                    </div>
                </div>

                <div>Краткое описание: </div>
                <Field name='title' component={TextFieldControl} placeholder='Краткое описание' validate={[required]} />
                <div>Описание: </div>
                <Field name='description' multiline component={TextFieldControl} placeholder='Описание' validate={[required]} />
            </OverlaySpinner>

            <div>
                Вложения
                <Attachments />
            </div>
        </div>
        <div className={s.btnsContainer}>
            <Button variant='contained' color='primary' size='large' type='submit'>Отправить</Button>
        </div>
    </form>
}

const DetailedRequestReduxForm = reduxForm({ form: 'supportDialogDetailedRequestForm', enableReinitialize: true })(DetailedRequestForm);
const DetailedRequest = (props) => {
    const onSubmit = (formData) => {
        const getSimpleValues = (formData) => {
            let retObj = {};
            for (let key in formData) {
                if (isObject(formData[key])) {
                    if (formData[key].value) { retObj[key] = formData[key].value; }
                }
                else {
                    if (formData[key]) { retObj[key] = formData[key]; }
                }
            }
            return retObj;
        }
        const simpleValues = getSimpleValues(formData);

        props.onSendClick(simpleValues, 'detailed');
    }

    return <DetailedRequestReduxForm onSubmit={onSubmit} createSdLists={props.createSdLists} initialValues={props.initialValues} tplDataIsLoading={props.tplDataIsLoading}
        categoryList={props.categoryList} priorityList={props.priorityList} getSdCreateList={props.getSdCreateList} onFieldChange={props.onFieldChange}
        onTplChange={props.onTplChange} />
}

export default DetailedRequest