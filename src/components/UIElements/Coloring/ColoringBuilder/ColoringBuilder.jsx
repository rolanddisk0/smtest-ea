import React from 'react';
import { Query, Builder, Utils as QbUtils } from 'react-awesome-query-builder';
import './antd.css'; //TODO: стили левой таблицы
import 'react-awesome-query-builder/css/styles.scss';
import { getConfig } from 'utils/coloringBuilder';


// props.updateQueryBuilder
// props.queryBuilder.fields
// props.queryBuilder.queryTree
const ColoringBuilder = (props) => {
  const { fields, queryTree, color, index } =  props;

  const renderBuilder = (props) => {
    return <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  }

  const renderResult = ({ tree: immutableTree, config }) => {
    return <div className="query-builder-result">
      {/* <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div> */}
    </div>
  }

  const onChange = (immutableTree, config) => {
    const jsonTree = QbUtils.getTree(immutableTree);
    props.updateColoring(jsonTree, color, index);
  }

  const config = getConfig(fields);
  const immutableTree = QbUtils.checkTree(QbUtils.loadTree(queryTree), config);

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

export default ColoringBuilder
