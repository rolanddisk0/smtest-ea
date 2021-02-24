import React, { useState } from 'react';
import s from './LinksPanel.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkItemsContainer from './LinkItems/LinkItemsContainer';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/UIElements/Tabs/TabPanel';
import TabProps from 'components/UIElements/Tabs/TabProps';

const LinksPanel = (props) => {
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);
    const [linksTab, setLinksTab] = useState(0);

    const getDataProps = {
        getContact: props.getContact,
        showAlert: props.showAlert,
        setShowContactDialog,
        setContactDataIsLoading,
        getContent: props.getContent,
    }

    const handleChange = (event, newValue) => setLinksTab(newValue);

    return <>
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />

        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <span className={s.header}>Запросы</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={s.linksContainer}>
                    <AppBar position='static'>
                        <Tabs value={linksTab} onChange={handleChange} indicatorColor='primary' variant='fullWidth' >
                            <Tab label={`Все связи (${props.allData.length})`} {...TabProps(0)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={linksTab} index={0}>
                        <LinkItemsContainer data={props.allData} getDataProps={getDataProps} />
                    </TabPanel>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </>
}

export default LinksPanel;