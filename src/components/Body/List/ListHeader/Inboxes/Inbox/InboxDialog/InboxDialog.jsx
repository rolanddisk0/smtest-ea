import React, { useState } from 'react'
import s from './InboxDialog.module.scss';
import { Button, Checkbox } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField } from '@material-ui/core';
import { ReactComponent as ListIcon } from 'assets/icons/ListIcon.svg';
import QueryBuilderContainer from '../../../../../../UIElements/QueryBuilder/QueryBuilderContainer';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';
import { isEmpty } from 'utils/custom';
import FieldListContainer from '../../../../../../UIElements/FieldList/FieldListContainer';
import ColoringContainer from '../../../../../../UIElements/Coloring/ColoringContainer';
import { useForm } from 'react-hook-form';
import { Utils as QbUtils } from 'react-awesome-query-builder';
import { getConfig } from 'utils/queryBuilder';
import { viewNameMapping } from 'utils/custom';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';

const InboxDialog = props => {
  const [tabValue, setTabValue] = useState(0);
  const { register, handleSubmit, errors, setError } = useForm();
  const handleClose = () => {
    props.updateQueryBuilder({
      queryTree: { "id": QbUtils.uuid(), "type": "group" },
      queryColumns: []
    });
    props.updateInbox({
      id: null,
      name: '',
      //isCurrent: false,
      isDefault: false,
      isActive: true
    });
    props.setColoring([{
      queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
      color: null
    }]);
    props.updateShowInboxDialog(false);
  }
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeCheckBox = (event) => {
    props.updateInbox({
      [event.target.name]: event.target.checked
    })
  }

  const onSubmit = (data) => {
    if (isEmpty(props.queryBuilder.queryColumns)) {
      setError('columns', 'empty');
      return;
    }

    if (isEmpty(props.queryBuilder.queryTree)) {
      data.sqlFormat = 'true';
    } else {
      const config = getConfig(props.fields);
      const ImmutableTree = QbUtils.checkTree(QbUtils.loadTree(props.queryBuilder.queryTree), config);
      data.sqlFormat = QbUtils.sqlFormat(ImmutableTree, config);

      if (isEmpty(data.sqlFormat)) {
        data.sqlFormat = '1=1';
      }
    }

    data.queryTree = props.queryBuilder.queryTree;
    data.selectedTodo = props.selectedTodo;
    data.queryColumns = props.queryBuilder.queryColumns;
    data._id = props.inbox.id;
    data.coloring = props.coloring;
    data.isActive = props.inbox.isActive;
    data.isDefault = props.inbox.isDefault;
    //data.isCurrent = props.inbox.isCurrent;

    props.saveInbox(data, props.showAlert, props.updateQueryBuilder, props.user, props.setColoring, props.selectedInbox, props.selectedTodo);
  }

  return (
    <Dialog
      open={props.showInboxDialog}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      maxWidth={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id='form-dialog-title' className={s.title}>
          <ListIcon className={s.listIcon} />
            Настройка представления
            <div className={s.error}>
            {errors.columns && errors.columns.type === 'empty' && <p>Выберите столбцы</p>}
            {errors.filter && errors.filter.type === 'empty' && <p>Заполните фильтр</p>}
          </div>
        </DialogTitle>
        <DialogContent>
          <OverlaySpinner active={props.fieldsIsLoading}>
            <div className={s.content}>
              <div className={s.contentGrid}>
                <div className={s.field}>
                  Наименование:
              </div>
                <div>
                  <TextField defaultValue={props.inbox.name} name='inboxName' placeholder='Наименование' variant='outlined' fullWidth required size='small' inputRef={register({})} />
                  {/*JSON.stringify(props.queryBuilder.queryColumns)*/}
                </div>
                <div className={s.field}>
                </div>
                <div>
                  <div className={s.fieldInline}>Обьект:</div> {viewNameMapping[props.selectedTodo]}
                  <div className={s.fieldInline}>Тип:</div> Пользовательское
              </div>
                <div>
                </div>
                <div>
                  {/* <Checkbox
                  checked={props.inbox.isCurrent}
                  name='isCurrent'
                  onChange={handleChangeCheckBox}
                />
                Текущее */}
                  <Checkbox
                    checked={props.inbox.isDefault}
                    name='isDefault'
                    onChange={handleChangeCheckBox}
                  />
                По умолчанию
                <Checkbox
                    checked={props.inbox.isActive}
                    name='isActive'
                    onChange={handleChangeCheckBox}
                    disabled
                  />
                Активно
              </div>
              </div>
              <div className={s.contentGrid}>
                <div className={s.tabs}>
                  <Tabs
                    orientation='vertical'
                    variant='scrollable'
                    aria-label='Vertical tabs inbox'
                    value={tabValue}
                    onChange={handleChange}
                  >
                    <Tab label='Колонки' {...TabProps(0)} />
                    <Tab label='Фильтры' {...TabProps(1)} />
                    <Tab label='Подсветка' {...TabProps(2)} />
                  </Tabs>
                </div>
                <div className={s.panels}>
                  <TabPanel value={tabValue} index={0} className={s.fieldsPanel}>
                    <FieldListContainer />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <QueryBuilderContainer />
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    <ColoringContainer />
                  </TabPanel>
                </div>
              </div>
            </div>
          </OverlaySpinner>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color='primary'>
            Сохранить
          </Button>
          <Button onClick={handleClose} color='primary'>
            Отмена
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default InboxDialog
