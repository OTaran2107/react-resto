import {
    ADD_TABLE_SUCCESS,
    UPDATE_TABLE_SUCCESS,
    DELETE_TABLE,
    SEARCH_TABLE,
    SET_TABLES,
    SET_TABLES_LOADING
  } from '../actions/tables';
  
  const initialState = {
    list: [],
    search: '',
    isLoading: true
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case SET_TABLES:
        return {
          ...state,
          list: payload
        }
      case SET_TABLES_LOADING:
        return {
          ...state,
          isLoading: payload
        }
      case ADD_TABLE_SUCCESS:
        return {
          ...state,
          list: [...state.list, payload]
        }
      case UPDATE_TABLE_SUCCESS:
        return {
          ...state,
          list: state.list.map(item => item.id === payload.id ? payload : item)
        }
      case DELETE_TABLE:
        return {
          ...state,
          list: state.list.filter(item => item.id !== payload)
        }
      case SEARCH_TABLE:
        return {
          ...state,
          search: payload
        };
      default:
        return state;
    }
  }