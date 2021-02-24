import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CheckMark from 'assets/icons/OkIcon.svg';
import Title from './CommonSections/Title/Title';
import CommonInfo from './CommonSections/CommonInfo/CommonInfo';
import Assignment from './CommonSections/Assignment/Assignment';
import AdditionalInfo from './CommonSections/AdditionalInfo/AdditionalInfo';
import LinksCI from './CommonSections/LinksCI/LinksCI';
import LinksSchemaContainer from './CommonSections/LinksSchema/LinksSchemaContainer';
import Attachments from './CommonSections/Attachments/Attachments';
import History from './CommonSections/History/History';
import LinkRecords from './CommonSections/LinkRecords/LinkRecords';
import AffectedItemInfo from './ProprietarySections/AffectedItemInfo/AffectedItemInfo';
import InfSysInfo from './ProprietarySections/InfSysInfo/InfSysInfo';
import Cluster from './ProprietarySections/Cluster/Cluster';
import TechSystems from './ProprietarySections/TechSystems/TechSystems';
import s from './CI.module.scss';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';

const AffectedItem = (props) => {
    const handleClose = () => props.handleClose();

    return <Dialog disableBackdropClick open={props.open} fullWidth={true} maxWidth='lg'>
        <DialogContent className={s.mainGrid}>
            <OverlaySpinner active={props.dataIsLoading}>
                <Title category={props.data.commonData.category} />
                <CommonInfo data={props.data.commonData} getDirection={props.getDirection} getGroupAffectedItem={props.getGroupAffectedItem}
                    showAlert={props.showAlert} />
                <LinksSchemaContainer data={props.data} setCIDataIsLoading={props.setCIDataIsLoading} />
                <Assignment data={props.data.assignmentData} />
                {props.data.commonData.category === 'Услуга' && <AffectedItemInfo data={props.data} />}
                {props.data.commonData.category === 'ИС' && <InfSysInfo data={props.data} />}
                {props.data.commonData.category === 'Серверы' && <Cluster data={props.data} />}
                {props.data.commonData.category === 'Серверы' && <TechSystems data={props.data} />}
                <AdditionalInfo data={props.data} />
                <LinksCI data={props.data.links} getCI={props.getCI} />
                <Attachments data={props.data} />
                <History data={props.data} />
                <LinkRecords data={props.data} />
            </OverlaySpinner>
        </DialogContent>

        <div className={s.actions}>
            <div onClick={handleClose} className={s.homeIconContainer}><img src={CheckMark} alt='CheckMark' /></div>
        </div>
    </Dialog>
}

export default AffectedItem;