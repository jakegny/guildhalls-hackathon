import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Confetti from "react-confetti";
import { newContract } from "../utils/workContractFactoryUtils";
import * as TypeOfWork from "../utils/TypeOfWork";
import { getWindowDimensions } from "../utils/view";

export default function HireAPro() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rootRef = React.useRef(null);

  const workContractFactoryMethods = useSelector(
    state => state?.contract?.workContractFactory?.methods,
  );
  const userAddress = useSelector(state => state?.user?.userAddress);
  const [typeOfWork, setTypeOfWork] = React.useState(0);
  const [contractCreatedSuccessfully, setContractCreatedSuccessfully] =
    React.useState(false);

  const handleChange = event => {
    setTypeOfWork(event.target.value);
  };

  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { width, height } = getWindowDimensions();

  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const intervalID = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearInterval(intervalID);
  }, [showConfetti]);

  return (
    <div ref={rootRef}>
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        // open
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        // TODO: stylind
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
          background: "darkgrey",
          margin: "auto",
          width: 300,
          height: 300,
        }}
        container={() => rootRef.current}
      >
        <Box sx={{ width: 400 }}>
          {/* TODO: handle the something went wrong case */}
          {contractCreatedSuccessfully ? (
            <>
              <h2 id='parent-modal-title'>
                Your contract was successfully created.
              </h2>
              <Button
                key={"goToOpenContracts"}
                onClick={async () => {
                  setOpen(false);
                  setContractCreatedSuccessfully(false);
                  navigate("/myOpenContracts");
                }}
              >
                View Your Open Contracts
              </Button>
            </>
          ) : (
            <>
              <h2 id='parent-modal-title'>
                Please wait while your contract is posted to the chain.
              </h2>
              <p id='parent-modal-description'>
                (elevator music is playing...)
              </p>
            </>
          )}

          {}
        </Box>
      </Modal>
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
                  What type of work do you need one?
                </Typography>
                <InputLabel id='demo-simple-select-label'>
                  Type Of Work
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={typeOfWork}
                  label='Type Of Work'
                  onChange={handleChange}
                >
                  {Object.keys(TypeOfWork).map(k => (
                    <MenuItem value={TypeOfWork[k]}>{k.toTitleCase()}</MenuItem>
                  ))}
                </Select>
                <Button
                  key={"postContract"}
                  onClick={async () => {
                    setOpen(true);
                    const createdContract = await newContract(typeOfWork);
                    // TODO: loading
                    console.log("createdContract", createdContract);
                    setShowConfetti(true);
                    setContractCreatedSuccessfully(true);
                  }}
                >
                  Post Contract
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {showConfetti ? <Confetti width={width} height={height} /> : null}
    </div>
  );
}
