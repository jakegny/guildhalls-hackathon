import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { getContractsForClient } from "../utils/workContractFactoryUtils";

const card = (contract, handleClick) => {
  return (
    <React.Fragment>
      <Card sx={{ background: "gray" }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {contract}
          </Typography>
          <Typography variant='h5' component='div'></Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {"TODO: get type of work"}
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
            See Bids
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default function HireAPro() {
  const userAddress = useSelector(state => state?.user?.userAddress);
  const [openContracts, setOpenContracts] = useState([]); // TODO: move to redux

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = c => () => {
    console.log("c", c);
    navigate(`/contractBids/${c}`);
  };

  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider", provider);

    // console.log(window.ethereum.selectedAddress);
    if (!window.ethereum.selectedAddress) return;
    const oc = await getContractsForClient(window.ethereum.selectedAddress);
    console.log("openContracts", oc);

    // // TODO: loadWorkContracts
    // const newOc = oc.map(c => {
    //   return new window.web3.eth.Contract(WorkContract.abi, c);
    // });

    setOpenContracts(oc);
  }, [userAddress]);

  return (
    <div>
      <h1>My Contracts</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(openContracts).map((c, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {card(c, handleClick(c))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
