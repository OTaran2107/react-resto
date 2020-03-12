import api from '../../services/api';

export const SET_WAITERS = 'SET_WAITERS';
export function setWaiters(data) {
    return {
        type: SET_WAITERS,
        payload: data
    };
}

export const SET_WAITERS_LOADING = 'SET_WAITERS_LOADING';
export function setWaitersLoading(isLoading) {
    return {
        type: SET_WAITERS_LOADING,
        payload: isLoading
    };
}

export const DELETE_WAITER = 'DELETE_WAITER';
export function deleteWaiter(waiterId) {
    return {
        type: DELETE_WAITER,
        payload: waiterId
    }
};

export const SEARCH_WAITER = 'SEARCH_WAITER';
export function searchWaiter(query) {
    return {
        type: SEARCH_WAITER,
        payload: query
    };
}

export const FILTER_WAITERS = 'FILTER_WAITERS';
export function setWaitersFilter(filters) {
    return {
        type: FILTER_WAITERS,
        payload: filters
    };
}

export const ADD_WAITER_SUCCESS = 'ADD_WAITER_SUCCESS';
export function addWaiterSuccess(waiter) {
    return {
        type: ADD_WAITER_SUCCESS,
        payload: waiter
    };
}

export const UPDATE_WAITER_SUCCESS = 'UPDATE_WAITER_SUCCESS';
export function updateWaiterSuccess(waiter) {
    return {
        type: UPDATE_WAITER_SUCCESS,
        payload: waiter
    };
}

export function getWaiters() {
    return function (dispatch) {
        dispatch(setWaitersLoading(true));
        api.get('waiters').then(resp => {
            dispatch(setWaiters(resp.data));
            dispatch(setWaitersLoading(false));
        });
    }
}

export function saveWaiter(waiter) {
    return waiter.id ? updateWaiter(waiter) : addWaiter(waiter);
};

export const addWaiter = (waiter) => {
    return dispatch => {
        dispatch(setWaitersLoading(true));
        api.post('waiters', waiter)
            .then(resp => {
                dispatch(addWaiterSuccess(resp.data));
                dispatch(setWaitersLoading(false));
            });
    };
};

export const updateWaiter = (waiter) => {
    return dispatch => {
        dispatch(setWaitersLoading(true));
        api.put(`waiters/${waiter.id}`, waiter)
            .then(resp => {
                dispatch(updateWaiterSuccess(resp.data));
                dispatch(setWaitersLoading(false));
            });
    };
};

export const fireWaiter = (waiterId) => {
    return dispatch => {
        api.delete(`waiters/${waiterId}`)
            .then(resp => {
                dispatch(deleteWaiter(resp.data.id));
            });
    };
};