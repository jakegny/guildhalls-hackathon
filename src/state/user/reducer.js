import * as types from "./types";

const initialState = {
  error: null,
  isFetching: false,
  isMetaMaskConnected: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CONNECT_METAMASK:
      return {
        ...state,
        isMetaMaskConnected: true,
        userAddress: action.payload.userAddress,
      };
    case types.TOKENS_FOR_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
