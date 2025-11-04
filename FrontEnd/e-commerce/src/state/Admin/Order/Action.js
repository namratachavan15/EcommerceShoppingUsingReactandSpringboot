// src/state/Admin/Order/Action.js

import { api } from "../../../config/apiConfig";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  CONFIRMED_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE
} from "./ActionType";





// Get all orders
export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      const response = await api.get(`/api/admin/orders`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("response is",response);
      dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ORDER_FAILURE, payload: error.message });
    }
  };
};

// Confirm order
export const confirmOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    const token = localStorage.getItem("jwt");
    console.log("token is",token)
    try {
      await api.put(`/api/admin/orders/${orderId}/confirmed`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: CONFIRMED_ORDER_SUCCESS });
      dispatch(getOrders());
    } catch (error) {
      dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
    }
  };
};

// Ship order
export const shipOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      await api.put(`/api/admin/orders/${orderId}/ship`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: SHIP_ORDER_SUCCESS });
      dispatch(getOrders());
    } catch (error) {
      dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
    }
  };
};

// Deliver order
export const deliveredorder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      await api.put(`/api/admin/orders/${orderId}/deliver`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: DELIVERED_ORDER_SUCCESS });
      dispatch(getOrders());
    } catch (error) {
      dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    }
  };
};

// Delete order
export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      await api.delete(`/api/admin/orders/${orderId}/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: DELETE_ORDER_SUCCESS });
      dispatch(getOrders());
    } catch (error) {
      dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
  };
};
