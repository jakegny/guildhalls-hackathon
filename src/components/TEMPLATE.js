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
s;
