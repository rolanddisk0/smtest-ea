import React, { useState } from 'react';
import s from './Contacts.module.scss';
import commonDataStyle from '../Data.module.scss';
import SectionLogo from 'assets/contentLogos/ContactsSectionIcon.svg';
import ContactContainer from 'components/Dialogs/Contact/ContactContainer';
import ContactOrgContainer from 'components/Dialogs/ContactOrg/ContactOrgContainer';
import ContactLocContainer from 'components/Dialogs/ContactLoc/ContactLocContainer';
import SkypeLogo from 'assets/icons/SkypeIcon.svg';
import WhatsAppLogo from 'assets/icons/WhatsAppIcon.svg';
import TelegrammLogo from 'assets/icons/TelegramIcon.svg';
import OrganizationLogo from 'assets/icons/OrganizationIcon.svg';
import LocationLogo from 'assets/icons/LocationIcon.svg';
import VIPIcon from 'assets/icons/VIPIcon.svg';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectControl } from 'components/Forms/FormControls/AsyncSelectControl/AsyncSelectControl';

const Contact_EditMode = reduxForm({ form: 'fullContentForm' })((props) => {
    const getAsyncParams = (listName, inputField) => ({ getDataPromise: props.getEditModeList, listName: listName, inputField: inputField });
    const asyncParams = getAsyncParams(props.listName, props.fieldReduxName);

    //cachEnabled={false} 
    return <Field component={AsyncSelectControl} name={props.fieldReduxName} placeholder={props.fieldName} asyncParams={asyncParams} isDisabled={props.isDisabled} />;
});

const Contact_ReadOnlyMode = (props) => {
    return <div className={s.noOverflowTextContainer}>
        <LinkButton noWrap={true} text={props.value} onClick={props.onClick} />
    </div>
}

const ContactItem = (props) => {
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [showContactOrgDialog, setShowContactOrgDialog] = useState(false);
    const [showContactLocDialog, setShowContactLocDialog] = useState(false);
    const [contactDataIsLoading, setContactDataIsLoading] = useState(false);

    const contactClick = (target) => {
        setShowContactDialog(true);
        props.getContact(target.textContent, setContactDataIsLoading);
    }

    const contactOrgClick = () => {
        setShowContactOrgDialog(true);
        props.getContact(props.data.name.value, setContactDataIsLoading);
    }

    const contactLocClick = () => {
        setShowContactLocDialog(true);
        props.getContact(props.data.name.value, setContactDataIsLoading);
    }


    const getVIP = (value) => value ? <img src={VIPIcon} className={s.vipIcon} alt='VIPIcon' /> : null;
    const getSkype = (value) => value ? <a href={`skype:${value}?userinfo`}><img src={SkypeLogo} className={s.miniIcon} alt='SkypeLogo' /></a> : null;
    const getWhatsApp = (value) => value ? <a href={`https://api.whatsapp.com/send?phone=${value}`} target='_blank'>
        <img src={WhatsAppLogo} className={s.miniIcon} alt='WhatsAppLogo' />
    </a> : null;
    const getTelegramm = (value) => value ? <a href={`https://telegram.me/${value}`} target='_blank'>
        <img src={TelegrammLogo} className={s.miniIcon} alt='TelegrammLogo' />
    </a> : null;
    const getOrganization = (value) => value
        ? <><img src={OrganizationLogo} className={s.bigIcon} alt='OrganizationLogo' />
            <LinkButton text='Организация' onClick={(e) => { contactOrgClick() }} /></>
        : null;
    const getLocation = (value) => value
        ? <><img src={LocationLogo} className={s.bigIcon} alt='LocationLogo' />
            <LinkButton text='Адрес' onClick={(e) => { contactLocClick() }} /></>
        : null;

    return <>
        <ContactContainer open={showContactDialog} handleClose={() => setShowContactDialog(false)} dataIsLoading={contactDataIsLoading} />
        <ContactOrgContainer open={showContactOrgDialog} handleClose={() => setShowContactOrgDialog(false)} dataIsLoading={contactDataIsLoading} />
        <ContactLocContainer open={showContactLocDialog} handleClose={() => setShowContactLocDialog(false)} dataIsLoading={contactDataIsLoading} />

        <div className={s.fieldNameCell}>{props.contactType}</div>

        {props.isEditModeEnabled
            ? <Contact_EditMode fieldReduxName={props.fieldReduxName} fieldName={props.contactType} getEditModeList={props.getEditModeList} listName={props.listName} 
                isDisabled={props.data.name.readOnly} />
            : <Contact_ReadOnlyMode value={props.data.name.value} onClick={(e) => { contactClick(e.target) }} />}

        <div className={s.vipIconCell}>{getVIP(props.data.vip)}</div>
        <div className={s.cntIconsCell}>
            {getSkype(props.data.skype)}
            {getWhatsApp(props.data.whatsApp)}
            {getTelegramm(props.data.telegramm)}
            {getOrganization(props.data.organization)}
            {getLocation(props.data.location)}
        </div>
    </>
}

const Contacts = (props) => {
    return <>
        <div className={`${s.content} ${commonDataStyle.sectionBlock}`}>
            <div className={commonDataStyle.sectionIconCell}>
                <img src={SectionLogo} className={commonDataStyle.sectionIcon} alt='SectionLogo' />
            </div>

            <div className={s.grid}>
                <ContactItem contactType='Инициатор' fieldReduxName='contactName' data={props.data.contactName} getContact={props.getContact}
                    isEditModeEnabled={props.isEditModeEnabled} getEditModeList={props.getEditModeList} listName='contactNameList' />
                <ContactItem contactType='Контактное лицо' fieldReduxName='callbackContact' data={props.data.callbackContact} getContact={props.getContact}
                    isEditModeEnabled={props.isEditModeEnabled} getEditModeList={props.getEditModeList} listName='callbackContactList' />
            </div>
        </div>
    </>;
}

export default Contacts;