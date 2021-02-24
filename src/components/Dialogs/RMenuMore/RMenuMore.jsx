import React from 'react';
import s from './RMenuMore.module.scss';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { RightMenuMoreForm } from '../../Forms/RightMenuMore/RightMenuMore';

const RMenuMore = (props) => {
    const handleClose = () => props.handleClose();

    const applyValue = values => {
        handleClose();
    }

    return <Dialog open={props.open} fullWidth={true} maxWidth='sm'>
        <DialogTitle>
            <div className={s.title}>{props.title}</div>
        </DialogTitle>
        <DialogContent>
            <RightMenuMoreForm onSubmit={applyValue} handleClose={handleClose} dataIsLoading={props.dataIsLoading} data={props.data} totalCount={props.totalCount} 
                title={props.title} />
        </DialogContent>
    </Dialog>

}

export default RMenuMore;