import React from 'react';
import { Query, Builder, Utils as QbUtils } from 'react-awesome-query-builder';
import './antd.css'; //TODO: стили левой таблицы
import 'react-awesome-query-builder/css/styles.scss';
import { getConfig } from 'utils/queryBuilder';

const QueryBuilder = (props) => {
  const renderBuilder = (props) => {
    return <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  }

  const renderResult = ({ tree: immutableTree, config }) => {
    return <div className="query-builder-result">
      {/* <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div> */}
    </div>
  }

  const onChange = (immutableTree, config) => {
    const jsonTree = QbUtils.getTree(immutableTree);
    //TODO: отрефакторить и проверить
    props.updateQueryBuilder({
      //...props.queryBuilder,
      queryTree: jsonTree
    })
  }

  const config = getConfig(props.fields);
  //const config = getConfig(props.queryBuilder.fields);
  const immutableTree = QbUtils.checkTree(QbUtils.loadTree(props.queryBuilder.queryTree), config);

  return <div>
    <Query
      {...config}
      value={immutableTree}
      onChange={onChange}
      renderBuilder={renderBuilder}
    />
    {renderResult({
      tree: immutableTree,
      config: config
    })}
  </div>
}

export default QueryBuilder
