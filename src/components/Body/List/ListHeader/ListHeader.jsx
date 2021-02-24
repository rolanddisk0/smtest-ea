import React, { useState } from 'react';
import s from './ListHeader.module.scss';
import { MenuItem, Select, IconButton } from '@material-ui/core';
import InboxesContainer from './Inboxes/InboxesContainer';
import SearchContainer from './Search/SearchContainer';
import { ReactComponent as RefreshLogo } from 'assets/listHeader/RefreshIcon.svg';
import { ReactComponent as SearchLogo } from 'assets/listHeader/SearchIcon.svg';
import MoreMenuContainer from './MoreMenu/MoreMenuContainer';

const ListHeader = (props) => {
    const [showSearchDialog, setShowSearchDialog] = useState(false);
    const handleChange = (event) => {
        props.updateSelectedTodo(event.target.value);
    }
    const openSearchDialog = () => setShowSearchDialog(true);
    const refreshInbox = () => {
        //props.getInboxData(props.selectedInbox, props.user, props.showAlert, null, null, null, null, true);
        props.getInboxData(props.selectedInbox, props.user, props.selectedTodo, props.showAlert, null, null, null, null, true);
    }
    const alertMarker = props.selectedInbox.needRefresh ? <div className={s.alertMarkerStart}></div> : null;

    return (
        <>
        <SearchContainer open={showSearchDialog} handleClose={() => setShowSearchDialog(false)} />
        <div className={s.content}>
            <div className={s.inboxItem}>
                <Select
                    id='inbox-select'
                    value={props.selectedTodo}
                    onChange={handleChange}
                    className={s.select}
                >
                    <MenuItem value='dit_p_sd_all'>Обращения</MenuItem>
                    <MenuItem value='dit_p_im_all'>Инциденты</MenuItem>
                    <MenuItem value='dit_p_cm3_all'>Изменения</MenuItem>
                </Select>
            </div>
            <div>
                <InboxesContainer/>
            </div>
            <div className={s.alertable}>
                <IconButton aria-label='main-page' size='small' onClick={refreshInbox} className={s.iconButton}>
                    <RefreshLogo className={s.icon} />Обновить
                </IconButton>
                {alertMarker}
            </div>
            <div>
                <IconButton aria-label='search' size='small' onClick={openSearchDialog} className={s.iconButton}>
                    <SearchLogo className={s.icon} />
                </IconButton>
            </div>
            <div>
                <MoreMenuContainer />
            </div>
        </div>
        </>
    );
}

export default ListHeader;