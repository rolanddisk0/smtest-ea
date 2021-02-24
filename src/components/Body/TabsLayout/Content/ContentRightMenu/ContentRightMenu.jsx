import React, { useState } from 'react';
import s from './ContentRightMenu.module.scss';
import { ReactComponent as RightMenuOpened } from 'assets/contentLogos/RightMenuOpened.svg';
import { ReactComponent as RightMenuClosed } from 'assets/contentLogos/RightMenuClosed.svg';
import { Drawer, Popper, Fade, Paper, makeStyles } from '@material-ui/core';
import DirectionContainer from 'components/Dialogs/Direction/DirectonContainer';
import ServiceContainer from 'components/Dialogs/Service/ServiceContainer';
import CIContainer from 'components/Dialogs/CI/CIContainer';
import GroupAffectedItemContainer from 'components/Dialogs/GroupAffectedItem/GroupAffectedItemContainer';
import RMenuMoreContainer from 'components/Dialogs/RMenuMore/RMenuMoreContainer';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  rootPopper: {
    backgroundColor: 'var(--colorGreen)'
  },
  rootPaper: {
    backgroundColor: 'var(--colorLightGrey)'
  }
});

const ContentRightMenu = (props) => {
  const classes = useStyles();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDirectionDialog, setShowDirectionDialog] = useState(false);
  const [showGroupAffectedItemDialog, setShowGroupAffectedItemDialog] = useState(false);
  const [showCIDialog, setShowCIDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [directionDataIsLoading, setDirectionDataIsLoading] = useState(false);
  const [groupAffectedItemDataIsLoading, setGroupAffectedItemDataIsLoading] = useState(false);
  const [ciDataIsLoading, setCIDataIsLoading] = useState(false);
  const [serviceDataIsLoading, setServiceDataIsLoading] = useState(false);
  const [showMoreDialog, setShowMoreDialog] = useState(false);
  const [moreDataIsLoading, setMoreDataIsLoading] = useState(false);

  const directionClick = (target) => {
    setShowDirectionDialog(true);
    props.getDirection(target.textContent, setDirectionDataIsLoading);
  }
  const groupAffectedItemClick = (target) => {
    setShowGroupAffectedItemDialog(true);
    props.getGroupAffectedItem(target.textContent, setGroupAffectedItemDataIsLoading);
  }
  const ciClick = (target) => {
    setShowCIDialog(true);
    props.getCI(target.textContent, setCIDataIsLoading);
  }

  const serviceClick = (target) => {
    setShowServiceDialog(true);
    props.getService(target.textContent, setServiceDataIsLoading);
  }

  const moreClick = (title) => {
    props.getMoreData(title, setMoreDataIsLoading);
    setShowMoreDialog(true);
  }

  const directions = {
    name: 'Направление',
    data: props.rightSliderMenuData.directionList,
    onClick: (e) => { directionClick(e.target) },
  };
  const groupAffectedItems = {
    name: 'Группа услуг',
    data: props.rightSliderMenuData.groupAffectedItemList,
    onClick: (e) => { groupAffectedItemClick(e.target) },
  };
  const affectedItems = {
    name: 'Услуга',
    data: props.rightSliderMenuData.affectedItemList,
    onClick: (e) => { ciClick(e.target) },
  };
  const services = {
    name: 'Сервис',
    data: props.rightSliderMenuData.serviceList,
    onClick: (e) => { serviceClick(e.target) },
  };
  const lists = [directions, groupAffectedItems, affectedItems, services];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpenMenu(open);

    if (!open) {
      setOpenPopper(false);
    }
  };

  const onClickHandler = (event) => {
    setOpenPopper(false);
  }

  const onMouseOverHandler = (event) => {
    /*const getBoundingClientRect = () => event.currentTarget.getBoundingClientRect();
    
    const referenceObject = {
      clientWidth: getBoundingClientRect().width,
      clientHeight: getBoundingClientRect().height,
      getBoundingClientRect
    };

    setAnchorEl(referenceObject);*/
    setAnchorEl(event.currentTarget);
    setOpenPopper(true);
  }

  const id = openPopper ? 'faked-reference-popper' : undefined;

  const list = (anchor) => (
    <div>
      {lists.map(list => (
        <div className={s.listContainer} key={list.name}>
          <div className={s.listHeader}>{list.name}:</div>
          <ul className={s.list}>
            {list.data.map(text => (
              <li key={text} className={s.listItem} onMouseOver={(event) => { event.persist(); onMouseOverHandler(event) }} onClick={list.onClick}>
                {text}
              </li>
            ))}

            {list.data.length >= 4 && <li key={`more${list.name}`} className={s.listItem} name={list.name} onClick={() => { moreClick(list.name) }}>Ещё..</li>}
            {list.data.length == 0 && <li>Нет доступных для выбора данных</li>}
          </ul>
        </div>
      ))}
    </div>
  );

  const drawer =
    <Drawer anchor='right' variant='persistent'
      open={isOpenMenu} onClose={toggleDrawer(false)} classes={{ paper: classes.rootPaper }}>
      <div className={s.grid}>
        <div className={s.rightMenuOpened} onClick={toggleDrawer(false)}>
          <RightMenuOpened className={s.rightMenuImg} />
        </div>
        <div className={s.body}>
          {!props.contentIsLoading
            ? list()
            : <div className={s.rMenuLoadingSpinnerContainer}><CircularProgress size={40} /></div>}
        </div>
      </div>
    </Drawer>

  return <>
    <DirectionContainer open={showDirectionDialog} handleClose={() => setShowDirectionDialog(false)} dataIsLoading={directionDataIsLoading} />
    <GroupAffectedItemContainer open={showGroupAffectedItemDialog} handleClose={() => setShowGroupAffectedItemDialog(false)} dataIsLoading={groupAffectedItemDataIsLoading} />
    <CIContainer open={showCIDialog} handleClose={() => setShowCIDialog(false)} dataIsLoading={ciDataIsLoading} setCIDataIsLoading={setCIDataIsLoading} />
    <ServiceContainer open={showServiceDialog} handleClose={() => setShowServiceDialog(false)} dataIsLoading={serviceDataIsLoading} />
    <RMenuMoreContainer open={showMoreDialog} handleClose={() => setShowMoreDialog(false)} dataIsLoading={moreDataIsLoading}
      title={props.moreDialogTitle} data={props.moreDialogData} />
    <div>
      <div className={s.rightMenuClosed} onClick={toggleDrawer(true)}>
        <RightMenuClosed className={s.rightMenuImg} />
      </div>
      <Popper id={id} open={openPopper} anchorEl={anchorEl} transition placement={'right'} onClick={onClickHandler}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper classes={{ root: classes.rootPopper }} className={s.popper}>
              Применить
            </Paper>
          </Fade>
        )}
      </Popper>
      {drawer}
    </div>
  </>
}

export default ContentRightMenu;