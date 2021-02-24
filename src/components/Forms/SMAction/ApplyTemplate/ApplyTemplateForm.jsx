import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { required } from 'utils/validators/commonValidators';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';

const ApplyTemplate = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='template' placeholder='Введите название шаблона' listData={props.fAvailVals.templateList} isLoading={props.isLoading}
               validate={[required]} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const ApplyTemplateForm = reduxForm({ form: 'applyTemplateForm' })(ApplyTemplate);