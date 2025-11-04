import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    SAVE_ADDRESS,
   
  } from "./ActionType";
  
  const initialState = {
    orders: [],
    order: null,
    error: null,
    loading: false,
    savedAddress: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      // ---------------- CREATE ORDER ----------------
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          order: action.payload,
          error: null,
        };
      case CREATE_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // ---------------- SAVE ADDRESS ----------------
      case SAVE_ADDRESS:
        return {
          ...state,
          savedAddress: action.payload,
        };
  
      // ---------------- GET ORDER BY ID ----------------
      case GET_ORDER_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_ORDER_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload,
          error: null,
        };
      case GET_ORDER_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // ---------------- GET ALL ORDERS (USER) ----------------
      case GET_ALL_ORDERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_ALL_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
          error: null,
        };
      case GET_ALL_ORDERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  