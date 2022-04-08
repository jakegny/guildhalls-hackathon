import * as types from "./types";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONTRACT_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
