import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Draggable from 'react-draggable';
import Paginator from './Paginator';
import * as _ from 'underscore';
import { Column, SortDirection, Table, InfiniteLoader } from 'react-virtualized';
import s from './MuiVirtualizedTable.module.scss';
import { getLocalizedDate } from 'utils/custom';

class MuiVirtualizedTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 1,
      perPage: 37, //40
      scrollToIndex: undefined,
      widths: this.props.widths,
      sortBy: this.props.uniqueKey,
      sortDirection: SortDirection.ASC,
      dragging: false,
      rows: this.props.rows,
      rowIndex: this.props.rowIndex,
      scrollToAlignment: 'start',
      fireEvent: false,
      loadingPage: 1
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.totalHeight !== prevProps.totalHeight) {
      this.setState({
        perPage: Math.floor((this.props.totalHeight - 35) / 20)
      });
    }

    if (this.props.widths !== prevProps.widths) {
      this.setState({
        widths: this.props.widths //???
      });
    }

    if (this.props.rows !== prevProps.rows) {
      this.setState({
        rows: this.props.rows //???
      });
    }

    if (this.props.rowIndex !== prevProps.rowIndex) {
      this.setState({
        rowIndex: this.props.rowIndex //???
      });
    }

    if (this.state.loadingPage !== prevState.loadingPage) {
      //this.props.getInboxData(this.props.selectedInbox, this.props.user, this.props.showAlert, this.props.loadingPage);
      this.props.getInboxData(this.props.selectedInbox, this.props.user, this.props.selectedInbox.viewName, this.props.showAlert, this.props.loadingPage);
    }

    if (this.props.tableAction) {
      if (this.props.tableAction === 'next') {
        this.nextLine();
      }
      if (this.props.tableAction === 'previous') {
        this.previousLine();
      }
      if (this.props.tableAction === 'end') {
        this.endLine();
      }
      if (this.props.tableAction === 'start') {
        this.startLine();
      }
      this.props.updateTableAction(null);
    }

    // if (!prevState.scrollToIndex && this.state.fireEvent) {
    //   this.eventFire(document.querySelector('[aria-rowindex="' + (this.state.scrollToIndex + 1) + '"]'), 'click');
    //   this.setState({
    //     fireEvent: false
    //   })
    // }
  }

  nextLine() {
    let newRowIndex = this.state.rowIndex + 1 < this.state.rows.length ? this.state.rowIndex + 1 : this.state.rowIndex;
    if (newRowIndex > (this.state.perPage - 1) * this.state.page) {
      this.setState({
        scrollToIndex: newRowIndex,
        fireEvent: true
      })
    } else {
      this.eventFire(document.querySelector('[aria-rowindex="' + (newRowIndex + 1) + '"]'), 'click');
    }
  }

  previousLine() {
    let newRowIndex = this.state.rowIndex - 1 > 0 ? this.state.rowIndex - 1 : 0;
    if (newRowIndex < (this.state.perPage * this.state.page - this.state.perPage)) {
      this.setState({
        scrollToIndex: newRowIndex,
        fireEvent: true
      })
    } else {
      this.eventFire(document.querySelector('[aria-rowindex="' + (newRowIndex + 1) + '"]'), 'click');
    }
  }

  endLine() {
    let newRow = this.state.rows.length - 1;
    this.setState({
      scrollToIndex: newRow,
      fireEvent: true
    })
  }

  startLine() {
    let newRow = 0;
    this.setState({
      scrollToIndex: newRow,
      fireEvent: true
    })
  }

  handleRowsScroll = ({ stopIndex }) => {
    if (this.state.fireEvent) {
      this.eventFire(document.querySelector('[aria-rowindex="' + (this.state.scrollToIndex + 1) + '"]'), 'click');
    }
    this.setState(prevState => {
      const page = Math.ceil(stopIndex / prevState.perPage)
      return { page, scrollToIndex: undefined, fireEvent: false }
    })
  }

  handlePageChange = (page) => {
    const rowsIndex = { startIndex: (page - 1) * this.state.perPage, stopIndex: page * this.state.perPage };
    this.loadMoreRows(rowsIndex);
    this.setState(prevState => {
      const scrollToIndex = (page - 1) * prevState.perPage
      return { page, scrollToIndex }
    })
  }

  cellRenderer = ({ cellData,
    columnData,
    columnIndex,
    dataKey,
    isScrolling,
    rowData,
    rowIndex
  }) => {
    let colorStyle = rowData.color ? s[rowData.color] : ''
    return (
      <div className={`${s.tableCell} ${colorStyle}`}>
        {cellData}
      </div>
    );
  };

  // rowRenderer = (props) => {
  //   return <defaultTableRowRenderer {...props} />
  // }

  // RowHoc = (rowRendererFn) => {
  //   function tableRowFn(props) {

  //     return rowRendererFn({
  //       ...props,
  //       className: 'foobar'
  //     });
  //   }

  //   return tableRowFn;
  // }

  resizeRow = ({ dataKey, deltaX, totalWidth }) => {
    this.setState(prevState => {
      const prevWidths = prevState.widths;
      const keys = Object.keys(this.state.widths);
      const nextIndex = keys.indexOf(dataKey) + 1;
      const nextDataKey = nextIndex < keys.length ? keys[nextIndex] : keys[0];

      return {
        widths: {
          ...prevWidths,
          [dataKey]: prevWidths[dataKey] + deltaX,
          [nextDataKey]: prevWidths[nextDataKey] - deltaX
        }
      };
    });
  }

  onStart = () => {
    this.setState({ dragging: true })
  }

  onStop = () => {
  }

  onUp = () => {
    this.setState({ dragging: false })
  }

  onTouchEnd = () => {
    this.setState({ dragging: false })
  }

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { columns, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
          label
        );
    const { totalWidth } = this.props;

    return (
      <React.Fragment key={dataKey}>
        <div className={s.headerCell}>
          {inner}
        </div>
        <Draggable
          axis="x"
          defaultClassName={s.DragHandle}
          defaultClassNameDragging={s.DragHandleActive}
          onDrag={(event, { deltaX }) =>
            this.resizeRow({
              dataKey,
              deltaX,
              totalWidth
            })
          }
          onStop={this.onStop}
          onStart={this.onStart}
          onMouseUp={this.onUp}
          onTouchEnd={this.onTouchEnd}
          position={{ x: 0 }}
          zIndex={999}
        >
          <span className={s.DragHandleIcon}>⋮</span>
        </Draggable>
      </React.Fragment>
    );
  };

  _sort = ({ sortBy, sortDirection }) => {
    if (!this.state.dragging) {
      const rowsTemp = _.sortBy(this.state.rows, item => item[sortBy]);
      const rows = sortDirection === SortDirection.DESC ? rowsTemp.reverse() : rowsTemp;
      this.setState({ sortBy: sortBy, sortDirection: sortDirection, rows: rows });
    } else {
      this.setState({ dragging: false })
    }
  }

  cellDateRenderer = ({ cellData,
    columnData,
    columnIndex,
    dataKey,
    isScrolling,
    rowData,
    rowIndex
  }) => {
    let colorStyle = rowData.color ? s[rowData.color] : ''
    return (
      <div className={`${s.tableCell} ${colorStyle}`}>
        {getLocalizedDate(cellData)}
      </div>
    );
  };

  cellBooleanRenderer = ({ cellData,
    columnData,
    columnIndex,
    dataKey,
    isScrolling,
    rowData,
    rowIndex
  }) => {
    let colorStyle = rowData.color ? s[rowData.color] : ''
    return (
      <div className={`${s.tableCell} ${colorStyle}`}>
        {cellData == 't' ? 'Да' : 'Нет'}
      </div>
    );
  };

  getRenderer = (type) => {
    switch (type) {
      case 3: // date
        return this.cellDateRenderer;
        break;
      case 4: //boolean
        return this.cellBooleanRenderer;
        break;
      default:
        return this.cellRenderer;
        break;
    }
  }

  rowStyleFormat(row) {
    if (row.index < 0) return;
    if (this.state.rowIndex === row.index) {
      return {
        backgroundColor: '#b0c7e8',
        color: '#333'
      };
    }
    return;
  }

  eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  loadMoreRows({ startIndex, stopIndex }) {
    const loadingPage = Math.trunc(startIndex / 500) + 1;

    if (loadingPage != this.state.loadingPage) {
      //Math.trunc(this.state.rows.length/500) + 1;
      this.setState({
        loadingPage: loadingPage
      })
      //this.props.getInboxData(this.props.selectedInbox.id, this.props.user, this.props.selectedInbox.viewName, this.props.showAlert, loadingPage);
    }
  }

  isRowLoaded({ index }) {
    return !!this.state.rows[index]; // загруженные записи
  }

  render() {
    const { classes, columns, totalWidth, totalHeight, ...tableProps } = this.props;
    const { page, perPage, scrollToIndex, sortBy, sortDirection, rows } = this.state; //, scrollToPosition 
    const rowCount = rows ? rows.length : 0; //Если нет коннекта к базе, rows будет undefined
    const rowCountAll = this.props.selectedInbox.itemsCount; //1500
    const pageCount = Math.ceil(rowCountAll / perPage);

    return (
      <React.Fragment>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded.bind(this)}
          loadMoreRows={this.loadMoreRows.bind(this)}
          rowCount={rowCountAll}
        //rowCount={rowCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <Table
              height={totalHeight - 35}
              width={totalWidth}
              {...tableProps}
              rowClassName={s.tableRow}
              //onRowsRendered={onRowsRendered}
              //onRowsRendered={this.handleRowsScroll}
              onRowsRendered={({ startIndex, stopIndex }) => { onRowsRendered({ startIndex, stopIndex }); this.handleRowsScroll({ stopIndex }); }}
              rowStyle={this.rowStyleFormat.bind(this)}
              scrollToIndex={scrollToIndex}
              scrollToAlignment={this.state.scrollToAlignment}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              rows={rows}
              rowCount={rowCount}
              rowGetter={({ index }) => rows[index]}
            >
              {columns.map(({ cellContentRenderer = null, dataKey, type, ...other }, index) => {
                let renderer = this.getRenderer(type);

                // if (cellContentRenderer != null) {
                //   renderer = cellRendererProps =>
                //     this.cellRenderer({
                //       cellData: cellContentRenderer(cellRendererProps),
                //       columnIndex: index,
                //     });
                // } else {
                //   renderer = this.cellRenderer;
                // }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                      })
                    }
                    className={s.flexContainer}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    width={this.state.widths[dataKey] || 0}
                    {...other}
                  />
                );
              })}
            </Table>
          )}
        </InfiniteLoader>
        <Paginator
          pageCount={pageCount}
          currentPage={page}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 20,
  rowHeight: 20,
};

export default MuiVirtualizedTable;