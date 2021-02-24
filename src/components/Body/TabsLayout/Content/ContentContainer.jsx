import React, { useEffect } from 'react';
import Content from './Content';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getContent, updateContent } from 'redux/mainPageContentReducer';
import { withAlert } from 'hoc/withAlert';

const ContentContainer = (props) => {
    /*useEffect(() => {
        if (props.match.params.contentId && props.match.params.contentId !== props.number) {
            refreshContent();
        }
    }, [props.match.params.contentId]);

    const refreshContent = () => {
        let contentId = props.match.params.contentId;
        if (contentId) { props.getContent(contentId, props.showAlert); }
    }*/

    const setFormInitialValues = () => {
        if (!props.isEditModeEnabled) { return {}; }

        const simpleValToReactSelectVal = (value, isMultiselect) => {
            if (!isMultiselect) { return { value, label: value && value.length > 0 ? value[0].toUpperCase() + value.slice(1) : value }; }
            
            //Для мультиселекта
            return value && Array.isArray(value) 
                ? value.map(item => ({ value: item, label: item && item.length > 0 ? item[0].toUpperCase() + item.slice(1) : item }))
                : [];
        };
        
        const getValues = (object) => {
            const retObj = {};
            for (const key in object) {
                retObj[key] = object[key].label ? object[key].label : object[key].value; 
            }
            return retObj;
        }

        const initValues = {
            ...getValues(props.assignmentData),
            ...getValues(props.resolutionData),
            ...getValues(props.feedbackData),
            ...getValues(props.descriptionData),
            ...getValues(props.classificationData),
            ...getValues(props.headerItems),
            ...getValues(props.cmdbPanelData),
            contactName: props.contactName,
            callbackContact: props.callbackContact,
        };

        //Для значений по умолчанию для react-select
        const rebuildDefualtValuesFor = ['resolutionCode', 'category', 'kc', 'kcDisp', 'ck', 'ckInj', 'direction', 'groupAffectedItem', 'affectedItem', 'service',
            'contactName', 'callbackContact', 'priority', 'logicalName'];
        //Для значений по умолчанию для multiselect react-select
        const rebuildDefualtMultiValuesFor = ['assets'];
        const rebuildDefualtValues = (fieldsArr, isMultiselect) => {
            if (!isMultiselect) {
                fieldsArr.forEach(field => initValues[field] = simpleValToReactSelectVal(initValues[field]));
            } else {
                fieldsArr.forEach(field => initValues[field] = simpleValToReactSelectVal(initValues[field], isMultiselect));
            }
        }
        rebuildDefualtValues(rebuildDefualtValuesFor);
        rebuildDefualtValues(rebuildDefualtMultiValuesFor, true);
        return initValues;
    }

    const updateContent = (newFormValues) => {
        props.updateContent(props.number, props.showAlert, newFormValues);
    }

    return <Content contentIsLoading={props.contentIsLoading} isEditModeEnabled={props.isEditModeEnabled} updateContent={updateContent} id={props.id}
        formInitialValues={setFormInitialValues()} />;
}

let mapStateToProps = (state, props) => {
    return ({
        contentIsLoading: state.mainPageContent.contentIsLoading,
        number: state.mainPageContent.content[props.id].headerItems.number.value,
        isEditModeEnabled: state.mainPageContent.content[props.id].isEditModeEnabled,
        assignmentData: state.mainPageContent.content[props.id].assignmentData,
        resolutionData: state.mainPageContent.content[props.id].resolutionData,
        feedbackData: state.mainPageContent.content[props.id].feedbackData,
        descriptionData: state.mainPageContent.content[props.id].descriptionData,
        classificationData: state.mainPageContent.content[props.id].classificationData,
        headerItems: state.mainPageContent.content[props.id].headerItems,
        contactName: state.mainPageContent.content[props.id].contactsData.contactName.name.value,
        callbackContact: state.mainPageContent.content[props.id].contactsData.callbackContact.name.value,
        cmdbPanelData: state.mainPageContent.content[props.id].cmdbPanelData,
        tabs: state.mainPageContent.tabs,
        content: state.mainPageContent.content
    })
}

export default compose(
    connect(mapStateToProps, { getContent, updateContent }),
    withRouter,
    withAlert
)(ContentContainer);
