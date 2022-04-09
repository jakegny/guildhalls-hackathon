import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {
  makeInteractableContract,
  getTypeOfWork,
  bidWork,
} from "../utils/workContractUtils";
import { ethers } from "ethers";

export default function JobDetails() {
  const { address } = useParams();

  const [typeOfWork, setTypeOfWork] = useState();
  const [bid, setBid] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const rootRef = React.useRef(null);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(async () => {
    const c = await makeInteractableContract(address);
    const tow = await getTypeOfWork(c);
    setTypeOfWork(tow);
  }, [address]);

  return (
    <div
      ref={rootRef}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <h1>Job Details</h1>
      <h3>Job Type: {typeOfWork}</h3>

      <h3>Statement Of Work</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
        Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
        sit amet orci. Aenean dignissim pellentesque felis.
        <ul>
          <li>Cras ornare tristique elit.</li>
          <li>Vivamus vestibulum ntulla nec ante.</li>
          <li>Praesent placerat risus quis eros.</li>
          <li>Fusce pellentesque suscipit nibh.</li>
          <li>Integer vitae libero ac risus egestas placerat.</li>
          <li>Vestibulum commodo felis quis tortor.</li>
        </ul>
        <TextField
          label='Bid'
          focused
          type='number'
          onChange={e => {
            setBid(e.target.value);
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            setOpen(true);
          }}
        >
          Bid Job
        </Button>
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        // TODO: style
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
          Bid this Job for {bid}?
          <Button
            key={"bid"}
            onClick={async () => {
              const c = await makeInteractableContract(address, true);
              const result = await bidWork(c, bid);

              setOpen(false);

              // setContractCreatedSuccessfully(false);
              // TODO: bid
              // navigate("/myOpenContracts");
            }}
          >
            Yes
          </Button>
          <Button
            key={"close"}
            onClick={async () => {
              setOpen(false);
            }}
          >
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
