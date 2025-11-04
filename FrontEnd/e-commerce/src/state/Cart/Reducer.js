import { LOGOUT } from "../Auth/ActionType";
import { 
  ADD_ITEM_TO_CART_REQUEST, 
  ADD_ITEM_TO_CART_SUCCESS, 
  
  GET_CART_FAILURE, 
  GET_CART_REQUEST, 
  GET_CART_SUCCESS, 
  REMOVE_CART_ITEM_FAILURE, 
  REMOVE_CART_ITEM_REQUEST, 
  REMOVE_CART_ITEM_SUCCESS, 
  UPDATE_CART_ITEM_FAILURE, 
  UPDATE_CART_ITEM_REQUEST, 
  UPDATE_CART_ITEM_SUCCESS ,
  CLEAR_CART
} from "./ActionType"

const initialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: [],
  updateCartItem:null,
  deleteCartItem:null,
  cartItemCount:0
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        loading: false,
      };

    case GET_CART_REQUEST:
      return { ...state, loading: true };

      case GET_CART_SUCCESS:
        return {
          ...state,
          cartItems: action.payload.cartItems,
          cart: action.payload,
          cartItemCount: action.payload.cartItems.reduce((acc, item) => acc + item.quantity, 0),
          loading: false,
        };
      
    case GET_CART_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        // cartItems: state.cartItems.filter(item => item.id !== action.payload),
        // cart: {
        //   ...state.cart,
        //   cartItems: state.cart?.cartItems.filter(item => item.id !== action.payload)
        // },
        deleteCartItem:action.payload,
        loading: false,
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        // ...state,
        // cartItems: state.cartItems.map(item =>
        //   item.id === action.payload.id ? action.payload : item
        // ),
        // cart: {
        //   ...state.cart,
        //   cartItems: state.cart?.cartItems.map(item =>
        //     item.id === action.payload.id ? action.payload : item
        //   )
        // },
        // loading: false,
        ...state,
        updateCartItem:action.payload,
        loading:false
      };

    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };

      case LOGOUT:
        return initialState;

      case CLEAR_CART:
        return{...initialState};   
    default:
      return state;
  }
}
