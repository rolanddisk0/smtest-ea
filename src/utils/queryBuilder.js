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
    operators: {
      equal: {
        label: "==",
        labelForFormat: "==",
        sqlOp: "=",
        reversedOp: "not_equal",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "boolean" && isForDisplay) {
            return value == "No" ? "NOT ".concat(field) : "".concat(field);
          } else {
            return "".concat(field, " ").concat(opDef.label, " ").concat(value);
          }
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
        // mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
        //   return v;
        // }, false),
        jsonLogic: "=="
      },
      not_equal: {
        label: "!=",
        labelForFormat: "!=",
        sqlOp: "<>",
        reversedOp: "equal",
        formatOp: function formatOp(field, op, value, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay, fieldDef) {
          if (valueTypes == "boolean" && isForDisplay) return value == "No" ? "".concat(field) : "NOT ".concat(field); else return "".concat(field, " ").concat(opDef.label, " ").concat(value);
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
        //   return v;
        // }, false),
        jsonLogic: "!="
      },
      less: {
        label: "<",
        labelForFormat: "<",
        sqlOp: "<",
        reversedOp: "greater_or_equal",
        // mongoFormatOp: mongoFormatOp1.bind(null, "$lt", function (v) {
        //   return v;
        // }, false),
        jsonLogic: "<"
      },
      less_or_equal: {
        label: "<=",
        labelForFormat: "<=",
        sqlOp: "<=",
        reversedOp: "greater",
        // mongoFormatOp: mongoFormatOp1.bind(null, "$lte", function (v) {
        //   return v;
        // }, false),
        jsonLogic: "<="
      },
      greater: {
        label: ">",
        labelForFormat: ">",
        sqlOp: ">",
        reversedOp: "less_or_equal",
        // mongoFormatOp: mongoFormatOp1.bind(null, "$gt", function (v) {
        //   return v;
        // }, false),
        jsonLogic: ">"
      },
      greater_or_equal: {
        label: ">=",
        labelForFormat: ">=",
        sqlOp: ">=",
        reversedOp: "less",
        // mongoFormatOp: mongoFormatOp1.bind(null, "$gte", function (v) {
        //   return v;
        // }, false),
        jsonLogic: ">="
      },
      like: {
        label: "Содержит",
        labelForFormat: "Like",
        reversedOp: "not_like",
        sqlOp: "LIKE",
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueSrc == "value") {
            return "".concat(field, " LIKE ").concat(values);
          } else return undefined; // not supported

        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
        //   return typeof v == "string" ? (0, _stuff.escapeRegExp)(v) : undefined;
        // }, false),
        jsonLogic: "in",
        _jsonLogicIsRevArgs: true,
        valueSources: ["value"]
      },
      not_like: {
        label: "Не содержит",
        reversedOp: "like",
        labelForFormat: "Not Like",
        sqlOp: "NOT LIKE",
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueSrc == "value") {
            return "".concat(field, " NOT LIKE ").concat(values);
          } else return undefined; // not supported

        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
        //   return typeof v == "string" ? (0, _stuff.escapeRegExp)(v) : undefined;
        // }, true),
        valueSources: ["value"]
      },
      starts_with: {
        label: "Начинается с",
        labelForFormat: "Starts with",
        sqlOp: "LIKE",
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueSrc == "value") {
            return "".concat(field, " LIKE ").concat(values);
          } else return undefined; // not supported

        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
        //   return typeof v == "string" ? "^" + (0, _stuff.escapeRegExp)(v) : undefined;
        // }, false),
        jsonLogic: undefined,
        // not supported
        valueSources: ["value"]
      },
      ends_with: {
        label: "Заканчивается",
        labelForFormat: "Ends with",
        sqlOp: "LIKE",
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueSrc == "value") {
            return "".concat(field, " LIKE ").concat(values);
          } else return undefined; // not supported

        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$regex", function (v) {
        //   return typeof v == "string" ? (0, _stuff.escapeRegExp)(v) + "$" : undefined;
        // }, false),
        jsonLogic: undefined,
        // not supported
        valueSources: ["value"]
      },
      between: {
        label: "Между",
        labelForFormat: "BETWEEN",
        sqlOp: "BETWEEN",
        cardinality: 2,
        formatOp: function formatOp(field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) {
          var valFrom = values.first();
          var valTo = values.get(1);
          if (isForDisplay) return "".concat(field, " >= ").concat(valFrom, " AND ").concat(field, " <= ").concat(valTo); else return "".concat(field, " >= ").concat(valFrom, " && ").concat(field, " <= ").concat(valTo);
        },
        // mongoFormatOp: mongoFormatOp2.bind(null, ["$gte", "$lte"], false),
        valueLabels: ["Value from", "Value to"],
        textSeparators: [null, "and"],
        reversedOp: "not_between",
        jsonLogic: "<=",
        validateValues: function validateValues(values) {
          if (values[0] != undefined && values[1] != undefined) {
            return values[0] <= values[1] ? null : "Invalid range";
          }

          return null;
        }
      },
      not_between: {
        label: "Не между",
        labelForFormat: "NOT BETWEEN",
        sqlOp: "NOT BETWEEN",
        cardinality: 2,
        // mongoFormatOp: mongoFormatOp2.bind(null, ["$gte", "$lte"], true),
        valueLabels: ["Value from", "Value to"],
        textSeparators: [null, "and"],
        reversedOp: "between",
        validateValues: function validateValues(values) {
          if (values[0] != undefined && values[1] != undefined) {
            return values[0] <= values[1] ? null : "Invalid range";
          }

          return null;
        }
      },
      is_empty: {
        label: "Пусто",
        labelForFormat: "IS NULL",
        sqlOp: "IS NULL",
        cardinality: 0,
        reversedOp: "is_not_empty",
        formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          return isForDisplay ? "".concat(field, " IS EMPTY") : "!".concat(field);
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$exists", function (v) {
        //   return false;
        // }, false),
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
        // mongoFormatOp: mongoFormatOp1.bind(null, "$exists", function (v) {
        //   return true;
        // }, false),
        jsonLogic: "!!"
      },
      select_equals: {
        label: "==",
        labelForFormat: "==",
        sqlOp: "=",
        // enum/set
        formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          return "".concat(field, " == ").concat(value);
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
        //   return v;
        // }, false),
        reversedOp: "select_not_equals",
        jsonLogic: "=="
      },
      select_not_equals: {
        label: "!=",
        labelForFormat: "!=",
        sqlOp: "<>",
        // enum/set
        formatOp: function formatOp(field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          return "".concat(field, " != ").concat(value);
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
        //   return v;
        // }, false),
        reversedOp: "select_equals",
        jsonLogic: "!="
      },
      select_any_in: {
        label: "Any in",
        labelForFormat: "IN",
        sqlOp: "IN",
        formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          if (valueSrc == "value") return "".concat(field, " IN (").concat(values.join(", "), ")"); else return "".concat(field, " IN (").concat(values, ")");
        },
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          return "".concat(field, " IN (").concat(values.join(", "), ")");
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$in", function (v) {
        //   return v;
        // }, false),
        reversedOp: "select_not_any_in",
        jsonLogic: "in"
      },
      select_not_any_in: {
        label: "Not in",
        labelForFormat: "NOT IN",
        sqlOp: "NOT IN",
        formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          if (valueSrc == "value") return "".concat(field, " NOT IN (").concat(values.join(", "), ")"); else return "".concat(field, " NOT IN (").concat(values, ")");
        },
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          return "".concat(field, " NOT IN (").concat(values.join(", "), ")");
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$nin", function (v) {
        //   return v;
        // }, false),
        reversedOp: "select_any_in"
      },
      /*multiselect_equals: {
        label: "Equals",
        labelForFormat: "==",
        sqlOp: "=",
        formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          if (valueSrc == "value") return "".concat(field, " == [").concat(values.join(", "), "]");else return "".concat(field, " == ").concat(values);
        },
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueSrc == "value") // set
            return "".concat(field, " = '").concat(values.map(function (v) {
              return _sql.SqlString.trim(v);
            }).join(","), "'");else return undefined; //not supported
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$eq", function (v) {
        //   return v;
        // }, false),
        reversedOp: "multiselect_not_equals",
        jsonLogic2: "all-in",
        jsonLogic: function jsonLogic(field, op, vals) {
          return {
            // it's not "equals", but "includes" operator - just for example
            "all": [field, {
              "in": [{
                "var": ""
              }, vals]
            }]
          };
        }
      },
      multiselect_not_equals: {
        label: "Not equals",
        labelForFormat: "!=",
        sqlOp: "<>",
        formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          if (valueSrc == "value") return "".concat(field, " != [").concat(values.join(", "), "]");else return "".concat(field, " != ").concat(values);
        },
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          if (valueSrc == "value") // set
            return "".concat(field, " != '").concat(values.map(function (v) {
              return _sql.SqlString.trim(v);
            }).join(","), "'");else return undefined; //not supported
        },
        // mongoFormatOp: mongoFormatOp1.bind(null, "$ne", function (v) {
        //   return v;
        // }, false),
        reversedOp: "multiselect_equals"
      },
      proximity: {
        label: "Proximity search",
        cardinality: 2,
        valueLabels: [{
          label: "Word 1",
          placeholder: "Enter first word"
        }, {
          label: "Word 2",
          placeholder: "Enter second word"
        }],
        textSeparators: [//'Word 1',
          //'Word 2'
        ],
        formatOp: function formatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) {
          var val1 = values.first();
          var val2 = values.get(1);
          var prox = operatorOptions.get("proximity");
          return "".concat(field, " ").concat(val1, " NEAR/").concat(prox, " ").concat(val2);
        },
        sqlFormatOp: function sqlFormatOp(field, op, values, valueSrc, valueType, opDef, operatorOptions) {
          var val1 = values.first();
          var val2 = values.get(1);
    
          var _val1 = _sql.SqlString.trim(val1);
    
          var _val2 = _sql.SqlString.trim(val2);
    
          var prox = operatorOptions.get("proximity");
          return "CONTAINS(".concat(field, ", 'NEAR((").concat(_val1, ", ").concat(_val2, "), ").concat(prox, ")')");
        },
        mongoFormatOp: undefined,
        // not supported
        jsonLogic: undefined,
        // not supported
        options: {
          optionLabel: "Near",
          // label on top of "near" selectbox (for config.settings.showLabels==true)
          optionTextBefore: "Near",
          // label before "near" selectbox (for config.settings.showLabels==false)
          optionPlaceholder: "Select words between",
          // placeholder for "near" selectbox
          factory: function factory(props) {
            return _react["default"].createElement(ProximityOperator, props);
          },
          minProximity: 2,
          maxProximity: 10,
          defaults: {
            proximity: 2
          }
        }
      }*/
    },
    fields: fieldsConfig,
    settings: {
      ...InitialConfig.settings,
      locale: {
        short: 'ru',
        full: 'ru-RU',
        antd: ru_RU,
      },
      //Next options are for localization:
      //hideConjForOne: false,
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