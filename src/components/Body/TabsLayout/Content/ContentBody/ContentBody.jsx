import React from 'react';
import s from './ContentBody.module.scss';
import Data from './Data/Data';
import ControlPanelContainer from './ControlPanel/ControlPanelContainer';

const ContentBody = (props) => {
    return <div className={s.content}>
            <div className={s.grid}>
                <Data id={props.id}/>
                <ControlPanelContainer id={props.id}/>
            </div>
        </div>;
}

export default ContentBody;