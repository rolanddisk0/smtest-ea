import React from 'react';
import MultiSelect from 'components/UIElements/Multiselect/multi_select';
//import s from './FieldList.module.scss';
//import { AutoSizer } from 'react-virtualized';

const FieldList = (props) => {
  const handleChange = (selected) => {
    props.updateQueryBuilder({
      queryColumns: selected
    });
  }

  return <MultiSelect
    //items={props.queryBuilder.fields || []} //TODO: Добавил значение по умолчанию, иначе реакт падал
    items={props.fields || []} //TODO: Добавил значение по умолчанию, иначе реакт падал
    selectedItems={props.queryBuilder.queryColumns}
    onChange={handleChange}
    showSelectAll={false}
    responsiveHeight='100%'
    messages={{
      searchPlaceholder: "Поиск...",
      noItemsMessage: "Нет совпадений...",
      noneSelectedMessage: "Нет выбранных",
      selectedMessage: "выбрано",
      selectAllMessage: "Выбрать все",
      clearAllMessage: "Очистить все",
      disabledItemsTooltip: "You can only select 1 file"
    }}
  />

  // <div className={s.autoDiv}>
  //   <AutoSizer>
  //     {({ width, height }) => {
  //       let totalHeight = height || 400;

  //       return <MultiSelect
  //         items={props.queryBuilder.fields}
  //         selectedItems={props.queryBuilder.queryColumns}
  //         onChange={handleChange}
  //         showSelectAll={false}
  //         height={totalHeight}
  //         messages={{
  //           searchPlaceholder: "Поиск...",
  //           noItemsMessage: "Нет совпадений...",
  //           noneSelectedMessage: "Нет выбранных",
  //           selectedMessage: "выбрано",
  //           selectAllMessage: "Выбрать все",
  //           clearAllMessage: "Очистить все",
  //           disabledItemsTooltip: "You can only select 1 file"
  //         }}
  //       />
  //     }}
  //   </AutoSizer>
  // </div>;
}

export default FieldList;