import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required } from 'utils/validators/commonValidators';

const ReturnToKC = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='returnReason' className={commonStyles.field} placeholder='Введите Причину возврата' 
                listData={props.fAvailVals.returnReasonsList} isLoading={props.isLoading} validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='message' placeholder='Введите Комментарий' multiline validate={[required]} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const ReturnToKCForm = reduxForm({ form: 'returnToKCForm' })(ReturnToKC);