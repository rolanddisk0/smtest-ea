import TabsLayout from './TabsLayout';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAlert } from 'hoc/withAlert';
import { updateTabs, updateActiveRecord, getContent } from 'redux/mainPageContentReducer';
import { withRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import usePrevious from 'hooks/usePrevious';

const TabsLayoutContainer = (props) => {
    const prevTabs = usePrevious(props.tabs);
    const refreshContent = () => {
        props.updateTabs(null, 'sync');
        let contentId = props.match.params.contentId;
        if (contentId) { props.getContent(contentId, props.showAlert); }
    }

    useEffect(() => {
        if (props.match.params.contentId) {
            //const current = props.content[props.match.params.contentId];

            //if (!current) {
                refreshContent();
            //}
        }
    }, [props.match.params.contentId]);

    return <TabsLayout content={props.content} tabs={props.tabs} updateActiveRecord={props.updateActiveRecord} contentIsLoading={props.contentIsLoading}/>;
}

let mapStateToProps = (state) => {
    return {
        tabs: state.mainPageContent.tabs,
        content: state.mainPageContent.content,
        contentIsLoading: state.mainPageContent.contentIsLoading
    }
}

export default compose(connect(mapStateToProps, { updateTabs, updateActiveRecord, getContent }), withRouter, withAlert)(TabsLayoutContainer);