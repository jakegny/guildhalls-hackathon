import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBids } from "../utils/workContractUtils";
import WorkContract from "../abis/WorkContract.json";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export default function ContractBids() {
  const { address } = useParams();
  // const provider = await detectEthereumProvider();

  // const web3 = new Web3(provider);
  // console.log("window.ethereum", window.ethereum);
  // const contract = new window.web3.eth.Contract(WorkContract.abi, address);
  // useEffect(() => {

  //   console.log("bids", bids);
  // }, []);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, WorkContract.abi, provider);

  const bids = getBids(contract);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  return (
    <div>
      <h1>Contract Bids</h1>
      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(openContracts).map((c, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {card(c)}
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
}
