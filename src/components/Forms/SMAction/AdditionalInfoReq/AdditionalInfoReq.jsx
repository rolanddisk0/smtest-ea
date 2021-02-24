import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { required } from 'utils/validators/commonValidators';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';

const AdditionalInfoReq = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='message' placeholder='Введите Запрос' multiline validate={[required]} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const AdditionalInfoReqForm = reduxForm({ form: 'additionalInfoReqForm' })(AdditionalInfoReq);