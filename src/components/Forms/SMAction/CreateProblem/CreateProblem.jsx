import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required } from 'utils/validators/commonValidators';

const CreateProblem = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>Основное КЕ пока что подгружает первую 1000 записей</div>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='logicalName' className={commonStyles.field} placeholder='Введите основное КЕ' 
                listData={props.fAvailVals.logicalNameList} isLoading={props.isLoading} validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='severity' className={commonStyles.field} placeholder='Введите Влияние' 
                listData={props.fAvailVals.severityList} isLoading={props.isLoading} validate={[required]} />
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const CreateProblemForm = reduxForm({ form: 'createProblemForm' })(CreateProblem);