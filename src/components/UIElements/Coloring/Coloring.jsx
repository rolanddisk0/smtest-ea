import React, { useState } from 'react';
import s from './Coloring.module.scss';
import ColoringBuilder from './ColoringBuilder/ColoringBuilder';
import { MenuItem, Select, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    red: {
        color: 'red'
    },
    green: {
        color: 'green'
    },
    blue: {
        color: 'blue'
    },
    purple: {
        color: 'purple'
    },
    select: {
        marginLeft: '5px'
    }
});

const Coloring = (props) => {
    const classes = useStyles();
    const [ color, setColor ] = useState();

    const handleChange = (event) => {
        let index = event.target.name;
        setColor(event.target.value);
        props.updateColoring(props.coloring[index].queryTree, event.target.value, index);
    }

    const handleAddItem = (event) => {
        props.addColoring();
    }

    return <div>
        {props.coloring.map((coloringItem, index) => {
            return <div>
                Цвет строки:
                <Select
                    value={coloringItem.color || null}
                    onChange={handleChange}
                    name={index}
                    classes={{ root: `${classes[coloringItem.color]} ${classes.select} ` }}
                    // classes={{ root: `${classes[color]} ${classes.select} ` }}
                >
                    <MenuItem value={'red'} classes={{ root: classes.red }}>Красный</MenuItem>
                    <MenuItem value={'blue'} classes={{ root: classes.blue }}>Синий</MenuItem>
                    <MenuItem value={'green'} classes={{ root: classes.green }}>Зеленый</MenuItem>
                    <MenuItem value={'purple'} classes={{ root: classes.purple }}>Фиолетовый</MenuItem>
                </Select>
                <ColoringBuilder fields={props.fields} //fields={props.queryBuilder.fields} 
                    queryTree={coloringItem.queryTree}
                    updateColoring={props.updateColoring} index={index} color={coloringItem.color} />
            </div>
        })}
        <IconButton aria-label='inbox' size='small' onClick={handleAddItem} className={s.iconButton}>
            <AddIcon className={s.icon} />
        </IconButton>
    </div>
}

export default Coloring;