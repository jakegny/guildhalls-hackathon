import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBids } from "../utils/workContractUtils";
import WorkContract from "../abis/WorkContract.json";
import { ethers } from "ethers";
import { useInterval } from "usehooks-ts";

function fetchBids(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
  const signer = new ethers.VoidSigner(
    window.ethereum.selectedAddress,
    provider,
  );
  const contract = new ethers.Contract(address, WorkContract.abi, signer);

  // const bids = getBids(contract);
  return getBids(contract);
}

export default function ContractBids() {
  const { address } = useParams();
  const [bids, setBids] = useState([]);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(async () => {
    const bs = await fetchBids(address);
    setBids(bs);
  }, []);

  useInterval(
    async () => {
      console.log("running..");
      const bs = await fetchBids(address);
      setBids(bs);
    },
    // Delay in milliseconds or null to stop it
    10000,
  );

  // useEffect(() => {
  //   const intervalID = setTimeout(() => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
  // const signer = new ethers.VoidSigner(
  //   window.ethereum.selectedAddress,
  //   provider,
  // );
  // const contract = new ethers.Contract(address, WorkContract.abi, signer);

  // const bids = getBids(contract);
  //   }, 1000);

  //   return () => clearInterval(intervalID);
  // }, []);
  console.log("bids", bids);

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
