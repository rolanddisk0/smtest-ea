import React, { useState } from 'react';
import { connect } from 'react-redux';
import AlertUI from 'components/UIElements/AlertUI/AlertUI';
import { addNewAlert } from 'redux/headerReducer';
import shortid from 'shortid';

let mapStateToProps = (state) => {
    return {
        //В HOC можем получить данные из стора
    }
}

export const withAlert = (Component) => {
    const WithAlertComponent = (props) => {
        const [show, setShow] = useState(false);
        //TODO: Как лучше - объект или разбить на 3 части? Вообще этот хук хорошо разбивать как можно подробнее
        //Но у нас по сути инфа эта жить друг без друга не может и отдельно не должна изменяться. Как лучше сделать все таки - вопрос. Пока сделаю объектом.
        const [alertInfo, setAlertInfo] = useState({
            text: '',
            severity: 'success',
            title: 'Успех'
        });

        //additionalParam - Не обязательные доп. параметры
        const showAlert = (text = '', severity = 'success', title = 'Успех', additionalParams = {}) => {
            const formattedText = <>{text.split('\n').map(item => <div key={shortid.generate()}>{item}</div>)}</>; //Разбиваем на строчки по \n

            setAlertInfo({
                text: formattedText, 
                severity, //success, error, warning, info
                title
            });
            setShow(true);

            //Добавления алерта в список (Доступ по кнопке в хедере)
            const alertData = {
                title: title,
                description: formattedText,
                relObj: additionalParams.relObj || null,
                relContact: additionalParams.relContact || null,
            }
            props.addNewAlert(alertData);
        }
       
        return <>
            { show && <AlertUI open={show} handleClose={() => setShow(false)} severity={alertInfo.severity} title={alertInfo.title} description={alertInfo.text} /> }
            <Component {...props} showAlert={showAlert} />
        </>
        
    }

    return connect(mapStateToProps, { addNewAlert })(WithAlertComponent);
}