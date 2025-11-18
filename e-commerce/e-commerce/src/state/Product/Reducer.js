import {
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS
} from "./ActionType";

const initialState = {
  products: null,
  product: null,
  loading: false,
  error: null,
  deletedProduct: ""
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case UPDATE_PRODUCTS_REQUEST: // ✅ Add request case for update
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return { ...state, loading: false, error: null, products: action.payload };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: {
          ...state.products,
          content: state.products?.content?.filter((p) => p.id !== action.payload),
        },
        deletedProduct: action.payload,
      };

    case UPDATE_PRODUCTS_SUCCESS: // ✅ Update product in the list
      return {
        ...state,
        loading: false,
        error: null,
        products: {
          ...state.products,
          content: state.products?.content?.map((p) =>
            p.id === action.payload.id ? action.payload : p
          ),
        },
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
