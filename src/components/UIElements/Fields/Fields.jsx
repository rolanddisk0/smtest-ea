import React from 'react';
import s from './Fields.module.scss';
import shortid from 'shortid';
import LinkButton from '../LinkButton/LinkButton';
import { getCaption } from 'utils/captions';

const Fields = (props) => {
    let fieldsElements = [];
    for (let key in props.data) {
        if (props.data[key] instanceof Object) { continue } //Реакт ругается на объекты

        fieldsElements = [
            ...fieldsElements,
            <React.Fragment key={shortid.generate()}>
                <div className={s.fieldNames}>
                    {getCaption(key, props.captionArea)}:

                </div>
                <div className={s.noOverflowTextContainer}>
                    <LinkButton text={props.data[key]} />

                </div>
            </React.Fragment>
        ];
    }
    
    return <div className={s.grid}>
        {fieldsElements}
    </div>;
}

export default Fields;