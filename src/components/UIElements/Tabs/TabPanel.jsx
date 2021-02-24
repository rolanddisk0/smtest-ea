import React from 'react';
import { Box } from '@material-ui/core';
import s from './TabPanel.module.scss';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const padding = props.box && props.box.padding !== undefined ? props.box.padding : 3;


    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={padding} className={s.box}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPanel;