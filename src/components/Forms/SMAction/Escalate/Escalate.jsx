import React, { useState } from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm, change } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required } from 'utils/validators/commonValidators';


const Escalate = (props) => {
    const [onGoingLoading, setOnGoingLoading] = useState(false);

    const onBlurAssignment = (event) => {
        const additionalParams = {
            assignment: event.value
        };
        props.clearSMActionFieldsData(props.smAction); //Очищаем старые списки данных
        props.getSMActionFieldsData(props.smAction, setOnGoingLoading, additionalParams);
        props.dispatch(change('escalateForm', 'assignee', null));
    }

    const toCElement = <div className={commonStyles.field}>
        <Field component={SelectControl} name='template' className={commonStyles.field} placeholder='Введите Шаблон Изменения'
            listData={props.fAvailVals.cTemplateList} isLoading={props.isLoading} validate={[required]} />
    </div>;

    const toIMElement = <>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='assignment' className={commonStyles.field} placeholder='Введите Группу назначения'
                listData={props.fAvailVals.assignmentList} isLoading={props.isLoading} validate={[required]} onBlur={onBlurAssignment}/>
        </div>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='assignee' className={commonStyles.field} placeholder='Введите Исполнителя'
                listData={props.fAvailVals.assigneeList} isLoading={props.isLoading || onGoingLoading} validate={[required]} />
        </div>
    </>;

    return <form onSubmit={props.handleSubmit}>
        {props.category === 'Запрос на изменение' ? toCElement : toIMElement}
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const EscalateForm = reduxForm({ form: 'escalateForm' })(Escalate);