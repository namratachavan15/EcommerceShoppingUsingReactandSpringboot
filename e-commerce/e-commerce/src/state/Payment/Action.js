import { api } from "../../config/apiConfig"
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST } from "./ActionType"

export const createPayment = (reqData) => async (dispatch) => {
    console.log("inside create payment", reqData);
    const token = localStorage.getItem("jwt");
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
      const { data } = await api.post(
        `/api/payments/${reqData}`,
        reqData, // empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  
      if (data.payment_link_url) {
        window.location.href = data.payment_link_url; // redirect to Razorpay
      }
    } catch (error) {
      dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
    }
  };
export const updatePayment=(reqData)=>async(dispatch)=>{
      
    dispatch({type:UPDATE_PAYMENT_REQUEST})
    try {
            
        const {data}= await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`)

        if(data.payment_link_url)
        {
            window.location.href=data.payment_link_url;
        }
        console.log("update payment:",data)
        } catch (error) {
            dispatch({type:UPDATE_PAYMENT_FAILURE,payload:error.message})
        }
}