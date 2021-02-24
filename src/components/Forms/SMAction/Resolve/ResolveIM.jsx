import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import s from './Resolve.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required } from 'utils/validators/commonValidators';

const ResolveIM = (props) => {
    //TODO: Тут вообще еще есть зависимость от статуса. Из Отложен выполняется без кода закрытия - он не учитывается. Пока что эту логику не закладываю.
    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='resolutionCode' className={commonStyles.field} placeholder='Введите Код выполнения' 
                listData={props.fAvailVals.codesList} isLoading={props.isLoading} validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='resolution' placeholder='Введите Решение' multiline validate={[required]} />
        </div>

        <div className={commonStyles.field}>
            <Field component={SelectControl} name='subject' className={commonStyles.field} placeholder='Введите Тематику' 
                listData={props.fAvailVals.subjList} isLoading={props.isLoading} />
        </div>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='comment' placeholder='Введите Комментарий' multiline />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const ResolveIMForm = reduxForm({ form: 'resolveIMForm' })(ResolveIM);