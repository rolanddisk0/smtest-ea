import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { DatePickerControl } from '../../FormControls/DatePickerControl/DatePickerControl';
import { required } from 'utils/validators/commonValidators';

const Pending = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={DatePickerControl} name='pendingDate' className={commonStyles.field} validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='reason' className={commonStyles.field} placeholder='Введите Причину приостановки' 
                listData={props.fAvailVals.reasonList} isLoading={props.isLoading} validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='comment' placeholder='Введите Комментарий' multiline validate={[required]} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const PendingForm = reduxForm({ form: 'pendingForm' })(Pending);