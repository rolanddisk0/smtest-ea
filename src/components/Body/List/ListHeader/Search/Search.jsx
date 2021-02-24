import React, { useState } from 'react'
import s from './Search.module.scss';
import { Dialog, DialogContent, makeStyles, DialogActions, Button, DialogTitle } from '@material-ui/core';
import FastSearch from './FastSearch/FastSearch';
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import commonHeaderStyle from '../ListHeader.module.scss';

const useStyles = makeStyles({
  scrollPaper: {
    alignItems: 'start'
  },
  content: {
      padding: '0px 24px 24px 24px'
  }
});

const Search = props => {
  const classes = useStyles();
  const [searchTab, setSearchTab] = useState(0);
  const handleChange = (event, newValue) => setSearchTab(newValue);
  const fastAlertMarker = props.selectedInbox.additionalFilter && props.selectedInbox.additionalFilter.length > 0 ? <div className={commonHeaderStyle.alertMarkerEnd}></div> : null;
  const fastLabel = <div className={commonHeaderStyle.alertable}>
    <span className={commonHeaderStyle.alertableContent}>Быстрый поиск</span>
  {fastAlertMarker}
</div>
  const advAlertMarker = props.selectedInbox.advancedFilter.sql ? <div className={commonHeaderStyle.alertMarkerEnd}></div> : null;
  const advLabel = <div className={commonHeaderStyle.alertable}>
    <span className={commonHeaderStyle.alertableContent}>Расширенный поиск</span>
  {advAlertMarker}
</div>
  //props.newAlertMarker ? <div className={commonHeaderStyle.alertMarker}></div>
//label='Расширенный поиск' className={commonHeaderStyle.alertable} label='Быстрый поиск'
  return <Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby='form-dialog-title'
    classes={{ scrollPaper: classes.scrollPaper }}
    maxWidth={false}
    PaperProps={{
      className: s.dialog
    }}
  >
    <DialogTitle id='form-dialog-title' className={s.title}>
      <AppBar position='static'>
        <Tabs value={searchTab} onChange={handleChange} indicatorColor='primary' variant='fullWidth' >
          <Tab  {...TabProps(0)} icon={fastLabel}/>
          <Tab  {...TabProps(1)} icon={advLabel}/>
        </Tabs>
      </AppBar>
    </DialogTitle>
    <DialogContent classes={{ root: classes.content}}>
      <TabPanel value={searchTab} index={0} box={{ padding: 0 }}>
        <FastSearch fields={props.fields} selectedInbox={props.selectedInbox} updateSelectedInbox={props.updateSelectedInbox} handleClose={props.handleClose}
          fieldsIsLoading={props.fieldsIsLoading} />
      </TabPanel>
      <TabPanel value={searchTab} index={1} box={{ padding: 0 }}>
        <AdvancedSearch fields={props.fields} handleClose={props.handleClose} filter={props.selectedInbox.advancedFilter} updateFilter={props.updateSelectedInbox}/>
      </TabPanel>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color='primary'>
        Отмена
      </Button>
    </DialogActions>
  </Dialog>
}

export default Search
