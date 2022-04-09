import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "usehooks-ts";
import { ethers } from "ethers";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { getContractsForClient } from "../utils/workContractFactoryUtils";
import { getTypeOfWork, getStatus } from "../utils/workContractUtils";
import WorkContract from "../abis/WorkContract.json";

function ContractCard({ contract, handleClick }) {
  const [typeOfWork, setTypeOfWork] = useState("");
  const [contractStatus, setContractStatus] = useState(null);

  // const bids = await getBids(contract);
  // const acceptedBid = await getAcceptedBid(contract);
  // console.log("contractObj", contractObj);

  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
    // const signer = new ethers.VoidSigner(
    //   window.ethereum.selectedAddress,
    //   provider,
    // );
    const contractObj = new ethers.Contract(
      contract,
      WorkContract.abi,
      provider,
    );
    const tow = await getTypeOfWork(contractObj);
    setTypeOfWork(tow);
    const status = await getStatus(contractObj);
    setContractStatus(status);
  }, []);

  return (
    <React.Fragment>
      <Card sx={{ background: "gray" }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {contract} - {contractStatus}
          </Typography>
          <Typography variant='h5' component='div'></Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {typeOfWork}
          </Typography>
        </CardContent>
        {/* TODO: get bid count */}
        <CardActions>
          <Button
            size='small'
            onClick={() => {
              window.open(`https://explorer.pops.one/address/${contract}/`);
            }}
          >
            View on Explorer
          </Button>
          <Button size='small' onClick={handleClick}>
            See Details
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default function MyOpenContracts() {
  const userAddress = useSelector(state => state?.user?.userAddress);
  const [openContracts, setOpenContracts] = useState([]); // TODO: move to redux

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = c => () => {
    console.log("c", c);
    navigate(`/contractBids/${c}`);
  };

  useEffect(async () => {
    // console.log(window.ethereum.selectedAddress);
    if (!window.ethereum.selectedAddress) return;
    const oc = await getContractsForClient(window.ethereum.selectedAddress);
    setOpenContracts(oc);
  }, [userAddress]);

  useInterval(
    async () => {
      console.log("running...");
      if (!window.ethereum.selectedAddress) return;
      const oc = await getContractsForClient(window.ethereum.selectedAddress);
      setOpenContracts(oc);
    },
    // Delay in milliseconds or null to stop it
    5000,
  );

  console.log("openContracts", openContracts);

  return (
    <div>
      <h1>My Contracts</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {openContracts.map((c, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <ContractCard contract={c} handleClick={handleClick(c)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
