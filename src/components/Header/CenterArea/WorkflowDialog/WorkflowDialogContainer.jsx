import WorkflowDialog from './WorkflowDialog';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialogWrapper } from 'hoc/withDialogWrapper';
import React from 'react';
import {  Arrow } from 'react-konva';
import shortid from 'shortid';

const WorkflowDialogContainer = (props) => {
    const getCurrentPhase = () => props.wfHistory && props.wfHistory[props.wfHistory.length - 1] ? props.wfHistory[props.wfHistory.length - 1].to : '';
    const getHistoryPhasesNames = () => props.wfHistory ?  props.wfHistory.map(phase => phase.from) : [];
    
    const getLinks = (sourcePhase, targetPhases, borderWidth) => {
        if (!targetPhases) { return null; }
        //Если фаза одна, в массив ее добавим. Дальше идет обработка массива
        const targetArr = !Array.isArray(targetPhases) ? [targetPhases] : targetPhases;
        const source = props.wfInfo[sourcePhase];

        return targetArr.map(targetPhase => {
            const getStartEndCoords = (source, target) => {
                if (target.xCoord < source.xCoord) {
                    return {
                        start: {
                            x: source.xCoord - borderWidth,
                            y: source.yCoord + source.heigth / 2
                        },
                        end: {
                            x: target.xCoord + target.width + borderWidth,
                            y: target.yCoord + target.heigth / 2
                        }
                    };
                } else if (target.xCoord > source.xCoord) {
                    return {
                        start: {
                            x: source.xCoord + source.width + borderWidth,
                            y: source.yCoord + source.heigth / 2
                        },
                        end: {
                            x: target.xCoord - borderWidth,
                            y: target.yCoord + target.heigth / 2
                        }
                    };
                } else if (target.yCoord > source.yCoord) {
                    return {
                        start: {
                            x: source.xCoord + source.width / 2,
                            y: source.yCoord + source.heigth + borderWidth
                        },
                        end: {
                            x: target.xCoord + target.width / 2,
                            y: target.yCoord - borderWidth
                        }
                    };
                } else if (target.yCoord < source.yCoord) {
                    return {
                        start: {
                            x: source.xCoord + source.width / 2,
                            y: source.yCoord - borderWidth
                        },
                        end: {
                            x: target.xCoord + target.width / 2,
                            y: target.yCoord + target.heigth + borderWidth
                        }
                    }
                } else {
                    return {};
                }
            }

            //"Ломаем" линии под прямыми углами
            const verticalLines = (start, end) => {
                const xLen = end.x - start.x, yLen = end.y - start.y;
                if (xLen !== 0 && yLen !== 0) {
                    const interP1 = {
                        x: start.x + xLen / 2,
                        y: start.y
                    };
                    const interP2 = {
                        x: interP1.x,
                        y: end.y
                    }
                    
                    return [interP1.x, interP1.y, interP2.x, interP2.y]; 
                }

                return [];
            }

            const target = props.wfInfo[targetPhase] || null;
            if (source && target) {
                const { start, end } = getStartEndCoords(source, target); //Начало и конец линии
                const interPoints = verticalLines(start, end); //"Ломаем" косые линии под прямыми углами
                const points = [start.x, start.y, ...interPoints, end.x, end.y];

                return <Arrow key = {shortid.generate()} points={points} fill='LightSlateGray' stroke='LightSlateGray' strokeWidth={2} />;
            }
        });
    }

    //У нестандартного изменения слишком широкая схема рабочего процесса и история сверху просто не помещается и перекрывает схему
    const getHistoryPosition = () => props.prefix === 'C' && props.category && props.category.value === 'Не стандартный' ? 'center' : 'top';

    return <WorkflowDialog workflowMetaIsLoading={props.workflowMetaIsLoading} handleClose={props.handleClose} open={props.open}
        open={props.open} wfInfo={props.wfInfo} wfHistory={props.wfHistory} getLinks={getLinks} getCurrentPhase={getCurrentPhase} 
        historyPhasesNames={getHistoryPhasesNames()} getHistoryPosition={getHistoryPosition} />
}

let mapStateToProps = (state, props) => {
    return {
        workflowMetaIsLoading: state.header.workflowMetaIsLoading,
        wfInfo: state.header.workflowMeta.wfInfo,
        wfHistory: state.header.workflowMeta.wfHistory,
        prefix: state.mainPageContent.content[props.id].prefix,
        category: state.mainPageContent.content[props.id].headerItems.category,
    }
}

export default compose(
    connect(mapStateToProps, {}),
    withDialogWrapper
)(WorkflowDialogContainer);