import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import {
  getContractsForClient,
  newContract,
  getOpenContracts,
  assignWorker,
} from "../utils/workContractFactoryUtils";
import * as TypeOfWork from "../utils/TypeOfWork";
import WorkContract from "../abis/WorkContract.json";

const card = (contract, navigate) => {
  console.log("contract", contract);
  return (
    <React.Fragment>
      <Card sx={{ background: "gray" }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {contract._address}
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
              window.open(
                `https://explorer.pops.one/address/${contract._address}/`,
              );
            }}
          >
            View on Explorer
          </Button>
          <Button
            size='small'
            onClick={() => {
              navigate("/contractBids");
              // TODO: how to pass contract (PICK UP HERE)
            }}
          >
            See Bids
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default function HireAPro() {
  const workContractFactoryMethods = useSelector(
    state => state?.contract?.workContractFactory?.methods,
  );
  const userAddress = useSelector(state => state?.user?.userAddress);
  const [openContracts, setOpenContracts] = useState([]); // TODO: move to redux

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    if (!userAddress) return;
    if (!workContractFactoryMethods.getContractsForClient) return;
    const oc = await getContractsForClient(
      workContractFactoryMethods,
      userAddress,
    );
    console.log("openContracts", oc);

    // TODO: loadWorkContracts
    const newOc = oc.map(c => {
      return new window.web3.eth.Contract(WorkContract.abi, c);
    });
    console.log("newOc", newOc);

    setOpenContracts(newOc);
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
            {card(c, navigate)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
