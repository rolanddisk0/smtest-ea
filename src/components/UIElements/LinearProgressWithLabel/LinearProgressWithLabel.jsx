import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import s from './LinearProgressWithLabel.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const useLinearStyles = makeStyles(() => ({
    root: {
        height: 10,
    },
    colorPrimary: {
        backgroundColor: '#eeeeee',
    },
    barColorPrimary: {
        backgroundColor: '#00b248',
    }
}));

const useCircularStyles = makeStyles(() => ({
    colorPrimary: {
        color: '#00b248',
    },
}));

const LinearProgressWithLabel = (props) => {
    const linearStyles = useLinearStyles();
    const circularStyles = useCircularStyles();

    const secondaryText = props.totalCount
        ? `Идет загрузка данных (${props.value}%)... Загружено записей: ${props.currentCount || 0} из ${props.totalCount}`
        : `Идет загрузка данных (${props.value}%)...`

    return <>
        <div className={s.progressLineGrid}>
            <div>
                <div><LinearProgress variant='determinate' value={props.value} classes={linearStyles} /></div>
                <Typography variant='body2' color='textSecondary'>{secondaryText}</Typography>
            </div>
            <div><CircularProgress size={25} classes={circularStyles} /></div>
        </div>
    </>
}

export default LinearProgressWithLabel;