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
import { getOpenContracts } from "../utils/workContractFactoryUtils";
import * as TypeOfWork from "../utils/TypeOfWork";

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
          >
            <div
              style={{
                paddingTop: 20,
              }}
            >
              <PersonSearchIcon
                sx={{
                  width: 100,
                  height: 100,
                  display: "block",
                  m: "auto",
                }}
              />
              <Typography variant='h5' component='div' align='center'>
                Hire a professional
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 250,
              minHeight: 200,
              mx: 5,
              my: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => navigate("/bidAContract")}
          >
            <div
              style={{
                paddingTop: 20,
              }}
            >
              <WorkIcon
                sx={{
                  width: 100,
                  height: 100,
                  display: "block",
                  m: "auto",
                }}
              />
              <Typography variant='h5' component='div' align='center'>
                Bid Jobs
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
