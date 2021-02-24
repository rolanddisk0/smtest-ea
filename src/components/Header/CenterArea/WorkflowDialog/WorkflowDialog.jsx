import React, { useState } from 'react';
import s from './WorkflowDialog.module.scss';
import commonHeaderStyle from '../../Header.module.scss';
import HomeIcon from 'assets/icons/HomeIcon.svg';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Stage, Layer, Rect, Text } from 'react-konva';
import shortid from 'shortid';
import Chip from '@material-ui/core/Chip';
import ForwardIcon from '@material-ui/icons/Forward';

const WorkflowDialog = (props) => {
    const handleClose = () => props.handleClose();

    const getElements = wfInfo => {
        const getBgColor = (phase) => {
            const currentPhase = props.getCurrentPhase();
            if (phase === currentPhase) { return 'MediumSpringGreen'; }
            if (props.historyPhasesNames.includes(phase)) { return '#bfbfbf'; }
            return 'mintcream';
        }
        let rectElements = [], linkElements = [];
        const borderWidth = 2;

        for (const key in wfInfo) {
            const defaultLine = props.getLinks(key, wfInfo[key].defaultTransition, borderWidth) || [];
            const autoLines = props.getLinks(key, wfInfo[key].autoTransition, borderWidth) || [];
            const manualLines = props.getLinks(key, wfInfo[key].manualTransition, borderWidth) || [];
            linkElements = [...linkElements, ...defaultLine, ...autoLines, ...manualLines];
            const rectBgColor = getBgColor(key);

            rectElements.push(
                <React.Fragment key={key}>
                    <Rect x={wfInfo[key].xCoord} y={wfInfo[key].yCoord} width={wfInfo[key].width} height={wfInfo[key].heigth}
                        stroke='lightblue' strokeWidth={borderWidth} fill={rectBgColor} cornerRadius={10} />
                    <Text text={wfInfo[key].title} x={wfInfo[key].xCoord} y={wfInfo[key].yCoord} width={wfInfo[key].width} height={wfInfo[key].heigth}
                        align='center' verticalAlign='middle' fontSize={12} />
                </React.Fragment>
            );
        }

        return <>
            {linkElements}
            {rectElements}
        </>;
    };
    const wfElements = getElements(props.wfInfo);

    const historyElements = props.wfHistory.map(item => {
        const fromElement = <div className={s.historyChipContainer}>
            <Chip label={props.wfInfo[item.from] && props.wfInfo[item.from].title ? props.wfInfo[item.from].title : item.from} color='primary' clickable
                style={{ width: '100%' }} />
        </div>;
        const toElement = <div className={s.historyChipContainer}>
            <Chip label={props.wfInfo[item.to] && props.wfInfo[item.to].title ? props.wfInfo[item.to].title : item.to} color='primary' clickable
                style={{ width: '100%' }} />
        </div>;
        const arrowElement = <div className={s.arrowIcon}><ForwardIcon /></div>;

        return <React.Fragment key={shortid.generate()}>
            {fromElement}
            {arrowElement}
            {toElement}
        </React.Fragment>
    });

    return <Dialog open={props.open} fullWidth={true} maxWidth='lg'>
        <DialogTitle className={s.title}>Схема рабочего процесса</DialogTitle>
        <DialogContent>
            <OverlaySpinner active={props.workflowMetaIsLoading}>
                <div className={s.grid}>
                    <div>
                        <Stage width={1250} height={1000}>
                            <Layer>
                                {wfElements}
                            </Layer>
                        </Stage>
                    </div>

                    {historyElements && historyElements.length > 0
                        ? <div className={props.getHistoryPosition() === 'center' ? s.historyContainer : null}>
                            <div className={s.historyTitle}>История:</div>
                            <div className={s.historyMainGrid}>{historyElements}</div>
                        </div>
                        : null}
                </div>
            </OverlaySpinner>
        </DialogContent>

        <div className={s.actions}>
            <div onClick={handleClose} className={commonHeaderStyle.homeIconContainer}><img src={HomeIcon} alt='HomeIcon' /></div>
        </div>
    </Dialog>;
}

export default WorkflowDialog;