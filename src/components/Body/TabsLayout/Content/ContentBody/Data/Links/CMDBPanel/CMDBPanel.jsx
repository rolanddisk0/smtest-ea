import React, { useState } from 'react';
import s from './CMDBPanel.module.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import shortid from 'shortid';
import LinkButton from 'components/UIElements/LinkButton/LinkButton';
import CIContainer from 'components/Dialogs/CI/CIContainer';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectControl } from 'components/Forms/FormControls/AsyncSelectControl/AsyncSelectControl';

const Item_EditMode = (props) => {
    const getAsyncParams = (listName, inputField) => ({defaultOptions: props.list.data, getDataPromise: props.getEditModeList, listName: listName, inputField: inputField });
    const asyncParams = getAsyncParams(props.listName, props.fieldReduxName);

    return <Field component={AsyncSelectControl} name={props.fieldReduxName} placeholder={props.fieldName} asyncParams={asyncParams} isDisabled={props.isDisabled} 
        isLoading={props.list.isLoading || false} multi={props.isMulty || false} isMulti={props.isMulti}/>;
}


const CMDBPanel_EditMode = reduxForm({ form: 'fullContentForm' })((props) => {
    return <div className={s.grid}>
        <div>
            <div className={s.header}>Основное КЕ</div>
            <div className={s.editModeItem}>
                <Item_EditMode getEditModeList={props.getEditModeList} fieldName='Основное КЕ' fieldReduxName='logicalName' list={props.editModeLists.ciList} 
                    isDisabled={props.data.logicalName.readOnly} listName='ciList' />
            </div>
        </div>
        <div>
            <div className={s.header}>Затронутые КЕ</div>
            <div className={s.editModeItem}>
                <Item_EditMode getEditModeList={props.getEditModeList} fieldName='Затронутые КЕ' fieldReduxName='assets' list={props.editModeLists.assetsList} 
                        isDisabled={props.data.assets.readOnly} listName='assetsList' isMulti={true} />
            </div>
        </div>
    </div>
});

const CMDBPanel_ReadOnlyMode = (props) => {
    const [showCIDialog, setShowCIDialog] = useState(false);
    const [ciDataIsLoading, setCIDataIsLoading] = useState(false);
    const ciClick = target => {
        setShowCIDialog(true);
        props.getCI(target.textContent, setCIDataIsLoading);
    }

    const logicalNameElement = props.data.logicalName.value
        ? <LinkButton text={props.data.logicalName.value} onClick={(e) => { ciClick(e.target) }} />
        : 'Нет';
    const assetsElements = props.data.assets.value.length ?
        props.data.assets.value.map(item => <div key={shortid.generate()}>
            <LinkButton text={item} onClick={(e) => { ciClick(e.target) }} />
        </div>)
        : 'Нет';

    return <>
        <CIContainer open={showCIDialog} handleClose={() => setShowCIDialog(false)} dataIsLoading={ciDataIsLoading} setCIDataIsLoading={setCIDataIsLoading} />
        <div className={s.grid}>
            <div>
                <div className={s.header}>Основное КЕ</div>
                <div>{logicalNameElement}</div>
            </div>
            <div>
                <div className={s.header}>Затронутые КЕ</div>
                <div>{assetsElements}</div>
            </div>
        </div>
    </>
}

const CMDBPanel = (props) => {
    return <>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                <span className={s.header}>CMDB</span>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {props.isEditModeEnabled 
                    ? <CMDBPanel_EditMode data={props.cmdbPanelData} getEditModeList={props.getEditModeList} editModeLists={props.editModeLists} />
                    : <CMDBPanel_ReadOnlyMode data={props.cmdbPanelData} getCI={props.getCI} />}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </>;
}

export default CMDBPanel;