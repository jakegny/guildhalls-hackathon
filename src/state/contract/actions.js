import axios from "axios";
import * as types from "./types";

export const setABI = () => {
  return {
    type: types.CLEAR_QR_CODE,
    payload: {},
  };
};

// connect metamask
export const connectMetaMask = navigate => async dispatch => {
  console.log("in here");
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];
  dispatch({
    type: types.CONNECT_METAMASK,
    payload: {
      userAddress: account,
    },
  });
  navigate("/"); // Do I need this?
};

export const getIdentityData = () => async (dispatch, getState) => {
  const state = getState();

  const address = state.user.userAddress;
  // web3 get tokens.
};
