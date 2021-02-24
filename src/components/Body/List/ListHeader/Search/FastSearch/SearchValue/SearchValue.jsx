import React from 'react'
import s from './SearchValue.module.scss';
import { TextField, FormControl, Checkbox, Select, MenuItem } from '@material-ui/core';

const Search = props => {
  const fieldType = ['Пусто', 'Не пусто'].indexOf(props.operatorValue) >= 0 ? 'empty' :
    (props.fieldConfig.type == 3 ? 'date' : (props.fieldConfig.type == 4 ? 'boolean' : (props.fieldConfig.type == 1 ? 'number' : 'text')));
  const handleValueChange = (event) => {
    const value = (fieldType == 'boolean' ? event.target.checked : event.target.value);
    props.setFieldValue(value);
  }
  const handleOperatorChange = (event) => {
    const value = event.target.value;
    props.setOperatorValue(value);
  }
  const getOperators = (fieldType) => {
    let operators = ['='];

    if (fieldType != 'boolean') {
      operators = [...operators, 'Пусто', 'Не пусто'];
    }
    if (['date', 'number'].indexOf(fieldType) >= 0) {
      operators = [...operators, '>', '<', '>=', '<='];
    }
    if (['text'].indexOf(fieldType) >= 0) {
      operators = [...operators, 'Содержит'];
    }

    return operators;
  }
  const operators = getOperators(fieldType);

  return <>
    <Select
      onChange={handleOperatorChange}
      defaultValue={'='}
      className={`${s.fieldInline} ${s.operator}`}
      required
    >
      {operators.map(operator => (
        <MenuItem key={operator} value={operator}>{operator}</MenuItem>
      ))}
    </Select>
    {fieldType == 'text' &&
      <FormControl fullWidth>
        <TextField
          label='Значение'
          onChange={handleValueChange}
        />
      </FormControl>
    }
    {
      fieldType == 'date' &&
      <FormControl fullWidth>
        <TextField
          label='Значение'
          type='datetime-local'
          onChange={handleValueChange}
          InputLabelProps={{
            shrink: true,
          }}
          className={s.fieldInline}
        />
      </FormControl>
    }
    {
      fieldType == 'number' && <>
        <FormControl fullWidth>
          <TextField
            onChange={handleValueChange}
            label='Значение'
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </>
    }
    {
      fieldType == 'boolean' &&
      <Checkbox
        onChange={handleValueChange}
      />
    }
  </>
}

export default Search
