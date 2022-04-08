import * as types from "./types";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_WORK_CONTRACT_DATA:
      return {
        ...state,
        workContract: { ...action.payload },
      };
    case types.SET_WORK_CONTRACT_FACTORY_DATA:
      return {
        ...state,
        workContractFactory: { ...action.payload },
      };
    default:
      return state;
  }
}
