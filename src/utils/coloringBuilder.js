import { Utils as QbUtils } from 'react-awesome-query-builder';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
const InitialConfig = AntdConfig; // or BasicConfig

export const typesMap = {
  1: 'number',
  2: 'text',
  3: 'datetime',
  4: 'boolean',
  8: 'text', //?
  9: 'text',//?
}

export const getColoringFormatted = (coloring, fields) => {
  let coloringFormatted = [];
  let config = getConfig(fields);

  if (coloring && coloring.length > 0) {
    coloring.forEach((coloring) => {
      if (coloring.color) {
        let immutableTree = QbUtils.checkTree(QbUtils.loadTree(coloring.queryTree), config);
        coloringFormatted.push({
          condition: QbUtils.queryString(immutableTree, config),
          color: coloring.color
        });
      }
    });
  }

  return coloringFormatted;
}

export const getConfig = (fields) => {
  let fieldsConfig = {};

  if (fields) {
    fields.forEach((field, index) => {
      fieldsConfig[field.id] = {
        label: field.label,
        type: typesMap[field.type],
        valueSources: ['value'] // глобаллист из датадикта?
      }
    })
  }

  return {
    ...InitialConfig,
    fields: {
      record: {
        label: 'Текущая запись',
        type: '!struct',
        subfields: fieldsConfig
      }
    },
    operators: {
      equal: {
        label: "==",
        labelForFormat: "==",
        sqlOp: "=",
        reversedOp: "not_equal",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "boolean") {
            if (isForDisplay) {
              return value == "No" ? "NOT ".concat(field) : "".concat(field);
            }
            return value == "false" ? "".concat(field, "!=", "'t'") : "".concat(field, "==", "'t'");
          }
          if (valueTypes == "datetime") {
            return "".concat("new Date(", field, ")==").concat("new Date(", value.replace(/-/g, '/'), ")");
          }
          return "".concat(field, " ").concat(opDef.label, " ").concat(value);
        },
        // custom
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueType == "boolean" && values == "true") {
            return "".concat(field, "=").concat("'t'");
          }
          if (valueType == "boolean" && values == "false") {
            return "".concat("ISNULL(", field, ",'f')=").concat("'f'");
          }
          return "".concat(field, "=").concat(values);
        },
        jsonLogic: "=="
      },
      not_equal: {
        label: "!=",
        labelForFormat: "!=",
        sqlOp: "<>",
        reversedOp: "equal",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {

        },
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "datetime") {
            return "".concat("new Date(", field, ")!=").concat("new Date(", value.replace(/-/g, '/'), ")");
          }
          if (valueTypes == "boolean") {
            if (isForDisplay) {
              return value == "No" ? "".concat(field) : "NOT ".concat(field);
            }
            return value == "false" ? "".concat(field, "==", "'t'") : "".concat(field, "!=", "'t'");
          }
          //return "".concat(field, " ").concat(opDef.label, " ").concat(value);
          return "".concat(field, "!=").concat(value);
        },
        jsonLogic: "!="
      },
      less: {
        label: "<",
        labelForFormat: "<",
        sqlOp: "<",
        reversedOp: "greater_or_equal",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "datetime") {
            return "".concat("new Date(", field, ")<").concat("new Date(", value.replace(/-/g, '/'), ")");
          } else {
            return "".concat(field, "<").concat(value);
          }
        },
        jsonLogic: "<"
      },
      less_or_equal: {
        label: "<=",
        labelForFormat: "<=",
        sqlOp: "<=",
        reversedOp: "greater",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "datetime") {
            return "".concat("new Date(", field, ")<=").concat("new Date(", value.replace(/-/g, '/'), ")");
          } else {
            return "".concat(field, "<=").concat(value);
          }
        },
        jsonLogic: "<="
      },
      greater: {
        label: ">",
        labelForFormat: ">",
        sqlOp: ">",
        reversedOp: "less_or_equal",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "datetime") {
            return "".concat("new Date(", field, ")>").concat("new Date(", value.replace(/-/g, '/'), ")");
          } else {
            return "".concat(field, ">").concat(value);
          }
        },
        jsonLogic: ">"
      },
      greater_or_equal: {
        label: ">=",
        labelForFormat: ">=",
        sqlOp: ">=",
        reversedOp: "less",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "datetime") {
            return "".concat("new Date(", field, ")>=").concat("new Date(", value.replace(/-/g, '/'), ")");
          } else {
            return "".concat(field, ">=").concat(value);
          }
        },
        jsonLogic: ">="
      },
      // like: {
      //   label: "Содержит",
      //   labelForFormat: "Like",
      //   reversedOp: "not_like",
      //   sqlOp: "LIKE",
      //   sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      //     if (valueSrc == "value") {
      //       return "".concat(field, " LIKE ").concat(values);
      //     } else return undefined; // not supported

      //   },
      //   jsonLogic: "in",
      //   _jsonLogicIsRevArgs: true,
      //   valueSources: ["value"]
      // },
      // not_like: {
      //   label: "Не содержит",
      //   reversedOp: "like",
      //   labelForFormat: "Not Like",
      //   sqlOp: "NOT LIKE",
      //   sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      //     if (valueSrc == "value") {
      //       return "".concat(field, " NOT LIKE ").concat(values);
      //     } else return undefined; // not supported

      //   },
      //   valueSources: ["value"]
      // },
      // starts_with: {
      //   label: "Начинается с",
      //   labelForFormat: "Starts with",
      //   sqlOp: "LIKE",
      //   sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      //     if (valueSrc == "value") {
      //       return "".concat(field, " LIKE ").concat(values);
      //     } else return undefined; // not supported

      //   },
      //   jsonLogic: undefined,
      //   // not supported
      //   valueSources: ["value"]
      // },
      // ends_with: {
      //   label: "Заканчивается",
      //   labelForFormat: "Ends with",
      //   sqlOp: "LIKE",
      //   sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
      //     if (valueSrc == "value") {
      //       return "".concat(field, " LIKE ").concat(values);
      //     } else return undefined; // not supported

      //   },
      //   jsonLogic: undefined,
      //   // not supported
      //   valueSources: ["value"]
      // },
      // between: {
      //   label: "Между",
      //   labelForFormat: "BETWEEN",
      //   sqlOp: "BETWEEN",
      //   cardinality: 2,
      //   formatOp: function formatOp(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) {
      //     var valFrom = values.first();
      //     var valTo = values.get(1);
      //     if (isForDisplay) return "".concat(field, " >= ").concat(valFrom, " AND ").concat(field, " <= ").concat(valTo); else return "".concat(field, " >= ").concat(valFrom, " && ").concat(field, " <= ").concat(valTo);
      //   },
      //   valueLabels: ["Value from", "Value to"],
      //   textSeparators: [null, "and"],
      //   reversedOp: "not_between",
      //   jsonLogic: "<=",
      //   validateValues: function validateValues(values) {
      //     if (values[0] != undefined && values[1] != undefined) {
      //       return values[0] <= values[1] ? null : "Invalid range";
      //     }

      //     return null;
      //   }
      // },
      // not_between: {
      //   label: "Не между",
      //   labelForFormat: "NOT BETWEEN",
      //   sqlOp: "NOT BETWEEN",
      //   cardinality: 2,
      //   valueLabels: ["Value from", "Value to"],
      //   textSeparators: [null, "and"],
      //   reversedOp: "between",
      //   validateValues: function validateValues(values) {
      //     if (values[0] != undefined && values[1] != undefined) {
      //       return values[0] <= values[1] ? null : "Invalid range";
      //     }

      //     return null;
      //   }
      // },
      is_empty: {
        label: "Пусто",
        labelForFormat: "IS NULL",
        sqlOp: "IS NULL",
        cardinality: 0,
        reversedOp: "is_not_empty",
        formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          return isForDisplay ? "".concat(field, " IS EMPTY") : "!".concat(field);
        },
        jsonLogic: "!"
      },
      is_not_empty: {
        label: "Не пусто",
        labelForFormat: "IS NOT NULL",
        sqlOp: "IS NOT NULL",
        cardinality: 0,
        reversedOp: "is_empty",
        formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          return isForDisplay ? "".concat(field, " IS NOT NULL") : "!!".concat(field);
        },
        jsonLogic: "!!"
      },
      // select_equals: {
      //   label: "==",
      //   labelForFormat: "==",
      //   sqlOp: "=",
      //   // enum/set
      //   formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      //     return "".concat(field, " == ").concat(value);
      //   },
      //   reversedOp: "select_not_equals",
      //   jsonLogic: "=="
      // },
      // select_not_equals: {
      //   label: "!=",
      //   labelForFormat: "!=",
      //   sqlOp: "<>",
      //   // enum/set
      //   formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
      //     return "".concat(field, " != ").concat(value);
      //   },
      //   reversedOp: "select_equals",
      //   jsonLogic: "!="
      // }
    },
    settings: {
      ...InitialConfig.settings,
      locale: {
        short: 'ru',
        full: 'ru-RU',
        antd: ru_RU,
      },
      //Next options are for localization:
      valueLabel: "Значение",
      valuePlaceholder: "Значение",
      fieldLabel: "Поле",
      operatorLabel: "Оператор",
      fieldPlaceholder: "Выберите поле",
      operatorPlaceholder: "Выберите оператор",
      addGroupLabel: "Добавить группу",
      addRuleLabel: "Добавить правило",
      notLabel: "НЕ",
      valueSourcesPopupTitle: "Select value source",
    }
  }
}