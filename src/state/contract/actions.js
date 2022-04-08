import axios from "axios";
import * as types from "./types";

export const setContractData = contract => {
  console.log("contract", contract);
  // properties to keep:
  /*
	methods
	
	*/
  return {
    type: types.SET_CONTRACT_DATA,
    payload: contract,
  };
};
