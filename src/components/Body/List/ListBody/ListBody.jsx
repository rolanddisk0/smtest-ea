import React, { useState } from 'react';
import { AutoSizer } from 'react-virtualized';
import ReactTableContainer from '../../../UIElements/Tables/ReactTableV7/ReactTableContainer';
import ContextMenu from './ContextMenu/ContextMenu';
import { useHistory } from 'react-router-dom';
// для react-virtualized
/*import 'react-virtualized/styles.css';
import MuiVirtualizedTable from '../../../UIElements/Tables/MuiVirtualizedTable/MuiVirtualizedTable';
import { getWidths } from 'utils/inbox';*/

const ListBody = (props) => {
  const history = useHistory();
  const [contextMenuData, setContextMenuData] = useState({
    data: null,
    mouseX: null,
    mouseY: null
  });

  const onRowClick = (e) => {
    const key = e.currentTarget.dataset.unique_key;
    props.updateCurrentRow({
      tabMode: 'exist',
      key: key
    });
    history.push(`/index/${props.selectedTodo}/${key}`);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    setContextMenuData({
      data: e.currentTarget,
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4
    });
  }

  return <>
    <AutoSizer disableWidth>
      {({ height }) => {
        return <>
          <ReactTableContainer columns={props.columns} data={props.data} height={(height - 50) + 'px'}
            onRowClick={onRowClick}
            selectedInbox={props.selectedInbox}
            contentId={props.match.params.contentId}
            tableAction={props.listAction}
            updateTableAction={props.updateListAction}
            rowIndex={props.currentRow.index}
            getInboxData={props.getInboxData} //TODO: с этим что-то сделать
            user={props.user}
            showAlert={props.showAlert} //TODO: сделать отдельный контейнер для таблицы withAlert?
            selectedTodo={props.selectedTodo}
            updateSelectedInbox={props.updateSelectedInbox}
            onContextMenu={onContextMenu}
          />
          {
            Boolean(contextMenuData) ? <ContextMenu contextMenuData={contextMenuData} setContextMenuData={setContextMenuData} 
            selectedTodo={props.selectedTodo} updateCurrentRow={props.updateCurrentRow}/> : null
          }
        </>
      }}
    </AutoSizer>
  </>
}

export default ListBody;

// для react-virtualized
/*
  return <>
    <AutoSizer>
      {({ height, width }) => {
        return <MuiVirtualizedTable
          onRowClick={onRowClick}
          totalWidth={width}
          totalHeight={height}
          columns={props.columns}
          widths={getWidths(width, props.columns)}
          rowIndex={props.currentRow.index}
          sort={true}
          rows={props.data}
          uniqueKey={props.uniqueKey}
          tableAction={props.listAction}
          updateTableAction={props.updateListAction}
          loadRowsFunction={props.getInboxData}
          showAlert={props.showAlert} //TODO: сделать отдельный контейнер для таблицы withAlert
          getInboxData={props.getInboxData} //TODO: с этим что-то сделать
          selectedInbox={props.selectedInbox}
          user={props.user}
        />
      }}
    </AutoSizer>
  </>
*/