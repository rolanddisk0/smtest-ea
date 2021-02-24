import React from 'react';
import s from './QuickRequest.module.scss';
import { Button } from '@material-ui/core';
import Attachments from '../../../../UIElements/Attachments/Attachments';
import { Field, reduxForm } from 'redux-form';
import { TextFieldControl } from 'components/Forms/FormControls/TextFieldControl/TextFieldControl';
import { required } from 'utils/validators/commonValidators';

export const QuickRequestForm = reduxForm({ form: 'supportDialogQuickRequestForm' })((props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={s.grid}>
            <div>
                <div>Краткое описание</div>
                <Field name='title' component={TextFieldControl} placeholder='Краткое описание' validate={[required]} />
            </div>
            <div>
                <div>Текст заявки</div>
                <Field name='description' multiline component={TextFieldControl} placeholder='Описание' validate={[required]} />
            </div>
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
);

const QuickRequest = (props) => {
    const onSubmit = formData => props.onSendClick(formData, 'quick');
    return <QuickRequestForm onSubmit={onSubmit}/>
}

export default QuickRequest;