import React from "react";
import { useSelector } from "react-redux";
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

async function getData(userAddress, contractMethods) {
  getContractsForClient(contractMethods);
  // const data = await contractMethods.tokensOfOwner(userAddress).call();
  // const uri = await contractMethods.tokenURI(data[0]).call();
  // console.log("uri", uri);
}

export default function CreateIdentity() {
  const contractMethods = useSelector(state => state?.contract?.methods);
  const userAddress = useSelector(state => state?.user?.userAddress);
  // mint = (addressId, idType, orgType) => {
  //   this.state.contract.methods
  //     .mint(addressId, idType, orgType)
  //     .send({ from: this.state.account })
  // .once("receipt", receipt => {
  //   this.setState({
  //     identities: [...this.state.identities, Identity],
  //   });
  // });
  // };

  if (userAddress) {
    // getData(userAddress, contractMethods);
  }

  console.log("???!");
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
            onClick={() => console.log("looking to hire")}
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
