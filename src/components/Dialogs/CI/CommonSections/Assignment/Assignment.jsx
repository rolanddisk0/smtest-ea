import React from 'react';
import s from './Assignment.module.scss';
import commonDataStyle from '../../CI.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import shortid from 'shortid';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import { getCaption } from 'utils/captions';

//Тут я торопился, думаю, лучше вынести кастомные блоки, такие как "Расположение", "Запрещенные категории", в отдельные подкомпоненты
const Assignment = (props) => {
    const getValueElement = (key, value) => {
        switch (key) {
            case 'product':
            case 'adminGroup':
            case 'ciOwner':
            case 'responsibleGroup':
            case 'curator':
            case 'ownerOrg':
                return <LinkButton text={value} />;
            case 'restrictedCategories':
                return value.map(rCat => <React.Fragment key={shortid.generate()}>
                    <div className={s.field}> </div>
                    <div className={s.value}>- {rCat}</div>
                </React.Fragment>);
            default:
                return value;
        }
    }

    let dataElements = [];
    for (let key in props.data) {
        dataElements = [
            ...dataElements,
            <React.Fragment key={shortid.generate()}>
                {key !== 'restrictedCategories'
                    ? <><div className={s.field}>{getCaption(key, 'device')}:</div>
                        <div className={s.value}>{getValueElement(key, props.data[key])}</div></>
                    : null}
            </React.Fragment>
        ];
    }

    let restrictedCatElements = [];
    for (let key in props.data) {
        restrictedCatElements = [
            ...restrictedCatElements,
            <React.Fragment key={shortid.generate()}>
                {key === 'restrictedCategories'
                    ? getValueElement(key, props.data[key])
                    : null}
            </React.Fragment>
        ];
    }

    //Блок Запрещенные категории (Вынести в отдельную компоненту?)
    let isRestrictedCatBlock = 'restrictedCategories' in props.data ? true : false;
    let restrictedCatBlockElement = isRestrictedCatBlock
        ? <div className={commonDataStyle.grid}>
            <div className={s.field}>Запрещенные категории:</div>
        </div>
        : null;

    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <span className={s.title}>Назначение</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div>
                <div className={commonDataStyle.grid}>
                    {dataElements}
                </div>
                {restrictedCatBlockElement}
                <div className={commonDataStyle.grid}>
                    {restrictedCatElements}
                </div>
            </div>
        </ExpansionPanelDetails>
    </ExpansionPanel>;
}

export default Assignment;