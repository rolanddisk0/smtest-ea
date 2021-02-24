import {BasicConfig} from 'react-awesome-query-builder';
const {
    conjunctions: {
        AND,
        OR
    },
    operators: {
        equal,
        not_equal,
        less,
        less_or_equal,
        greater,
        greater_or_equal,
        like,
        not_like,
        between,
        not_between,
        is_empty,
        is_not_empty,
        select_equals, // like `equal`, but for select
        select_not_equals,
        select_any_in,
        select_not_any_in,
        multiselect_equals, // like `equal`, but for multiselect
        multiselect_not_equals,
        proximity, // complex operator with options
    },
    widgets: {
      text,
      number,
      slider,
      rangeslider,
      select,
      multiselect,
      treeselect,
      treemultiselect,
      date,
      time,
      datetime,
      boolean,
      field, // to compare field with another field of same type
      func, // to compare field with result of function
    },
    types: {
      text,
      number,
      date,
      time,
      datetime,
      select,
      multiselect,
      treeselect,
      treemultiselect,
      boolean,
    },
    settings
} = BasicConfig;

export default BasicConfig

// const myConfig = {
//   ...BasicConfig, // reuse basic config

//   fields: {
//     stock: {
//         label: 'In stock',
//         type: 'boolean',
//     },
//     // ... my other fields
//   }
// };