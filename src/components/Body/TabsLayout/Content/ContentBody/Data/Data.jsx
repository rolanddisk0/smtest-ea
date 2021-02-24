import React from 'react';
import s from './Data.module.scss';
import ContactsContainer from './Contacts/ContactsContainer';
import Links from './Links/Links';
import AssignmentContainer from './Assignment/AssignmentContainer';
import ResolutionContainer from './Resolution/ResolutionContainer';
import DescriptionContainer from './Description/DescriptionContainer';
import ClassificationContainer from './Classification/ClassificationContainer';
import ContentDivider from 'components/UIElements/ContentDivider/ContentDivider';

const Data = (props) => {
    return (
        <div className={s.content}>
            <ContactsContainer id={props.id}/>
            <ContentDivider />

            <ClassificationContainer id={props.id}/>
            <ContentDivider />

            <Links id={props.id}/>
            <ContentDivider />

            <AssignmentContainer id={props.id}/>
            <ContentDivider />

            <ResolutionContainer id={props.id}/>
            <ContentDivider />

            <DescriptionContainer id={props.id}/>
        </div>
    );
}

export default Data;