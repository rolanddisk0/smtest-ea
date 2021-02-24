import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required } from 'utils/validators/commonValidators';

const Close = (props) => {
    const closureValidations = [];
    if (props.direction === 'Образование' && props.feedbackType === 'Телефон') {
        closureValidations.push(required);
    }

    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='closureTitle' className={commonStyles.field} placeholder='Введите Тематику закрытия' 
                listData={props.fAvailVals.closureTitleList} isLoading={props.isLoading} validate={closureValidations} />
        </div>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='message' placeholder='Введите Сообщение' multiline validate={closureValidations} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const CloseForm = reduxForm({ form: 'closeForm' })(Close);