import React from 'react';
import s from '../Resolution.module.scss';
import commonDataStyle from '../../Data.module.scss';
import SectionLogoFeedback from 'assets/contentLogos/ResoluctionSectionIcon_feedback.svg';
import { TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { TextFieldControl } from 'components/Forms/FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from 'components/Forms/FormControls/SelectControl/SelectControl';

const textFieldStyles = { style: { color: 'rgba(0, 0, 0, 0.65)' } }

const SimpleItem_ReadOnlyMode = (props) => {
    return <>
        <div className={s.fieldName}>{props.fieldName}:</div>
        <div><TextField fullWidth disabled value={props.value} variant='outlined' size='small' InputProps={textFieldStyles} /></div>
    </>;
}

const SimpleItem_EditMode = (props) => {
    return <>
        <div className={s.fieldName}>{props.fieldName}:</div>
        <div><Field component={SelectControl} name={props.fieldReduxName} placeholder={props.fieldName} listData={props.list} isDisabled={props.isDisabled} /></div>
    </>;
}

const Feedback_ReadOnlyMode = (props) => {
    return <div>
        <div className={s.fieldsGrid}>
            <img src={SectionLogoFeedback} className={commonDataStyle.sectionIcon} alt='SectionLogoFeedback' />
            <div className={s.gridFieldValue}>
                <SimpleItem_ReadOnlyMode fieldName='Оценка' value={props.data.closeMark.label} />
            </div>
        </div>
        <div>Отзыв:</div>
        <div><TextField multiline rows={4} fullWidth disabled value={props.data.feedback.value} variant='outlined' size='small' InputProps={textFieldStyles} /></div>
    </div>
}

const Feedback_EditMode = reduxForm({ form: 'fullContentForm' })((props) => {
    return <div>
        <div className={s.fieldsGrid}>
            <img src={SectionLogoFeedback} className={commonDataStyle.sectionIcon} alt='SectionLogoFeedback' />
            <div className={s.gridFieldValue}>
                <SimpleItem_EditMode fieldReduxName='closeMark' fieldName='Оценка' list={props.lists.closeMarkList} isDisabled={props.data.closeMark.readOnly} />
            </div>
        </div>
        <div>Отзыв:</div>
        <div><Field multiline component={TextFieldControl} name='feedback' placeholder='Отзыв' isDisabled={props.data.feedback.readOnly} /></div>
    </div>;
});

const Feedback = (props) => {
    return props.isEditModeEnabled
        ? <Feedback_EditMode data={props.data} lists={props.lists} />
        : <Feedback_ReadOnlyMode data={props.data} />;
}

export default Feedback;