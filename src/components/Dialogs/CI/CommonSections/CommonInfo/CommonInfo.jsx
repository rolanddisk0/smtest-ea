import React, { useState } from 'react';
import s from './CommonInfo.module.scss';
import commonDataStyle from '../../CI.module.scss';
import shortid from 'shortid';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { getCaption } from 'utils/captions';
import DirectionContainer from 'components/Dialogs/Direction/DirectonContainer';
import GroupAffectedItemContainer from 'components/Dialogs/GroupAffectedItem/GroupAffectedItemContainer';

const CommonInfo = (props) => {
    const [showDirectionDialog, setShowDirectionDialog] = useState(false);
    const [showGroupAffectedItemDialog, setShowGroupAffectedItemDialog] = useState(false);
    const [directionDataIsLoading, setDirectionDataIsLoading] = useState(false);
    const [groupAffectedItemDataIsLoading, setGroupAffectedItemDataIsLoading] = useState(false);

    const directionClick = (target) => {
        setShowDirectionDialog(true);
        props.getDirection(target.textContent, setDirectionDataIsLoading);
    }

    const groupAffectedItemClick = (target) => {
        setShowGroupAffectedItemDialog(true);
        props.getGroupAffectedItem(target.textContent, setGroupAffectedItemDataIsLoading);
    }

    const getValueElement = (key, value) => {
        switch (key) {
            case 'direction':
                return <LinkButton text={value} onClick={(e) => { directionClick(e.target) }} />;
            case 'groupAffectedItem':
                return <LinkButton text={value} onClick={(e) => { groupAffectedItemClick(e.target) }} />;
            default:
                return value;
        }
    }

    let dataElements = [];
    for (let key in props.data) {
        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.field}>{getCaption(key, 'device')}:</div>
                <div className={s.value}>{getValueElement(key, props.data[key])}</div>
            </React.Fragment>
        ];
    }

    return <>
        <DirectionContainer open={showDirectionDialog} handleClose={() => setShowDirectionDialog(false)} dataIsLoading={directionDataIsLoading} />
        <GroupAffectedItemContainer open={showGroupAffectedItemDialog} handleClose={() => setShowGroupAffectedItemDialog(false)} dataIsLoading={groupAffectedItemDataIsLoading} />
        <div className={`${commonDataStyle.grid}`}>
            {dataElements}
        </div>
    </>;
}

export default CommonInfo;