import React, { useState } from 'react';
import s from './RepeatRequest.module.scss';
import { Button } from '@material-ui/core';
import Attachments from 'components/UIElements/Attachments/Attachments';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { Field, reduxForm, change } from 'redux-form';
import { TextFieldControl } from 'components/Forms/FormControls/TextFieldControl/TextFieldControl';
import { required } from 'utils/validators/commonValidators';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';

export const RepeatRequestForm = reduxForm({ form: 'supportDialogRepeatRequestForm' })((props) => {
    const [fieldsIsDisabled, setFieldsIsDisabled] = useState(true);
    const applyFields = (row) => {
        if (fieldsIsDisabled) { setFieldsIsDisabled(false); }
        props.dispatch(change('supportDialogRepeatRequestForm', 'title', row.title));
        props.dispatch(change('supportDialogRepeatRequestForm', 'description', row.description));
        props.dispatch(change('supportDialogRepeatRequestForm', 'incidentId', row.incidentId));
    }

    return <form onSubmit={props.handleSubmit}>
        <div className={s.grid}>
            <OverlaySpinner active={props.createSdRepeatDataIsLoading}>
                <ReactTable
                    data={props.dataList}
                    columns={[
                        {
                            Header: 'Номер',
                            accessor: 'incidentId',
                            Cell: e => <div onClick={() => applyFields(e.row)} className={s.link}>{e.value}</div>
                        },
                        {
                            Header: 'Направление',
                            accessor: 'direction',
                        },
                        {
                            Header: 'Краткое описание',
                            accessor: 'title',
                        },
                        {
                            Header: 'Описание',
                            accessor: 'description',
                        }
                    ]}
                    showPagination={false}
                    defaultPageSize={5}
                    className='-striped -highlight'
                />
            </OverlaySpinner>
            
            <div>
                <div>Краткое описание</div>
                <Field name='title' component={TextFieldControl} placeholder='Краткое описание' validate={[required]} isDisabled={fieldsIsDisabled} />
            </div>
            <div>
                <div>Текст заявки</div>
                <Field name='description' multiline component={TextFieldControl} placeholder='Описание' validate={[required]} isDisabled={fieldsIsDisabled} />                
            </div>
            <div>
                Вложения
            <Attachments />
            </div>
            <div className={s.btnsContainer}>
                <Button variant='contained' color='primary' size='large' type='submit'>Отправить</Button>
            </div>
        </div>
    </form>
}
);

const RepeatRequest = (props) => {
    const onSubmit = formData => props.onSendClick(formData, 'repeat');
    return <RepeatRequestForm onSubmit={onSubmit} dataList={props.dataList} createSdRepeatDataIsLoading={props.createSdRepeatDataIsLoading} />
}

export default RepeatRequest;