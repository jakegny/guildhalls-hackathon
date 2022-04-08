import * as types from "./types";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ABI:
      return {
        ...state,
      };
    default:
      return state;
  }
}
