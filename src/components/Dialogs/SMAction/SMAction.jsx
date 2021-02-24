import React from 'react';
import s from './SMAction.module.scss';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { getReactSelectControlValues } from 'utils/formsUtils';
import { ApplyTemplateForm } from 'components/Forms/SMAction/ApplyTemplate/ApplyTemplateForm';
import { AdditionalInfoReqForm } from 'components/Forms/SMAction/AdditionalInfoReq/AdditionalInfoReq';
import { CloseForm } from 'components/Forms/SMAction/Close/Close';
import { ReturnToKCForm } from 'components/Forms/SMAction/ReturnToKC/ReturnToKC';
import { EscalateForm } from 'components/Forms/SMAction/Escalate/Escalate';
import { CreateProblemForm } from 'components/Forms/SMAction/CreateProblem/CreateProblem';
import { ResolveSDForm } from 'components/Forms/SMAction/Resolve/ResolveSD';
import { ResolveIMForm } from 'components/Forms/SMAction/Resolve/ResolveIM';
import { ReturnForRevisionForm } from 'components/Forms/SMAction/ReturnForRevision/ReturnForRevision';
import { PendingForm } from 'components/Forms/SMAction/Pending/Pending';

const SMAction = (props) => {
    const handleClose = () => props.handleClose();
    const doAction = (values) => {
        const processedValues = getReactSelectControlValues(values); //Постобработка значений от react-select
        props.execSMAction(props.smAction, processedValues);
        props.handleClose();
    }

    const getFormElement = (area, action) => {
        const getSDFormElement = (action) => {
            switch (action) {
                case 'Применить шаблон':
                    return <ApplyTemplateForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose}
                        fAvailVals={props.sdActionsInfo[props.smAction].fAvailVals} isLoading={props.dataIsLoading} />;
                case 'Выполнить':
                    return <ResolveSDForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose}
                        fAvailVals={props.sdActionsInfo[props.smAction].fAvailVals} isLoading={props.dataIsLoading} direction={props.direction} />;
                case 'Запрос доп. информации':
                    return <AdditionalInfoReqForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} />;
                case 'Закрыть':
                    return <CloseForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.sdActionsInfo[props.smAction].fAvailVals}
                        isLoading={props.dataIsLoading} direction={props.direction} feedbackType={props.feedbackType} />;
                case 'Вернуть в КЦ':
                    return <ReturnToKCForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.sdActionsInfo[props.smAction].fAvailVals}
                        isLoading={props.dataIsLoading} />;
                case 'Маршрутизировать':
                    return <EscalateForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.sdActionsInfo[props.smAction].fAvailVals}
                        isLoading={props.dataIsLoading} category={props.category} getSMActionFieldsData={props.getSMActionFieldsData}
                        clearSMActionFieldsData={props.clearSMActionFieldsData} />;
                default:
                    return null;
            }
        }

        const getIMFormElement = (action) => {
            switch (action) {
                case 'Создать Проблему':
                    return <CreateProblemForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.imActionsInfo[props.smAction].fAvailVals}
                        isLoading={props.dataIsLoading} />;
                case 'Выполнить':
                    return <ResolveIMForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.imActionsInfo[props.smAction].fAvailVals} 
                        isLoading={props.dataIsLoading} />;
                case 'Вернуть на доработку':
                    return <ReturnForRevisionForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.imActionsInfo[props.smAction].fAvailVals} 
                        isLoading={props.dataIsLoading} />; 
                case 'Отложить':
                    return <PendingForm onSubmit={doAction} smAction={props.smAction} handleClose={handleClose} fAvailVals={props.imActionsInfo[props.smAction].fAvailVals} 
                        isLoading={props.dataIsLoading} />; 
                default:
                    return null;
            }
        }

        const getCFormElement = (action) => {
            switch (action) {
                default:
                    return null;
            }
        }

        switch (area) {
            case 'SD':
                return getSDFormElement(action);
            case 'IM':
                return getIMFormElement(action);
            case 'C':
                return getCFormElement(action);
            default:
                return null;
        }
    }

    const formElement = getFormElement(props.area, props.smAction);

    return <Dialog disableBackdropClick open={props.open} fullWidth={true} maxWidth='sm'>
        <DialogTitle className={s.title}>
            Действие "{props.smAction}"
            </DialogTitle>
        <DialogContent>
            {formElement}
        </DialogContent>
    </Dialog>
}

export default SMAction;