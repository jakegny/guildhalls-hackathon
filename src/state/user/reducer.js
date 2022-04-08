import * as types from "./types";

const initialState = {
  error: null,
  isFetching: false,
  isAuthenticated: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING:
      return {
        ...state,
        error: null,
        isFetching: true,
        ...action.payload,
      };
    case types.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case types.LOGIN_FETCH:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        ...action.payload,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case types.LOGOUT:
      return {
        ...initialState,
      };
    case types.REGISTER_FETCH:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        ...action.payload,
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case types.TFA_SUCCESS:
      return {
        ...state,
        error: null,
        tfa_token: null,
        isFetching: false,
        ...action.payload,
        isAuthenticated: true,
      };
    case types.TFA_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case types.TFA_GENERATE_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        ...action.payload,
      };
    case types.TFA_GENERATE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case types.TFA_ENABLE_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        qr_code: null,
        ...action.payload,
      };
    case types.TFA_ENABLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case types.CLEAR_QR_CODE:
      return {
        ...state,
        qr_code: null,
      };
    default:
      return state;
  }
}
