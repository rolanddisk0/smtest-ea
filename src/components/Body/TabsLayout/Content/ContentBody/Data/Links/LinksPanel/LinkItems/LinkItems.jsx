import React from 'react';
import s from './LinkItems.module.scss';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import ReactTableV6 from 'components/UIElements/ReactTableV6/ReactTableV6';
import { useHistory } from 'react-router-dom';

const LinkItems = (props) => {
    const history = useHistory();
    const columns = [
        {
            Header: 'Сущность',
            accessor: 'filename'
        },
        {
            Header: 'Код',
            accessor: 'number',
            //Если мы не смогли получить статус записи, то не смогли получить и остальное, а значит у юзера нет прав на ее просмотр
            Cell: e => e.row.status ? <LinkButton text={e.value} onClick={(e) => { numberClick(e.target) }} /> : e.value,
        },
        {
            Header: 'Статус',
            accessor: 'status',
        },
        {
            Header: 'Время открытия',
            accessor: 'openTime',
            style: { 'whiteSpace': 'unset' }
        },

        {
            Header: 'Рабочая группа',
            accessor: 'assignment',
            style: { 'whiteSpace': 'unset' }
        },
        {
            Header: 'Исполнитель',
            accessor: 'assingee',
            Cell: e => <LinkButton text={e.value} onClick={(e) => { contactClick(e.target) }} />,
            style: { 'whiteSpace': 'unset' }
        },
    ];

    const contactClick = (target) => {
        props.setShowContactDialog(true);
        props.getContact(target.textContent, props.setContactDataIsLoading);
    }

    const numberClick = target => {
        props.updateCurrentRow({
            tabMode: 'exist',
            key: target.textContent
        });
        history.push(`/index/module/${target.textContent}`);
    }

    return <div className={s.tableContainer}>
        <ReactTableV6 data={props.data} columns={columns} showPagination={false} />
    </div>
}

export default LinkItems;