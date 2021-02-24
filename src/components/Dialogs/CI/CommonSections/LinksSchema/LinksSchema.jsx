import React, { useState } from 'react';
import s from './LinksSchema.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Stage, Layer, Rect, Text, Group, Arrow } from 'react-konva';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';

const Item = (props) => {
    const titleHeight = 14, titleFontSize = 10, titleTextOffset = 4;
    return <Group draggable={props.draggable || false}>
        <Rect x={props.x} y={props.y} width={props.width} height={titleHeight} stroke={props.strokeColor} strokeWidth={props.strokeWidth} fill='DimGray' />
        <Text text={props.type} x={props.x + titleTextOffset} y={props.y} width={props.width} height={titleHeight} verticalAlign='middle' fontSize={titleFontSize}
            fill='white' />
        <Group onDblClick={!props.isMoreBtnItem && props.onDblClick} onClick={props.isMoreBtnItem && props.onDblClick} >
            <Rect x={props.x} y={props.y + titleHeight} width={props.width} height={props.height - titleHeight} stroke={props.strokeColor} strokeWidth={props.strokeWidth}
                fill={props.fillColor} />
            <Text text={props.title} x={props.x} y={props.y + titleHeight} width={props.width} height={props.height - titleHeight} align='center' verticalAlign='middle'
                fontSize={props.rectFontSize} />
        </Group>
    </Group>;
}

const Source = (props) => {
    return <Item x={props.sourceParams.x} y={props.sourceParams.y} width={props.sourceParams.width} height={props.sourceParams.height} title={props.sourceName}
        fillColor={props.fillColor} strokeWidth={props.sourceParams.strokeWidth} strokeColor={props.sourceParams.strokeColor} rectFontSize={props.sourceParams.rectFontSize}
        type={props.type} />;
}

const Down = (props) => {
    //Вычисляем координаты стрелки
    const getArrowPoints = (commonParams, stageParams, minMax, sourceParams) => {
        const p1 = {
            x: stageParams.width / 2,
            y: stageParams.height / 2 + sourceParams.height / 2
        };

        const p2 = {
            x: p1.x,
            y: minMax.min.y - commonParams.intersticeY - 2
        }

        return [p1.x, p1.y, p2.x, p2.y];
    }

    let minMax = {
        min: { x: undefined, y: undefined },
        max: { x: undefined, y: undefined },
    }

    const links = props.links.map((item, index) => {
        if (index > props.maxRecordsShown) { return null; }
        const inRowIndex = ((index + 1) % props.commonParams.rowCapacity) || props.commonParams.rowCapacity;
        const rowIndex = Math.ceil((index + 1) / props.commonParams.rowCapacity);
        const { x, y } = props.getCurrentCoords(inRowIndex, rowIndex, props.commonParams, props.stageParams, 'down');

        minMax = props.updateMinMaxParams(minMax, x, y);

        return {
            ...props.commonParams,
            title: index !== props.maxRecordsShown ? item : { type: '', logicalName: props.commonParams.moreText },
            x,
            y,
        }
    });

    const itemElements = links.map(item => {
        if (!item) { return null; }
        const fillColor = item.title.logicalName === props.commonParams.moreText ? props.commonParams.moreFillColor : props.fillColor;
        const isMoreBtnItem = item.title.logicalName === props.commonParams.moreText ? true : false;

        return <Item key={item.title.logicalName} x={item.x} y={item.y} width={item.width} height={item.height}
            title={item.title.logicalName} fillColor={fillColor} strokeWidth={props.stageParams.strokeWidth} strokeColor={props.stageParams.strokeColor}
            rectFontSize={props.stageParams.rectFontSize} draggable onDblClick={props.onDblClick} type={item.title.ciType} isMoreBtnItem={isMoreBtnItem} />;
    })

    const arrowPoints = getArrowPoints(props.commonParams, props.stageParams, minMax, props.sourceParams);
    const areaRect = props.getAreaRectParams(minMax, props.commonParams);
    const text = props.getTextParams(minMax, props.commonParams, props.stageParams);

    if (!links || links.length === 0) { return null; }
    return <Group>
        <Arrow points={arrowPoints} fill={props.stageParams.strokeColor} stroke={props.stageParams.strokeColor} strokeWidth={props.stageParams.strokeWidth} />
        <Rect stroke={props.stageParams.strokeColor} strokeWidth={props.stageParams.strokeWidth} x={areaRect.x} y={areaRect.y} width={areaRect.width} height={areaRect.height} />
        <Text text='Нижестоящие' x={text.x} y={text.y} width={text.width} height={text.height} fontSize={props.stageParams.areaFontSize} fontStyle='bold' />
        {itemElements}
    </Group>;
}

const Up = (props) => {
    //Вычисляем координаты стрелки
    const getArrowPoints = (commonParams, stageParams, minMax, sourceParams) => {
        const p1 = {
            x: stageParams.width / 2,
            y: minMax.max.y + commonParams.height + commonParams.intersticeY
        };

        const p2 = {
            x: p1.x,
            y: stageParams.height / 2 - sourceParams.height / 2 - stageParams.strokeWidth
        }

        return [p1.x, p1.y, p2.x, p2.y];
    }

    let minMax = {
        min: { x: undefined, y: undefined },
        max: { x: undefined, y: undefined },
    }

    //Вычисляем координаты для каждого элемента
    const links = props.links.map((item, index) => {
        if (index > props.maxRecordsShown) { return null; }
        const inRowIndex = ((index + 1) % props.commonParams.rowCapacity) || props.commonParams.rowCapacity;
        const rowIndex = Math.ceil((index + 1) / props.commonParams.rowCapacity);
        const { x, y } = props.getCurrentCoords(inRowIndex, rowIndex, props.commonParams, props.stageParams, 'up');

        minMax = props.updateMinMaxParams(minMax, x, y);

        return {
            ...props.commonParams,
            title: index !== props.maxRecordsShown ? item : { type: '', logicalName: props.commonParams.moreText },
            x,
            y,
        }
    });

    const itemElements = links.map(item => {
        if (!item) { return null; }
        const fillColor = item.title.logicalName === props.commonParams.moreText ? props.commonParams.moreFillColor : props.fillColor;
        const isMoreBtnItem = item.title.logicalName === props.commonParams.moreText ? true : false;

        return <Item key={item.title.logicalName} x={item.x} y={item.y} width={item.width} height={item.height}
            title={item.title.logicalName} fillColor={fillColor} strokeWidth={props.stageParams.strokeWidth} strokeColor={props.stageParams.strokeColor}
            rectFontSize={props.stageParams.rectFontSize} draggable onDblClick={props.onDblClick} type={item.title.ciType} isMoreBtnItem={isMoreBtnItem} />;
    })

    const arrowPoints = getArrowPoints(props.commonParams, props.stageParams, minMax, props.sourceParams);
    const areaRect = props.getAreaRectParams(minMax, props.commonParams);
    const text = props.getTextParams(minMax, props.commonParams, props.stageParams);

    if (!links || links.length === 0) { return null; }
    return <Group>
        <Arrow points={arrowPoints} fill={props.stageParams.strokeColor} stroke={props.stageParams.strokeColor} strokeWidth={props.stageParams.strokeWidth} />
        <Rect stroke={props.stageParams.strokeColor} strokeWidth={props.stageParams.strokeWidth} x={areaRect.x} y={areaRect.y} width={areaRect.width} height={areaRect.height} />
        <Text text='Вышестоящие' x={text.x} y={text.y} width={text.width} height={text.height} fontSize={props.stageParams.areaFontSize} fontStyle='bold' />
        {itemElements}
    </Group>;
}

const ControlPanel = (props) => {
    const zoomIn = () => {
        const newWidth = props.commonParams.width + 10, newHeight = props.commonParams.height + 4;
        props.setCommonParams({
            ...props.commonParams,
            width: newWidth,
            height: newHeight,
            rowCapacity: Math.floor(840 / newWidth), //120 * 7 = 840 - Начально выставленные пропорции
        })
    }
    const zoomOut = () => {
        const newWidth = props.commonParams.width - 10, newHeight = props.commonParams.height - 4;
        props.setCommonParams({
            ...props.commonParams,
            width: newWidth,
            height: newHeight,
            rowCapacity: Math.floor(840 / newWidth),
        })
    }

    const isZoomOutDisabled = props.commonParams.width === 70 || props.downLinksCount === 0 && props.upLinksCount === 0;
    const isZoomInDisabled = props.commonParams.width === 280 || props.downLinksCount === 0 && props.upLinksCount === 0;

    return <div className={s.overallGrid}>
            <div className={s.overallCountGrid}>
                <div>
                    Вышестоящих: {`${props.maxRecordsShown > props.upLinksCount ? props.upLinksCount : props.maxRecordsShown} из ${props.upLinksCount}`}
                </div>
                <div>
                    Нижестоящих: {`${props.maxRecordsShown > props.downLinksCount ? props.downLinksCount : props.maxRecordsShown} из ${props.downLinksCount}`}
                </div>
            </div>
            <div className={s.overallScaleGrid}>
                <div>Масштаб: </div>
                <div>
                    <IconButton color='primary' aria-label='zoom out' onClick={zoomOut} disabled={isZoomOutDisabled} >
                        <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton color='primary' aria-label='zoom in' onClick={zoomIn} disabled={isZoomInDisabled} >
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        </div>
}

const LinksSchema = (props) => {
    //Общие параметры для элементов связей
    const _commonParams = { 
        width: 120, 
        height: 50,
        rowCapacity: 7,
        intersticeX: 20,
        intersticeY: 20,
        intersticeYFromSource: 50, //Дополнительный отступ от источника
        maxDisplayedRecords: 100,
        moreText: 'Загрузить еще порцию данных',
        moreFillColor: 'Plum',
    };
    const [commonParams, setCommonParams] = useState(_commonParams);
    const stageRef = React.useRef();

    const onDblClick = e => {
        //Если это More button, то нажимать одним кликом, иначе двумя
        if (e.target && e.target.attrs && e.target.attrs.text === commonParams.moreText) {
            setMaxRecordsShown(maxRecordsShown + commonParams.maxDisplayedRecords);
        } else {
            setMaxRecordsShown(commonParams.maxDisplayedRecords);
            stageRef.current.position({x: 0, y: 0});
            props.getCI(e.target.attrs.text, props.setCIDataIsLoading);
        }
    }
    const [maxRecordsShown, setMaxRecordsShown] = useState(commonParams.maxDisplayedRecords);
    const upLinksCount = props.data.links.up ? props.data.links.up.length : 0;
    const downLinksCount = props.data.links.down ? props.data.links.down.length : 0;

    return <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <span className={s.title}>Схема связей</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <ControlPanel upLinksCount={upLinksCount} downLinksCount={downLinksCount} maxRecordsShown={maxRecordsShown} commonParams={commonParams} 
                        setCommonParams={setCommonParams} />
                    <div>
                        <Stage draggable width={props.stageParams.width} height={props.stageParams.height} className={s.stage} ref={stageRef}>
                            <Layer>
                                <Up links={props.data.links.up} stageParams={props.stageParams} sourceParams={props.sourceParams} commonParams={commonParams}
                                    fillColor='Lavender' updateMinMaxParams={props.updateMinMaxParams} getCurrentCoords={props.getCurrentCoords}
                                    getAreaRectParams={props.getAreaRectParams} getTextParams={props.getTextParams} onDblClick={onDblClick} maxRecordsShown={maxRecordsShown} />
                                <Source sourceName={props.data.commonData.logicalName} type={props.data.commonData.category} sourceParams={props.sourceParams}
                                    fillColor='mintcream' />
                                <Down links={props.data.links.down} stageParams={props.stageParams} sourceParams={props.sourceParams} commonParams={commonParams}
                                    fillColor='Coral' updateMinMaxParams={props.updateMinMaxParams} getCurrentCoords={props.getCurrentCoords}
                                    getAreaRectParams={props.getAreaRectParams} getTextParams={props.getTextParams} onDblClick={onDblClick} maxRecordsShown={maxRecordsShown} />
                            </Layer>
                        </Stage>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>;
}

export default LinksSchema;