import api from '../../services/api';

export const SET_TABLES = 'SET_TABLES';
export function setTables(data) {
    return {
        type: SET_TABLES,
        payload: data
    };
}

export const SET_TABLES_LOADING = 'SET_TABLES_LOADING';
export function setTablesLoading(isLoading) {
    return {
        type: SET_TABLES_LOADING,
        payload: isLoading
    };
}

export const DELETE_TABLE = 'DELETE_TABLE';
export function deleteTable(tableId) {
    return {
        type: DELETE_TABLE,
        payload: tableId
    }
};

export const SEARCH_TABLE = 'SEARCH_TABLE';
export function searchTable(query) {
    return {
        type: SEARCH_TABLE,
        payload: query
    };
}

export const ADD_TABLE_SUCCESS = 'ADD_TABLE_SUCCESS';
export function addTableSuccess(table) {
    return {
        type: ADD_TABLE_SUCCESS,
        payload: table
    };
}

export const UPDATE_TABLE_SUCCESS = 'UPDATE_TABLE_SUCCESS';
export function updateTableSuccess(table) {
    return {
        type: UPDATE_TABLE_SUCCESS,
        payload: table
    };
}

export function getTables() {
    return function (dispatch) {
        dispatch(setTablesLoading(true));
        api.get('tables').then(resp => {
            dispatch(setTables(resp.data));
            dispatch(setTablesLoading(false));
        });
    }
}

export function saveTable(table) {
    return table.id ? updateTable(table) : addTable(table);
};

export const addTable = (table) => {
    return dispatch => {
        dispatch(setTablesLoading(true));
        api.post('tables', table)
            .then(resp => {
                dispatch(addTableSuccess(resp.data));
                dispatch(setTablesLoading(false));
            });
    };
};

export const updateTable = (table) => {
    return dispatch => {
        dispatch(setTablesLoading(true));
        api.put(`tables/${table.id}`, table)
            .then(resp => {
                dispatch(updateTableSuccess(resp.data));
                dispatch(setTablesLoading(false));
            });
    };
};

export const removeTable = (tableId) => {
    return dispatch => {
        api.delete(`tables/${tableId}`)
            .then(resp => {
                dispatch(deleteTable(resp.data.id));
            });
    };
};