import React from 'react';
import s from './Links.module.scss';
import commonDataStyle from '../Data.module.scss';
import SectionLogo from 'assets/contentLogos/LinkSectionIcon.svg';
import CMDBPanelContainer from './CMDBPanel/CMDBPanelContainer';
import LinksPanelContainer from './LinksPanel/LinksPanelContainer';
import SLAPanelContainer from './SLAPanel/SLAPanelContainer';

const Links = (props) => {
    return <>
            <div className={`${s.content} ${commonDataStyle.sectionBlock}`}>
                <div className={commonDataStyle.sectionIconCell}>
                    <img src={SectionLogo} className={commonDataStyle.sectionIcon} alt='SectionLogo' />
                </div>
                <div>
                    <LinksPanelContainer id={props.id}/>
                    <CMDBPanelContainer id={props.id}/>
                    <SLAPanelContainer id={props.id}/>
                </div>
            </div>
        </>;
}

export default Links;