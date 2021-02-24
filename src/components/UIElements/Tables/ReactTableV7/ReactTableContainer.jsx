import React from 'react';
import ReactTable from '../../../UIElements/Tables/ReactTableV7/ReactTable';
import usePrevious from 'hooks/usePrevious';
import styled from 'styled-components';
import * as _ from 'underscore';
const Styles = styled.div`
  display: block;
  overflow: auto;

  .table {
    border-spacing: 0;
    border: 1px solid black;

    .thead {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .list-tbody {
      overflow-y: scroll;
      overflow-x: hidden;
      height: ${props => props.height || '250px'};
    }
  }
`

const ReactTableInbox = (props) => {
  const [pageCount, setPageCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowIndex, setRowIndex] = React.useState(0);
  const [firstLoading, setFirstLoading] = React.useState(true); //Первый запуск идет в rootReducer.initializeApp
  const prevSelectedInboxId = usePrevious(props.selectedInbox.id);
  const prevSmartFilter = usePrevious(props.selectedInbox.smartFilter);
  const prevAdditionalFilter = usePrevious(props.selectedInbox.additionalFilter);
  const prevAdvancedFilter = usePrevious(props.selectedInbox.advancedFilter);
  // const [pageConfig, setPageConfig] = React.useState({
  //   pageIndex: 0,
  //   pageSize: 0,
  //   sortBy: null
  // });
  // const prevPageConfig = usePrevious(pageConfig);
  const setPageConfig = (config) => {
    props.updateSelectedInbox({
      pageConfig: config
    })
  }
  const pageConfig = props.selectedInbox.pageConfig;
  const prevPageConfig = usePrevious(props.selectedInbox.pageConfig);

  const eventFire = (el, etype) => {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      let res = el.dispatchEvent(evObj);
    }
  }

  const nextLine = () => {
    let newRowIndex = rowIndex < data.length - 1 ? rowIndex + 1 : rowIndex;
    eventFire(document.querySelector('[data-list_row_index="' + newRowIndex + '"]'), 'click');
  }

  const previousLine = () => {
    let newRowIndex = rowIndex > 0 ? rowIndex - 1 : 0;
    eventFire(document.querySelector('[data-list_row_index="' + newRowIndex + '"]'), 'click');
  }

  const endLine = () => {
    //let newRowIndex = data.length - 1;
    //document.getElementsByClassName('list-tbody')[0].scrollTop = 20 * pageConfig.pageSize;
    //eventFire(document.querySelector('[data-list_row_index="' + newRowIndex + '"]'), 'click');
    setPageConfig({
      ...pageConfig,
      pageIndex: pageCount - 1,
      event: {
        type: 'endLine'
      }
    })
  }

  const startLine = () => {
    //let newRowIndex = 0;
    //document.getElementsByClassName('list-tbody')[0].scrollTop = 0;
    //eventFire(document.querySelector('[data-list_row_index="' + newRowIndex + '"]'), 'click');
    setPageConfig({
      ...pageConfig,
      pageIndex: 0,
      event: {
        type: 'startLine'
      }
    })
  }


  React.useEffect(() => {
    if (prevPageConfig && prevPageConfig.event && prevPageConfig.event.type == 'startLine' && pageConfig.event == null) {
      eventFire(document.querySelector('[data-list_row_index="' + 0 + '"]'), 'click');
    }
    if (prevPageConfig && prevPageConfig.event && prevPageConfig.event.type == 'endLine' && pageConfig.event == null) {
      eventFire(document.querySelector('[data-list_row_index="' + (props.data.length - 1) + '"]'), 'click');
    }
    // if (pageConfig.event && pageConfig.event.type == 'endLine') {
    //   eventFire(document.querySelector('[data-list_row_index="' + (props.data.length - 1) + '"]'), 'click');
    // }
  }, [pageConfig.event]);

  React.useEffect(() => {
    if (props.selectedInbox.id && prevSelectedInboxId) {
      if (prevSelectedInboxId == props.selectedInbox.id && pageConfig.pageIndex == prevPageConfig.pageIndex && pageConfig.sortBy == prevPageConfig.sortBy
        && pageConfig.pageSize < prevPageConfig.pageSize) {
        setPageCount(Math.ceil(props.selectedInbox.itemsCount / pageConfig.pageSize));
        setData(props.data.slice(0, pageConfig.pageSize));
      } else {
        if ((props.selectedTodo != props.selectedInbox.viewName || prevSelectedInboxId != props.selectedInbox.id || props.selectedInbox.smartFilter != prevSmartFilter
          || !_.isEqual(props.selectedInbox.additionalFilter, prevAdditionalFilter) && prevAdditionalFilter != null
          || !_.isEqual(props.selectedInbox.advancedFilter, prevAdvancedFilter)
          || pageConfig.pageSize > prevPageConfig.pageSize
        ) &&
          (pageConfig.pageIndex != 0 || pageConfig.sortBy != null)) {
          setPageConfig({ ...pageConfig, pageIndex: 0, sortBy: null })
        } else {
          if (!firstLoading && (prevSelectedInboxId != props.selectedInbox.id || pageConfig.pageIndex != prevPageConfig.pageIndex || pageConfig.sortBy != prevPageConfig.sortBy
            || pageConfig.pageSize != prevPageConfig.pageSize || props.selectedInbox.smartFilter != prevSmartFilter 
            || !_.isEqual(props.selectedInbox.additionalFilter, prevAdditionalFilter) && prevAdditionalFilter != null
            || !_.isEqual(props.selectedInbox.advancedFilter, prevAdvancedFilter)
          )) {
            let sortBy = pageConfig.sortBy;
            let sortByField = null;
            let sortByOrder = null;

            if (sortBy && sortBy[0]) {
              sortByField = sortBy[0].id;
              sortByOrder = sortBy[0].desc ? 'DESC' : 'ASC'
            }
            const autoSelect = pageConfig.event ? false : true;
            //props.getInboxData(props.selectedInbox, props.user, props.showAlert, sortByField, sortByOrder, null, null, autoSelect);
            props.getInboxData(props.selectedInbox, props.user, props.selectedTodo, props.showAlert, sortByField, sortByOrder, null, null, autoSelect);
          } else {
            setFirstLoading(false);
          }
        }
      }
    }
  }, [props.selectedInbox.id, pageConfig, props.selectedInbox.smartFilter, props.selectedInbox.additionalFilter, props.selectedInbox.advancedFilter]);

  React.useEffect(() => {
    //NOTE: Дефолтные константы. Без них, при логине выбивает реакт ошибку, так как тут вероятное Infinity при делении получается. А react-table такое не нравится
    const itemsCount = props.selectedInbox.itemsCount || 1;
    const pageSize = pageConfig.pageSize || 50;
    setPageCount(Math.ceil(itemsCount / pageSize));
    setData(props.data.slice(0, pageSize));

    if (pageConfig.event && (pageConfig.event.type == 'endLine' || pageConfig.event.type == 'startLine')) {
      if (pageConfig.event.type == 'startLine') {
        document.getElementsByClassName('list-tbody')[0].scrollTop = 0;
      } else {
        document.getElementsByClassName('list-tbody')[0].scrollTop = 20 * pageConfig.pageSize;
      }
      //eventFire(document.querySelector('[data-list_row_index="' + (props.data.length - 1) + '"]'), 'click'); // ???
      setPageConfig({
        ...pageConfig,
        event: null
      })
    } else {
      document.getElementsByClassName('list-tbody')[0].scrollTop = 0;
    }
  }, [props.data]);

  React.useEffect(() => {
    if (props.tableAction) {
      if (props.tableAction === 'next') {
        nextLine();
      }
      if (props.tableAction === 'previous') {
        previousLine();
      }
      if (props.tableAction === 'end') {
        endLine();
      }
      if (props.tableAction === 'start') {
        startLine();
      }
      props.updateTableAction(null);
    }
  }, [props.tableAction]);

  React.useEffect(() => {
    if (props.rowIndex != rowIndex) {
      setRowIndex(props.rowIndex);
    }
  }, [props.rowIndex]);

  return (
    <Styles height={props.height}>
      <ReactTable columns={props.columns} data={data} onRowClick={props.onRowClick} selectedTodo={props.selectedTodo}
        pageCount={pageCount}
        pageIndex={pageConfig.pageIndex}
        setPageConfig={setPageConfig}
        pageConfig={pageConfig}
        uniqueKey={props.selectedInbox.uniqueKey} contentId={props.contentId}
        onContextMenu={props.onContextMenu}
      />
    </Styles>
  )
}

export default ReactTableInbox