import React from 'react';
import s from './ContentHeader.module.scss';
import { Field, reduxForm } from 'redux-form';
import { SelectControl } from 'components/Forms/FormControls/SelectControl/SelectControl';

const Item_EditMode = (props) => {
    return <div className={s.item}>
        <div>{props.fieldName}</div>
        <Field component={SelectControl} name={props.fieldReduxName} placeholder={props.fieldName} listData={props.list} fullwidth isDisabled={props.isDisabled} />
    </div>;
}

const Item_ReadOnlyMode = (props) => {
    const value = props.value && props.value.length > 0 ? props.value[0].toUpperCase() + props.value.slice(1) : props.value;

    return <div className={s.item}>
        <div>{props.fieldName}</div>
        <div className={s.itemValue}>{value}</div>
    </div>;
}

const ContentHeader_EditMode = reduxForm({ form: 'fullContentForm'})((props) => {
    return <>
        <Item_ReadOnlyMode fieldName='ID#' value={props.data.number.value} />
        <Item_ReadOnlyMode fieldName='Статус' value={props.data.status.value} />
        <Item_EditMode fieldName='Категория' fieldReduxName='category' list={props.lists.categoryList} isDisabled={props.data.category.readOnly}  />
        <Item_ReadOnlyMode fieldName='Обратная связь' value={props.data.feedbackType.value} />
        <Item_ReadOnlyMode fieldName='Крайний срок' value={props.data.deadline.value} />
        <Item_EditMode fieldName='Приоритет' fieldReduxName='priority' list={props.lists.priorityList} isDisabled={props.data.priority.readOnly}  />
    </>
});

const ContentHeader_ReadOnlyMode = (props) => {
    return <>
        <Item_ReadOnlyMode fieldName='ID#' value={props.data.number.value} />
        <Item_ReadOnlyMode fieldName='Статус' value={props.data.status.value} />
        <Item_ReadOnlyMode fieldName='Категория' value={props.data.category.value} />
        <Item_ReadOnlyMode fieldName='Обратная связь' value={props.data.feedbackType.value} />
        <Item_ReadOnlyMode fieldName='Крайний срок' value={props.data.deadline.value} />
        <Item_ReadOnlyMode fieldName='Приоритет' value={props.data.priority.label} />
    </>
}

const ContentHeader = (props) => {
    const getHeaderBgColorStyle = (slaData) => {
        if (slaData.passed100Percent.value) { return s.red; }
        if (slaData.passed75Percent.value) { return s.yellow; }
        return s.green;
    }

    const headerBgColorStyle = getHeaderBgColorStyle(props.slaData);

    return <div className={`${s.content} ${headerBgColorStyle}`}>
        { props.isEditModeEnabled 
                        ? <ContentHeader_EditMode data={props.headerItems} lists={{categoryList: props.categoryList, priorityList: props.priorityList}} />
                        : <ContentHeader_ReadOnlyMode data={props.headerItems} />}
        
    </div>;
}

export default ContentHeader;