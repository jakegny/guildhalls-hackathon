import axios from "axios";
import * as types from "./types";

export const setWorkContractData = contract => {
  // properties to keep:
  /*
	methods
	
	*/
  return {
    type: types.SET_WORK_CONTRACT_DATA,
    payload: contract,
  };
};

export const setWorkContractFactoryData = contractMethods => {
  console.log("contractMethods", contractMethods);
  // properties to keep:
  /*
	methods
	
	*/
  return {
    type: types.SET_WORK_CONTRACT_FACTORY_DATA,
    payload: { methods: contractMethods },
  };
};
