import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required } from 'utils/validators/commonValidators';

const ReturnForRevision = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='code' className={commonStyles.field} placeholder='Введите Код возврата' 
                listData={props.fAvailVals.codesList} isLoading={props.isLoading} validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='reason' placeholder='Введите Причину возврата' multiline validate={[required]} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const ReturnForRevisionForm = reduxForm({ form: 'returnForRevisionForm' })(ReturnForRevision);