import React from 'react';
import s from './List.module.scss';
import ListHeaderContainer from './ListHeader/ListHeaderContainer';
import ListBodyContainer from './ListBody/ListBodyContainer';
import ListFooter from './ListFooter/ListFooter';
import OverlaySpinner from 'components/UIElements/OverlaySpinner/OverlaySpinner';

const List = (props) => {
    return (
        <OverlaySpinner active={props.listIsLoading}>
            <div className={s.grid}>
                <ListHeaderContainer/>
                <div className={s.body}>
                    <ListBodyContainer selectedColumns={props.selectedColumns} selectedTodo={props.selectedTodo}
                        data={props.data} columns={props.columns} uniqueKey={props.uniqueKey} />
                </div>
                <ListFooter />
            </div>
        </OverlaySpinner>
    );
}

export default List;

//selectedTodo={props.selectedTodo} updateSelectedTodo={props.updateSelectedTodo} 