import LinksSchema from './LinksSchema';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import { getCI } from 'redux/dialogReducer';
import { withAlert } from 'hoc/withAlert';

const LinksSchemaContainer = (props) => {
    const getCI = (value, setDataIsLoading) => props.getCI(value, props.showAlert, setDataIsLoading);

    //Обновляем минимальные и максимальные координаты (Для обрамления всех ниже- и вышестоящих элементов)
    const updateMinMaxParams = (minMax, currentX, currentY) =>  ({
        min: {
            x: minMax.min.x === undefined ? currentX : currentX < minMax.min.x ? currentX : minMax.min.x,
            y: minMax.min.y === undefined ? currentY : currentY < minMax.min.y ? currentY : minMax.min.y,
        },
        max: {
            x: minMax.max.x === undefined ? currentX : currentX > minMax.max.x ? currentX : minMax.max.x,
            y: minMax.max.y === undefined ? currentY : currentY > minMax.max.y ? currentY : minMax.max.y,
        }
    });

    //Вычисляем текущие координаты для конкретного элемента
    const getCurrentCoords = (inRowIndex, rowIndex, commonParams, stageParams, type) => {
        const getCurrentX = (inRowIndex, commonParams, stageParams) => {
            const xOffset = (Math.floor(inRowIndex / 2) * 2 + 1) * (commonParams.width / 2) + commonParams.intersticeX * Math.floor(inRowIndex / 2);
            if (inRowIndex === 1) {
                return stageParams.width / 2 - commonParams.width / 2;
            } else if (inRowIndex % 2) {
                return stageParams.width / 2 + xOffset - commonParams.width;
            } else {
                return stageParams.width / 2 - xOffset;
            }
        }
    
        const getCurrentY = (rowIndex, commonParams, stageParams, type) => {
            let yOffset = commonParams.intersticeY * rowIndex + (rowIndex * 2 - 1) * (commonParams.height / 2);
            if (type === 'up') { 
                return stageParams.height / 2 - yOffset - commonParams.height - commonParams.intersticeYFromSource;
            } else if (type === 'down') {
                return stageParams.height / 2 + yOffset + commonParams.intersticeYFromSource
            } else {
                return stageParams.height / 2;
            }
        }

        return {
            x: getCurrentX(inRowIndex, commonParams, stageParams),
            y: getCurrentY(rowIndex, commonParams, stageParams, type)
        }
    }

    //Вычисляем координаты рамки
    const getAreaRectParams = (minMax, commonParams) => ({
        x: minMax.min.x - commonParams.intersticeX,
        y: minMax.min.y - commonParams.intersticeY,
        width: minMax.max.x - minMax.min.x + commonParams.intersticeX * 2 + commonParams.width,
        height: minMax.max.y - minMax.min.y + commonParams.intersticeY * 2 + commonParams.height
    });

    //Вычисляем координаты текста над рамкой
    const getTextParams = (minMax, commonParams, stageParams) => ({
        x: minMax.min.x - commonParams.intersticeX,
        y: minMax.min.y - commonParams.intersticeY - (stageParams.areaFontSize + 2),
        width: 200,
        height: stageParams.areaFontSize
    });

    const getSourceParams = (stageParams) => {
        const sourceParams = { width: 120, height: 50, strokeWidth: stageParams.strokeWidth, strokeColor: stageParams.strokeColor, rectFontSize: stageParams.rectFontSize };
        sourceParams.x = stageParams.width / 2 - sourceParams.width / 2;
        sourceParams.y = stageParams.height / 2 - sourceParams.height / 2;
        return sourceParams;
    }
    
    const stageParams = { width: 1200, height: 500, strokeWidth: 2, strokeColor: 'lightblue', rectFontSize: 12, areaFontSize: 14 };
    const sourceParams = getSourceParams(stageParams);

    
    return <LinksSchema data={props.data} updateMinMaxParams={updateMinMaxParams} getCurrentCoords={getCurrentCoords} getAreaRectParams={getAreaRectParams} 
        getTextParams={getTextParams} stageParams={stageParams} sourceParams={sourceParams} getCI={getCI} setCIDataIsLoading={props.setCIDataIsLoading} />
}

let mapStateToProps = (state) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, { getCI }),
    withAlert
)(LinksSchemaContainer);