import {
  ADD_WAITER_SUCCESS,
  UPDATE_WAITER_SUCCESS,
  DELETE_WAITER,
  SEARCH_WAITER,
  FILTER_WAITERS,
  SET_WAITERS,
  SET_WAITERS_LOADING
} from '../actions/waiters';

const initialState = {
  list: [],
  search: '',
  filters: {},
  isLoading: true
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_WAITERS:
      return {
        ...state,
        list: payload
      }
    case SET_WAITERS_LOADING:
      return {
        ...state,
        isLoading: payload
      }
    case ADD_WAITER_SUCCESS:
      return {
        ...state,
        list: [...state.list, payload]
      }
    case UPDATE_WAITER_SUCCESS:
      return {
        ...state,
        list: state.list.map(item => item.id === payload.id ? payload : item)
      }
    case DELETE_WAITER:
      return {
        ...state,
        list: state.list.filter(item => item.id !== payload)
      }
    case SEARCH_WAITER:
      return {
        ...state,
        search: payload
      };
    case FILTER_WAITERS:
      return {
        ...state,
        filters: payload
      }
    default:
      return state;
  }
}