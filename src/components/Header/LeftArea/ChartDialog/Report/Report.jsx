import React from 'react';
//import s from './Report.module.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Report = (props) => {

    return (
    	<BarChart width={500} height={300} data={props.reportData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray='3 3'/>
       <XAxis dataKey='name'/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey='Зарегистрировано' fill='#8884d8' />
       <Bar dataKey='Выполнено' fill='#82ca9d' />
      </BarChart>
    );
}

export default Report;