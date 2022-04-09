import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkIcon from "@mui/icons-material/Work";
import {
  getContractsForClient,
  newContract,
  getOpenContracts,
  assignWorker,
} from "../utils/workContractFactoryUtils";
import * as TypeOfWork from "../utils/TypeOfWork";

async function getData(userAddress, contractMethods) {
  // const data = await getContractsForClient(contractMethods, userAddress);

  const createdContract = await newContract(
    contractMethods,
    userAddress,
    TypeOfWork.ELECTRICAL,
  );
  console.log("createdContract", createdContract); // Add this into redux state.

  const openContracts = await getOpenContracts(contractMethods);

  // const data = await contractMethods.tokensOfOwner(userAddress).call();
  // const uri = await contractMethods.tokenURI(data[0]).call();
  console.log("openContracts", openContracts);
}

export default function Home() {
  const navigate = useNavigate();

  const workContractFactoryMethods = useSelector(
    state => state?.contract?.workContractFactory?.methods,
  );
  const userAddress = useSelector(state => state?.user?.userAddress);

  if (userAddress) {
    // getData(userAddress, workContractFactoryMethods);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 250,
              minHeight: 200,
              mx: 5,
              my: 2,
            }}
            onClick={() => {
              navigate("/hireAPro");
            }}
            alignItems='center'
            justifyContent='center'
          >
            <CardContent>
              <PersonSearchIcon
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
              <Typography variant='h5' component='div'>
                Hire a professional
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 250,
              minHeight: 200,
              mx: 5,
              my: 2,
            }}
            onClick={() => console.log("manage work")}
            alignItems='center'
            justifyContent='center'
          >
            <CardContent>
              <WorkIcon
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
              <Typography variant='h5' component='div'>
                Mangage your work
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
