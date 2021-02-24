import React from 'react';
//import s from './SelectTemplate.module.scss';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

//ATTENTION: ГОВНОКОД

//В тестовых целях компонента. Вероятно ее не будет потом. Тупо для показа.
//Поэтому на редакс пока не буду ее переделывать
const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 240,
    }
}));

const SelectTemplate = (props) => {
    const classes = useStyles();
    const [template, setTemplate] = React.useState('');

    const handleChange = (event) => {
        setTemplate(event.target.value);
        //TODO: Данные по шаблонам, конечно же, должны где-то храниться. Где-то, но не здесь.
        //TEMP
        let data;
        switch (event.target.value) {
            case 'Тест API (Консультация)':
                data = {
                    contactName: 'Диспетчер + Инженер_22266',
                    callbackContact: 'Диспетчер + Инженер_22266',
                    direction: 'Автотест направление',
                    groupAffectedItem: 'Автотест группа услуг',
                    affectedItem: 'Автотест услуга',
                    service: 'Автотест сервис',
                    affectedCI: 'Тест',
                    title: 'Тестовое Обращение',
                    description: 'Обращение с категорией Консультация',
                    template: 'Тест API (Консультация)',
                }
                break;
            case 'Тест API (Инцидент)':
                data = {
                    contactName: 'Диспетчер + Инженер_22266',
                    callbackContact: 'Диспетчер + Инженер_22266',
                    direction: 'Образование',
                    groupAffectedItem: 'АИС Аналитика и Отчетность',
                    affectedItem: 'Поддержка пользователей АИС АиО',
                    service: 'Предоставление доступа',
                    affectedCI: 'Business Studio',
                    title: 'Тестовое Обращение (ИНЦ)',
                    description: 'Обращение с категорией Инцидент',
                    template: 'Тест API (Инцидент)',
                }
                break;
            case 'Тест API (Изменение)':
                data = {
                    contactName: 'Диспетчер + Инженер_22266',
                    callbackContact: 'Диспетчер + Инженер_22266',
                    direction: 'ЦОД',
                    groupAffectedItem: 'ЦОД.Контроль качества',
                    affectedItem: 'ЦОД.Контроль качества СТП ЦОД',
                    service: 'Отзыв по качеству',
                    affectedCI: '10.126.154.29-is07-olymp-app',
                    title: 'Тестовое Обращение (ИЗМ)',
                    description: 'Обращение с категорией Изменение',
                    template: 'Тест API (Изменение)',
                }
                break;
            default:
                data = {
                    contactName: '',
                    callbackContact: '',
                    direction: '',
                    groupAffectedItem: '',
                    affectedItem: '',
                    service: '',
                    affectedCI: '',
                    title: '',
                    description: '',
                    template: '',
                }
                break;
        }

        props.changeDetailedRequestData(data);
    };

    return <FormControl className={classes.formControl}>
        <InputLabel id='simple-select-label'>Шаблон</InputLabel>
        <Select
            labelId='simple-select-helper-label'
            id='simple-select'
            value={template}
            onChange={handleChange}
        >
            <MenuItem value="">
                <em>Без шаблона</em>
            </MenuItem>
            <MenuItem value={'Тест API (Консультация)'}>Тест API (Консультация)</MenuItem>
            <MenuItem value={'Тест API (Инцидент)'}>Тест API (Инцидент)</MenuItem>
            <MenuItem value={'Тест API (Изменение)'}>Тест API (Изменение)</MenuItem>
        </Select>
        <FormHelperText>Выберите шаблон</FormHelperText>
    </FormControl>;
}

export default SelectTemplate;