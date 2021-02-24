import React from 'react'
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
  usePagination,
  useSortBy,
  useExpanded
} from 'react-table'
import s from './ReactTable.module.scss';

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)
const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    const customClick = (event) => {;
      event.stopPropagation();
    }

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} onClick={customClick}/>
      </>
    )
  }
)

function ReactTable({
  columns,
  data,
  onRowClick,
  uniqueKey,
  contentId,
  pageCount: controlledPageCount,
  setPageConfig,
  pageConfig,
  onContextMenu
}) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 30,
      maxWidth: 200,
    }),
    []
  )

  const { getTableProps, headerGroups, rows, prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    //gotoPage, // закомментировано, тк используется useControlledState
    //nextPage,
    //previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
    ...props
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 50
      },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount: controlledPageCount,
      useControlledState: state => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: pageConfig.pageIndex //controlledPageIndex,
          }),
          [state, pageConfig.pageIndex ] //controlledPageIndex
        )
      }
    },
    useResizeColumns,
    useFlexLayout,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => {
            return <div>
              {row.depth === 0 ? <IndeterminateCheckbox {...row.getToggleRowSelectedProps()}/> : null }
            </div>
          },
        },
        {
          id: 'expander',
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
            <span {...getToggleAllRowsExpandedProps()}>
              {isAllRowsExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
            </span>
          ),
          Cell: ({ row }) =>
            row.canExpand ? (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    paddingLeft: `${row.depth * 2}rem`
                  },
                })}
              >
                {row.isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
              </span>
            ) : null
        },
        ...columns,
      ])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        const selectionGroupHeader = headerGroups[0].headers[0]
        selectionGroupHeader.canResize = false
      })
    }
  )

  React.useEffect(() => {
    setPageConfig({
      pageSize: pageSize,
      pageIndex: pageIndex,
      sortBy: sortBy
    })
  }, [sortBy, pageSize]);

  const disableClick = (event) => {;
    event.preventDefault();
    event.stopPropagation();
  }

  return <>
    <div {...getTableProps()} className='table'>
      <div>
        {headerGroups.map(headerGroup => (
          <div
            {...headerGroup.getHeaderGroupProps({
            })}
            className={s.headerRow}
          >
            {headerGroup.headers.map(column => {
              return <div {...column.getHeaderProps()} className={s.headerCell}>
                <div
                  {...column.getSortByToggleProps()}
                  className='header-content'
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </div>
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={`${s.resizer} ${column.isResizing ? s.resizing : ''}`}>
                    <span className={s.DragHandleIcon}>⋮</span>
                  </div>
                )}
              </div>
            })}
          </div>
        ))}
      </div>
      <div className='list-tbody'>
        {rows.map(row => {
          prepareRow(row);
          //console.log('row=', row);
          let colorStyle = row.original.color ? s[row.original.color] : '';
          let backgroundStyle = (row.original[uniqueKey] == contentId) ? s.selectedRow : (row.depth > 0 ? s.subRow : '');

          return (
            <div {...row.getRowProps()} className={`${s.tableRow} ${colorStyle} ${backgroundStyle}`} data-unique_key={row.original[uniqueKey]}
              data-list_row_index={row.index} onClick={onRowClick} onContextMenu={onContextMenu}>
              {row.cells.map(cell => {
                //console.log('cell=', cell);
                return (
                  <div {...cell.getCellProps(cellProps)} className={s.tableCell} onClick={(cell.column.id == 'expander' || cell.column.id =='selection') ? disableClick : undefined}>
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
    <div className='pagination'>
      <button onClick={() => setPageConfig({...pageConfig, pageIndex: 0})} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => setPageConfig({...pageConfig, pageIndex: pageIndex - 1})} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => setPageConfig({...pageConfig, pageIndex: pageIndex + 1})} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => setPageConfig({...pageConfig, pageIndex: pageCount - 1})} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        Страница{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Перейти к:{' '}
        <input
          type='number'
          defaultValue={pageIndex + 1}
          min='1'
          onChange={e => {
            const page = e.target.value && e.target.value > 0 ? Number(e.target.value) - 1 : 0;
            setPageConfig({...pageConfig, pageIndex: page})
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[50, 100, 150].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Показать {pageSize}
          </option>
        ))}
      </select>
    </div>
  </>
}


export default ReactTable