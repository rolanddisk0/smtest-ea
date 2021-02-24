import React from 'react';
import FlexLayout from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import ContentContainer from './Content/ContentContainer';
import _ from 'underscore';
import DataLoading from 'components/UIElements/DataLoading/DataLoading';
import { useHistory } from 'react-router-dom';

const TabsLayout = (props) => {
    const history = useHistory();

    const factory = (node) => {
        const component = node.getComponent();
        const id = node._attributes.id;

        if (component === 'content') {
            node.setEventListener('close', (p) => {
                //props.updateContentData(null, null, 'delete', id)
                let activeTabset = props.tabs.getActiveTabset();
                if (activeTabset._children.length == 0) {
                    history.push('/index');
                }
                let activeRecordId = activeTabset && activeTabset._children.length > 0 ? activeTabset._children[activeTabset._attributes.selected]._attributes.id : 'empty';
                props.updateActiveRecord({
                    id: activeRecordId,
                    historyId: activeRecordId != 'empty' ? activeTabset._children[activeTabset._attributes.selected]._attributes.config.historyId : null
                });
            });

            if (props.content[id]) {
                return <ContentContainer id={id} />;
            } else {
                return <div></div>; // TODO была заглушка раньше пришлось оставить в таком виде
                //return <ContentContainer id='empty' />;
            }
        }
    }

    const onModelChange = (model) => {
        if (model._attributes.type == 'tab') {
            let parent = model._parent;
            while (parent._parent) {
                parent = parent._parent;
            }

            let activeTabset = parent._model.getActiveTabset();

            if (activeTabset && activeTabset._children.length > 0) {
                let activeRecordId = activeTabset._children[activeTabset._attributes.selected]._attributes.id;
                props.updateActiveRecord({
                    id: activeRecordId,
                    historyId: activeTabset._children[activeTabset._attributes.selected]._attributes.config.historyId
                });
            }
        }
    }
    let activeTabset = props.tabs.getActiveTabset();

    return <>
            {props.contentIsLoading && activeTabset && activeTabset._children.length == 0 ? <DataLoading />
            : <FlexLayout.Layout model={props.tabs} factory={factory} onRenderTab={onModelChange} />}
        </>
}


export default TabsLayout;