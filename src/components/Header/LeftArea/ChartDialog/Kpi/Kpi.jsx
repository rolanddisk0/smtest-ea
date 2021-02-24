import React from 'react';
//import s from './Kpi.module.scss';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Kpi = (props) => {

    return (
    	<AreaChart width={500} height={300} data={props.kpiData}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='name'/>
        <YAxis/>
        <Tooltip/>
        <Area type='monotone' dataKey='%' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
}

export default Kpi;