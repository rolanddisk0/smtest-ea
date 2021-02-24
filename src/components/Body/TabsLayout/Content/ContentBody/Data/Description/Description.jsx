import React, { useState } from 'react';
import commonDataStyle from '../Data.module.scss';
import Attachments from 'components/UIElements/Attachments/Attachments';
import { TextField } from '@material-ui/core';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import { Field, reduxForm } from 'redux-form';
import { TextFieldControl } from 'components/Forms/FormControls/TextFieldControl/TextFieldControl';

const textFieldStyles = { style: { color: 'rgba(0, 0, 0, 0.65)' } }

const Description_EditMode = reduxForm({ form: 'fullContentForm' })((props) => {
    return <>
        <div>Краткое описание</div>
        <div><Field component={TextFieldControl} name='title' placeholder='Краткое описание' isDisabled={props.data.title.readOnly} /></div>
        <div>Описание</div>
        <div><Field multiline component={TextFieldControl} name='description' placeholder='Описание' isDisabled={props.data.description.readOnly} /></div>
    </>;
});

const Description_ReadOnlyMode = (props) => {
    return <>
        <div>Краткое описание</div>
        <div>
            <TextField variant='outlined' disabled value={props.data.title.value} fullWidth size='small' InputProps={textFieldStyles} />
        </div>
        <div>Описание</div>
        <div>
            <TextField variant='outlined' disabled value={props.data.description.value} fullWidth multiline rows={6} size='small' InputProps={textFieldStyles} />
        </div>
    </>
}

const Description = props => {
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);

    const contactClick = (target) => {
        setShowContactDialog(true);
        props.getContact(target.textContent, props.showAlert, setContactDataIsLoading);
    }

    const downloadAttachmentClick = (recordId, uid, filename) => props.downloadAttachment(recordId, uid, filename);

    const columns = [
        {
            Header: 'Номер',
            accessor: 'recordId',
        },
        {
            Header: 'Имя файла',
            accessor: 'name',
            Cell: e => {
                return <LinkButton text={e.value} onClick={() => { downloadAttachmentClick(e.original.recordId, e.original.uid, e.value) }} />
            },
            style: { 'whiteSpace': 'unset' },
        },
        {
            Header: 'Кто добавил',
            accessor: 'uploadedBy',
            Cell: e => <LinkButton text={e.value} onClick={(e) => { contactClick(e.target) }} />,
            style: { 'whiteSpace': 'unset' }
        },
        {
            Header: 'Дата',
            accessor: 'date',
            style: { 'whiteSpace': 'unset' }
        },
        {
            Header: 'Размер (Кб)',
            accessor: 'size',
        }
    ];

    return <>
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />
        <div className={commonDataStyle.sectionBlock}>
            {props.isEditModeEnabled
                ? <Description_EditMode data={props.data} />
                : <Description_ReadOnlyMode data={props.data} />}
            <div>
                <span>Вложения</span>
                <ReactTableV6 data={props.attachments} columns={columns} showPagination={true} />
                <div>
                    Readonly, пока что только в режиме просмотра {/* TODO: Будет активироваться в режиме редактирования. Пока не сделано */}
                    <Attachments disabled />
                </div>
            </div>
        </div>
    </>
}

export default Description;