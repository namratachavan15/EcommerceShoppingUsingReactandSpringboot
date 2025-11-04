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
    SAVE_ADDRESS 
  } from "./ActionType";
  import { api } from "../../config/apiConfig";
  
  const token = localStorage.getItem("jwt");
  
  //---------------- SAVE ADDRESS ----------------
  export const saveAddress = (address) => ({
    type: SAVE_ADDRESS,
    payload: address,
  });
  
  export const saveUserAddress = (address) => async (dispatch) => {
    const token = localStorage.getItem("jwt");
  
    try {
      const { data } = await api.post("/api/users/address", address, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Update Redux state with the saved address
      dispatch({
        type: SAVE_ADDRESS,
        payload: data,
      });
  
      console.log("Address saved:", data);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  
  // ---------------- CREATE ORDER ----------------
  export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      const { data } = await api.post(`/api/orders/`, reqData.address, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
  
      // 👇 Redirect to Order Summary with order_id
      if (data.id) {
        reqData.navigate(`/checkout?step=3&order_id=${data.id}`);
      }
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAILURE,
        payload: error.message,
      });
    }
  };
  
  
  // ---------------- GET ORDER BY ID ----------------
  export const getOrderById = (orderId) => async (dispatch) => {
    console.log("order id in getorder", orderId);
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  
    try {
      const { data } = await api.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("order by id", data);
      dispatch({
        type: GET_ORDER_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
  
  export const getAllOrdersForUser = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      const { data } = await api.get("/api/orders/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("data for user order",data)
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message });
    }
  };
  