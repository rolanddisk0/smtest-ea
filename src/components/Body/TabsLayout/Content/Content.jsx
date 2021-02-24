import React from 'react';
import s from './Content.module.scss';
import ContentHeaderContainer from './ContentHeader/ContentHeaderContainer';
import ContentBody from './ContentBody/ContentBody';
import ContentFooter from './ContentFooter/ContentFooter';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';
import { reduxForm, FormSection } from 'redux-form';
import { isObject, arrayEquals } from 'utils/custom';

const ContentElement = (props) => {
    return <>
        <div className={s.header}>
            <ContentHeaderContainer id={props.id} />
        </div>
        <ContentBody id={props.id} />
        <ContentFooter />
    </>;
}

const ContentReadOnlyMode = (props) => {
    return <ContentElement id={props.id} />
};

const ContentEditMode = reduxForm({ form: 'fullContentForm' })((props) => {
    return <form onSubmit={props.handleSubmit}>
        <FormSection name='contentFormElement'>
            <ContentElement id={props.id} />
        </FormSection>
    </form>;
})

const Content = (props) => {
    const handleEditModeSubmit = (values) => {
        const getDiffValues = (newObj, initObj) => {
            let retObj = {};
            for (var key in newObj) {
                if (newObj[key] && Array.isArray(newObj[key])) {
                    //Для мультиселекта
                    if (!arrayEquals(newObj[key], initObj[key])) {
                        retObj[key] = JSON.stringify(newObj[key].map(item => isObject(item) && item.label && item.value ? item.value : item));
                    }
                } else {
                    //Для скалярных значений
                    if (newObj[key] !== initObj[key]) {
                        retObj[key] = isObject(newObj[key]) && newObj[key].label && newObj[key].value ? newObj[key].value : newObj[key];
                    }
                }
            }
            return retObj;
        }

        const diffValues = getDiffValues(values, props.formInitialValues);
        props.updateContent(diffValues);
    }

    return <OverlaySpinner active={props.contentIsLoading}>
        <div className={s.content}>
            <div className={s.grid}>
                {props.isEditModeEnabled ? <ContentEditMode onSubmit={handleEditModeSubmit} initialValues={props.formInitialValues} id={props.id} /> : <ContentReadOnlyMode id={props.id} />}
            </div>
        </div>
    </OverlaySpinner>
}

export default Content;