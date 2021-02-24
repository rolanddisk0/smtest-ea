import React from 'react';
//import s from './Dashboard.module.scss';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const Dashboard = (props) => {

    return (
        <LineChart
            width={500}
            height={300}
            data={props.dashboardData}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='Зарегистрировано' stroke='#B40431' activeDot={{ r: 8 }} />
            <Line type='monotone' dataKey='Выполнено' stroke='#0101DF' />
        </LineChart>
    );
}

export default Dashboard;