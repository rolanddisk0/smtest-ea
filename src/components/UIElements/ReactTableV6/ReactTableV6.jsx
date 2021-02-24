import React from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import s from './ReactTableV6.module.scss';

const ReactTableV6 = (props) => {
    return <ReactTable
        data={props.data}
        columns={props.columns}
        showPagination={props.showPagination ? props.showPagination : false}
        defaultPageSize={props.defaultPageSize ? props.defaultPageSize : 5}
        pageText='Страница'
        ofText='из'
        previousText='Назад'
        nextText='Вперед'
        loadingText='Загрузка...'
        noDataText='Нет данных'
        rowsText='строк'
        className={`-striped -highlight ${s.reactTable}`}
        NoDataComponent={() => null} //Убирает блок с текстом "Нет данных". Он страшный и иногда налезает на заголовки (Если строк по умолчанию мало)
    />
}

export default ReactTableV6;
