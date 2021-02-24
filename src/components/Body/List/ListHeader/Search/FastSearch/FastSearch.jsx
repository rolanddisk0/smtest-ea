import React, { useState, useEffect } from 'react'
import s from './FastSearch.module.scss';
import { Button, InputAdornment, TextField, FormControl, AppBar, Paper, Chip, Dialog, DialogContent, DialogActions, DialogTitle, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import shortid from 'shortid';
import SearchValue from './SearchValue/SearchValue';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';
import { makeStyles } from '@material-ui/core/styles';
import * as _ from 'underscore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  scrollPaper: {
    alignItems: 'start'
  }
}));

// Быстрый поиск (И), как на форме в СМ
// TODO: Добавить вкладку расширенного поиска
const FastSearch = props => {
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState('=');
  const [fieldConfig, setFieldConfig] = useState({});
  const [fieldSelected, setFieldSelected] = useState(false);
  const [сurrentFilters, setCurrentFilters] = React.useState(props.selectedInbox.additionalFilter);
  const handleDelete = (filterToDelete) => {
    setCurrentFilters(сurrentFilters.filter((filter) => filter.name !== filterToDelete));
  }
  const getFieldValue = (fieldConfig, fieldValue, operatorValue) => {
    let value = fieldValue;
    const fieldType = Number(fieldConfig.type);

    if (operatorValue == 'Пусто') {
      return 'Пусто';
    }

    if (operatorValue == 'Не пусто') {
      return 'Не пусто';
    }

    switch (fieldType) {
      case 4: // boolean
        value = fieldValue == true ? 'Да' : 'Нет';
        break;
      case 3: //datetime
        value = fieldValue.slice(0, 19).replace('T', ' ');
        break;
      default:
        value = fieldValue;
        break;
    }

    return value;
  }
  const getFieldDisplayOperator = (fieldConfig, operatorValue) => {
    let operator = '';

    switch (operatorValue) {
      case 'Не пусто':
      case 'Пусто':
        operator = `=`;
        break;
      default:
        operator = (Number(fieldConfig.type) == 1 || Number(fieldConfig.type) == 3) ? operatorValue : (operatorValue == 'Содержит' ? ` ${operatorValue} ` : '=');
        break;
    }

    return operator;
  }
  const getFieldQuery = (fieldConfig, operatorValue) => {
    let query = '';
    const fieldType = Number(fieldConfig.type);

    if (operatorValue == 'Пусто') {
      return `${fieldConfig.name} IS NULL`;
    }

    if (operatorValue == 'Не пусто') {
      return `${fieldConfig.name} IS NOT NULL`;
    }

    // TODO проверить
    // if (!fieldValue || (fieldType == 1 || fieldType == 3) && !operatorValue) {
    //   return null;
    // }

    switch (fieldType) {
      case 4: // boolean
        if (fieldValue == true) {
          query = `${fieldConfig.name}='t'`;
        } else {
          query = `${fieldConfig.name}<>'t'`;
        }
        break;
      case 2: // string
        if (operatorValue == 'Содержит') {
          query = `${fieldConfig.name} like '%${fieldValue}%'`;
        } else {
          query = `${fieldConfig.name}='${fieldValue}'`;
        }
        break;
      case 3: //datetime
        query = `${fieldConfig.name}${operatorValue}'${fieldValue.slice(0, 19).replace('T', ' ')}'`;
        break;
      case 1: //number
        query = `${fieldConfig.name}${operatorValue}${fieldValue}`;
        break;
      default:
        query = `${fieldConfig.name} like '%${fieldValue}%'`;
        break;
    }

    return query;
  }
  const startSearch = () => {
    props.updateSelectedInbox({
      additionalFilter: сurrentFilters
    });
    props.handleClose();
  }
  const addSearch = () => {
    setCurrentFilters([...сurrentFilters,
    {
      sql: getFieldQuery(fieldConfig, operatorValue),
      name: `${fieldConfig.caption}${getFieldDisplayOperator(fieldConfig, operatorValue)}${getFieldValue(fieldConfig, fieldValue, operatorValue)}`
    }
    ]);
    setFieldSelected(false);
    setFieldValue(null);
    setOperatorValue('=');
  }
  const clearFilter = () => {
    props.updateSelectedInbox({
      additionalFilter: []
    });
    //setCurrentFilters([])
  }
  const handleClose = () => {
    if (fieldSelected) {
      setFieldSelected(false);
    } //else {
    //setFilterValue(null);
    //props.handleClose();
    //}
  }
  const handleListClick = (event) => {
    setFieldConfig({
      caption: event.target.dataset.fieldcaption,
      name: event.target.dataset.fieldname,
      type: event.target.dataset.fieldtype
    });
    setFieldSelected(true);
  }
  //0: {id: "HPC_ALERT_1", label: "50 процентов срока прошло", type: 4}
  const fields = props.fields; //props.interactionFields;
  let filteredFields = fields.filter(field => {
    let reg = new RegExp(filterValue, 'gi');
    let checkResult = !filterValue || filterValue === '' || reg.test(field.label);
    return checkResult;
  });
  let searchFields = filteredFields.map(item => {
    return <li key={shortid.generate()} className={s.listItem}>
      <div key={item.label} className={s.line} data-fieldname={item.id} data-fieldcaption={item.label} data-fieldtype={item.type} onClick={handleListClick}>
        {item.label}
      </div>
    </li>
  });
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  }

  useEffect(() => {
    setCurrentFilters(props.selectedInbox.additionalFilter);
  }, [props.selectedInbox.additionalFilter]);

  return <div>
    <div className={s.filter}>
      <div className={s.container}>
        <Paper className={classes.root}>
          {(сurrentFilters && сurrentFilters.length > 0) &&
            <Button onClick={clearFilter} color='secondary'>
              Очистить фильтр
              </Button>}
          {(!_.isEqual(сurrentFilters, props.selectedInbox.additionalFilter)) &&
            <Button onClick={startSearch} color='secondary'>
              Применить фильтр
            </Button>}
          {(сurrentFilters && сurrentFilters.length > 0) &&
            <>
              <Paper component='ul' className={classes.root}>
                {сurrentFilters.map((filter) => {
                  return (
                    <li key={filter.name}>
                      <Chip
                        label={filter.name}
                        onDelete={() => handleDelete(filter.name)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })}
              </Paper>
            </>
          }
          <FormControl fullWidth>
            <TextField
              label='Поиск'
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={handleFilterChange}
            />
          </FormControl>
        </Paper>
      </div>
    </div>
    <div className={s.listContainer}>
      <OverlaySpinner active={props.fieldsIsLoading}>
        <ul className={s.list}>
          {searchFields}
        </ul>
      </OverlaySpinner>
    </div>
    <Dialog
      open={fieldSelected}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth={false}
    >
      <DialogTitle id='form-dialog-title' className={s.title}>
        {fieldConfig.caption}
      </DialogTitle>
      <DialogContent>
        <SearchValue setFieldValue={setFieldValue} operatorValue={operatorValue} setOperatorValue={setOperatorValue} fieldConfig={fieldConfig} />
      </DialogContent>
      <DialogActions>
        <Button onClick={addSearch} color='primary'>
          Добавить
      </Button>
        <Button onClick={handleClose} color='primary'>
          Отмена
      </Button>
      </DialogActions>
    </Dialog>
  </div>
}

export default FastSearch
