import React from 'react';
import s from './AlertItem.module.scss';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LinkButton from '../../../../UIElements/LinkButton/LinkButton';
import { useHistory } from 'react-router-dom';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const AlertItem = (props) => {
    const history = useHistory();
    const handleChange = () => {
        props.handleItemChange(props.data.id, !props.data.expanded); // Свернуть/Развернуть элемент
        props.alertRead(props.data.id);
    }

    const onDeleteClick = (e) => {
        e.stopPropagation();
        props.deleteAlert(props.data.id);
    }

    const relObjClick = id => {
        props.updateCurrentRow({
            tabMode: 'new',
            key: id
        });
        history.push(`/index/module/${id}`);
        //props.getContent(id, props.showAlert);
        props.handleClose();
    }

    //Если алерт ссылается на объект, верни нам его
    const relativeObjectLinkElement = props.data.relativeObject
        ? <div className={s.relativeObjLink} title='По нажатию будет выполнен переход к объекту'>
            <LinkButton text={`Перейти к ${props.data.relativeObject} →`} onClick={() => { relObjClick(props.data.relativeObject) }} />
        </div>
        : null;

    //Прочитан ли алерт
    const newAlertElement = props.data.newAlert ? <div className={s.newAlertCircle}></div> : <div></div>;

    //TEMP - цвет аватара тупо для примера. Потом аватарка должна откуда-то тянуться. Цвет вообще не тут должен определяться
    //Но пока что для презентации оставим эту заглушку
    const avatarColor = props.data.relativeContact === 'Система' ? 'action' : 'primary';

    return <ExpansionPanel square expanded={props.data.expanded} onChange={handleChange}>
        <ExpansionPanelSummary>
            <div className={s.expansionHeaderGrid}>
                {newAlertElement}
                <div className={s.avatar} title={props.data.relativeContact}><AccountCircleIcon color={avatarColor} fontSize='large' /></div>
                <div className={s.title}>{props.data.title}</div>
                <div className={s.date}>{props.data.date}</div>
                <div className={s.delIcon} onClick={onDeleteClick} onFocus={(e) => e.stopPropagation()}><DeleteIcon color='secondary' /></div>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className={s.descriptionContainer}>
                {props.data.description}
                {relativeObjectLinkElement}
            </div>
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default AlertItem;