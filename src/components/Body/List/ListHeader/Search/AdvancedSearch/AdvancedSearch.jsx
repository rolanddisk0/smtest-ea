import React, { useState, useEffect } from 'react';
import s from './AdvancedSearch.module.scss';
import { Button } from '@material-ui/core';
import QueryBuilder from 'components/UIElements/QueryBuilder/QueryBuilder';
import { Utils as QbUtils } from 'react-awesome-query-builder';
import * as _ from 'underscore';
import usePrevious from 'hooks/usePrevious';
import { getConfig } from 'utils/queryBuilder';

const AdvancedSearch = props => {
  const clearFilter = () => {
    props.updateFilter({
      advancedFilter: {
        queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
        sql: null
      }
    });
  }
  const startSearch = () => {
    const config = getConfig(props.fields);
    const ImmutableTree = QbUtils.checkTree(QbUtils.loadTree(advFilterValue.queryTree), config);
    const sql = QbUtils.sqlFormat(ImmutableTree, config);

    if (props.filter.sql != null || sql != null) {
      const advancedFilter = {
        ...advFilterValue,
        sql: sql
      }
      props.updateFilter({
        advancedFilter: advancedFilter
      });
      props.handleClose();
    }
  }
  const [advFilterValue, setAdvFilterValue] = useState(props.filter);
  const prevFilter = usePrevious(props.filter);

  useEffect(() => {
    if (!_.isEqual(advFilterValue, props.filter) && !_.isEqual(prevFilter, props.filter)) {
      setAdvFilterValue(props.filter);
    }
  }, [props.filter, prevFilter]);

  return <>
    <Button onClick={clearFilter} color='secondary'>
      Очистить фильтр
    </Button>
    <Button onClick={startSearch} color='secondary'>
      Применить фильтр
    </Button>
    <QueryBuilder fields={props.fields} queryBuilder={advFilterValue} updateQueryBuilder={setAdvFilterValue} />
  </>
}

export default AdvancedSearch

