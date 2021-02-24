
import { Utils as QbUtils } from 'react-awesome-query-builder';

const SET_QUERY_BUILDER = 'SET_QUERY_BUILDER';
const UPDATE_COLORING = 'UPDATE_COLORING';
const ADD_COLORING = 'ADD_COLORING';
const SET_COLORING = 'SET_COLORING';

let initialState = {
    queryBuilder: {
        queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
        queryColumns: [],
        //fields: [] 
    },
    coloring: [{
        queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
        color: null
    }]
};

const uiElementsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUERY_BUILDER:
            let value = action.value;
            let queryBuilder = { ...state.queryBuilder };

            if (value.hasOwnProperty('queryTree')) {
                queryBuilder.queryTree = value.queryTree
            }

            if (value.hasOwnProperty('fields')) {
                queryBuilder.fields = value.fields
            }

            if (value.hasOwnProperty('queryColumns')) {
                queryBuilder.queryColumns = value.queryColumns
            }

            return {
                ...state,
                queryBuilder: queryBuilder
            };
        case UPDATE_COLORING:
            let currentIndex = action.index || 0;
            let newObject = {
                queryTree: action.queryTree || { 'id': QbUtils.uuid(), 'type': 'group' }, //state.coloring[currentIndex].queryTree ||
                color: action.color
            };

            let newList = state.coloring.map((o, index) => {
                if (index === currentIndex) {
                    return newObject;
                }
                return o;
            });

            return {
                ...state,
                coloring: newList
            }
        case ADD_COLORING:
            return {
                ...state,
                coloring: [...state.coloring, {
                    queryTree: { 'id': QbUtils.uuid(), 'type': 'group' },
                    color: null
                }]
            }
        case SET_COLORING:
            return {
                ...state,
                coloring: [...action.data]
            }
        default:
            return state;
    }
}

export const updateQueryBuilder = (value) => ({ type: SET_QUERY_BUILDER, value: value });
export const updateColoring = (queryTree, color, index) => ({ type: UPDATE_COLORING, queryTree: queryTree, color: color, index: index });
export const addColoring = () => ({ type: ADD_COLORING });
export const setColoring = (data) => ({ type: SET_COLORING, data: data });

export default uiElementsReducer;