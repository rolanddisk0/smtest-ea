import React, { useState } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { TextFieldControlRMenu } from '../FormControls/TextFieldControlRMenu/TextFieldControlRMenu';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import LinearProgressWithLabel from 'components/UIElements/LinearProgressWithLabel/LinearProgressWithLabel';
import s from './RightMenuMore.module.scss';
import { Button } from '@material-ui/core';
import { required } from 'utils/validators/commonValidators';

const RightMenuMore = (props) => {
    const [filteredData, setFilteredData] = useState(props.data);
    const [isFilterActive, setIsFilteredActive] = useState(false);
    const progress = props.totalCount ? Math.round(props.data.length * 100 / props.totalCount) : 0;
    const data = isFilterActive ? filteredData : props.data;
    const displayData = data.map(item => ({ name: item })) //Преобразуем данные для отрисовки

    const columns = [
        {
            Header: <div className={s.tableHeader}>{props.title}</div>,
            accessor: 'name',
            Cell: e => <div onClick={() => { selectValueFromTable(e.value); }} className={s.link}>{e.value}</div>
        }
    ];

    const selectValueFromTable = (value) => {
        setIsFilteredActive(true);
        props.dispatch(change('rightMenuMoreForm', 'selectedValue', value));
        globalSearch(value);
    }

    const handleChangeSearchField = event => {
        if (event.target.value) { setIsFilteredActive(true); } else { setIsFilteredActive(false); }
        globalSearch(event.target.value);
    }

    const globalSearch = (selectedValue) => {
        const newFilteredData = props.data.filter(item => item.toLowerCase().includes(selectedValue.toLowerCase()));
        setFilteredData(newFilteredData);
    };

    return <form onSubmit={props.handleSubmit}>
        <div className={s.searchField}>
            <Field component={TextFieldControlRMenu} name='selectedValue' placeholder='Выберите значение' onChange={handleChangeSearchField} validate={[required]} />
        </div>
        {props.dataIsLoading && <LinearProgressWithLabel value={progress} currentCount={props.data.length} totalCount={props.totalCount} />}
        <ReactTableV6 data={displayData} columns={columns} showPagination={true} defaultPageSize={10} />

        <div className={s.actions}>
            <div><Button variant='outlined' color='secondary' onClick={props.handleClose}>Отменить</Button></div>
            <div><Button variant='contained' color='primary' type='submit'>Применить</Button></div>
        </div>
    </form>
}

export const RightMenuMoreForm = reduxForm({ form: 'rightMenuMoreForm' })(RightMenuMore);