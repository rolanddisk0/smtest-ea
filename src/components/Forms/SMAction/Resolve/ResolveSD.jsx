import React from 'react';
import commonStyles from '../CommonFormStyles.module.scss';
import s from './Resolve.module.scss';
import { Field, reduxForm } from 'redux-form';
import { ButtonsPanel } from '../ButtonsPanel';
import { TextFieldControl } from '../../FormControls/TextFieldControl/TextFieldControl';
import { SelectControl } from '../../FormControls/SelectControl/SelectControl';
import { required, digitsOnly, maxDigitValue, minDigitValue } from 'utils/validators/commonValidators';

const maxValue59 = maxDigitValue(59);
const minValue0 = minDigitValue(0);

const ResolveSD = (props) => {
    const workHoursValidations = [digitsOnly];
    const workMinutesValidations = [digitsOnly, maxValue59, minValue0];
    if (props.direction === 'ЦОД') {
        workHoursValidations.push(required);
        workMinutesValidations.push(required);
    }

    return <form onSubmit={props.handleSubmit}>
        <div className={commonStyles.field}>
            <Field component={TextFieldControl} name='resolution' placeholder='Введите Решение' multiline validate={[required]} />
        </div>
        <div className={commonStyles.field}>
            <Field component={SelectControl} name='resolutionCode' className={commonStyles.field} placeholder='Введите Код выполнения' 
                listData={props.fAvailVals.resolutionCodeList} isLoading={props.isLoading} validate={[required]} />
        </div>

        <div className={`${commonStyles.field} ${s.grid}`}>
            <div>Трудозатраты:</div>
            <div>Часы: </div>
            <div><Field component={TextFieldControl} name='workHours' validate={workHoursValidations} /></div>
            <div>Минуты: </div>
            <div><Field component={TextFieldControl} name='workMinutes' validate={workMinutesValidations} /></div>
        </div>
        <ButtonsPanel smAction={props.smAction} handleClose={props.handleClose} />
    </form>
}

export const ResolveSDForm = reduxForm({ form: 'resolveSDForm' })(ResolveSD);