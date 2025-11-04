import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState={
    user: null,
  isLoading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
  role: localStorage.getItem("role") || null, 
  isAuthenticated: !!localStorage.getItem("jwt"), 
}
export const authReducer=(state=initialState,action)=>{

    switch(action.type)
    {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:

            return{...state,isLoading:true,error:null}        
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload.jwt, role: action.payload.role, loading: false, isAuthenticated: true };
        case LOGIN_SUCCESS:
            return { ...state, jwt: action.payload.jwt, role: action.payload.role, loading: false };     
        case GET_USER_SUCCESS:
            return{...state,isLoading:false,error:null,user:action.payload}  
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return{...state,isloading:false,error:action.payload}            
        case LOGOUT:
            return { ...initialState, jwt: null, role: null, isAuthenticated: false }; // ✅ reset
        default:
            return state;    
    }
}