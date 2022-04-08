import axios from "axios";
import * as types from "./types";

export const setWorkContractData = contract => {
  console.log("contract", contract);
  // properties to keep:
  /*
	methods
	
	*/
  return {
    type: types.SET_WORK_CONTRACT_DATA,
    payload: contract,
  };
};

export const setWorkContractFactoryData = contract => {
  console.log("contract", contract);
  // properties to keep:
  /*
	methods
	
	*/
  return {
    type: types.SET_WORK_CONTRACT_FACTORY_DATA,
    payload: contract,
  };
};
