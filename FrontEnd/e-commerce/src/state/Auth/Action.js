import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { 
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, 
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS 
} from "./ActionType"
import { getCart } from "../Cart/Action";
import { getOrders } from "../Admin/Order/Action";

// ----------------- Register -----------------
const registerRequest=()=>({type:REGISTER_REQUEST});
const registerSuccess=(user)=>({type:REGISTER_SUCCESS,payload:user});
const registerFailure=(error)=>({type:REGISTER_FAILURE,payload:error});

export const register=(userData)=>async(dispatch)=>{
  dispatch(registerRequest())
  try {
    const response=await axios.post(`${API_BASE_URL}/auth/signup`,userData)
    const user=response.data;
    if(user.jwt) {
      localStorage.setItem("jwt",user.jwt)
      localStorage.setItem("role", user.role); 
    }
    console.log("user",user)
    dispatch(registerSuccess({ jwt: user.jwt, role: user.role }));
  } catch (error) {
    dispatch(registerFailure(error.message))
  }
}

// ----------------- Login -----------------
const loginRequest=()=>({type:LOGIN_REQUEST});
const loginSuccess=(user)=>({type:LOGIN_SUCCESS,payload:user});
const loginFailure=(error)=>({type:LOGIN_FAILURE,payload:error});

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  console.log("api base url",`${API_BASE_URL}`)
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      localStorage.setItem("role", user.role);

      // clear old data
      //dispatch({ type: LOGOUT, payload: null });

      dispatch(loginSuccess({ jwt: user.jwt, role: user.role }));
      if (user.role === "ADMIN") {
        dispatch(getOrders());
      }
      dispatch(getUser(user.jwt));
      dispatch(getCart());
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};


// ----------------- Get User -----------------
const getUserRequest=()=>({type:GET_USER_REQUEST});
const getUserSuccess=(user)=>({type:GET_USER_SUCCESS,payload:user});
const getUserFailure=(error)=>({type:GET_USER_FAILURE,payload:error});

export const getUser=(jwt)=>async(dispatch)=>{
  dispatch(getUserRequest())
  try {
    const response=await axios.get(`${API_BASE_URL}/api/users/profile`,{
      headers:{ "Authorization":`Bearer ${jwt}` }
    })
    const user=response.data;
    console.log("user",user)
    dispatch(getUserSuccess(user))
  } catch (error) {
    dispatch(getUserFailure(error.message))
  }
}

// ----------------- Logout -----------------
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT, payload: null });
};
