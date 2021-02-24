
import { getLocalizedDate } from 'utils/custom';

// для React-Virtualized
export const getVirtualizedColumns = (data) => {
  let columns = [];

  data.forEach((columnData) => {
      let column = {
          label: columnData.label,
          dataKey: columnData.id,
          type: columnData.type
      };

      if (columnData.type === 8) {
          column.flexGrow = 1.0;
      }

      columns.push(column);
  })

  return columns;
}

export const getColumns = (data) => {
  let columns = [];

  data.forEach((columnData) => {
    let column = {
      Header: columnData.label,
      id: columnData.id,
    };

    switch (columnData.type) {
      case 3:
        column.accessor = d => {
          return getLocalizedDate(d[columnData.id]);
        }
        break;
      case 4:
        column.accessor = d => {
          return d[columnData.id] === 't' ? 'Да' : (d[columnData.id] === undefined ? '': 'Нет');
        }
        break;
      default:
        column.accessor = columnData.id;
        break;
    }

    /*if (columnData.type === 3) {
        column.accessor = d => {
          return getLocalizedDate(d[columnData.id]);
        }
    } else {
      column.accessor = columnData.id
    }*/

    columns.push(column);
  })

  return columns;
}

export const getWidths = (totalWidth, columns) => {
  let widths = {};
  const columnWidth = totalWidth / columns.length;

  columns.forEach((columnData) => {
    widths[columnData.dataKey] = columnWidth; //120;
  })

  return widths;
}