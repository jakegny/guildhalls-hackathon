import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "usehooks-ts";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  getBids,
  acceptBid,
  getAcceptedBid,
  assignWorker,
  getStatus,
  getTypeOfWork,
  getWorker,
  workStarted,
} from "../utils/workContractUtils";
import { delistContract } from "../utils/workContractFactoryUtils";
import WorkContract from "../abis/WorkContract.json";
import { ethers } from "ethers";

async function fetchBids(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
  const signer = new ethers.VoidSigner(
    window.ethereum.selectedAddress,
    provider,
  );
  const contract = new ethers.Contract(address, WorkContract.abi, signer);
  const bids = await getBids(contract);
  const acceptedBid = await getAcceptedBid(contract);

  return {
    bids,
    acceptedBid: acceptedBid || null,
  };
}

function BidCard({ bidder }) {
  const { address: contractAddress } = useParams();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const rootRef = React.useRef(null);

  const localBid = ethers.utils.formatUnits(bidder.bid);

  return (
    <div ref={rootRef}>
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
          <h3>
            Accept the bid of {localBid} from {bidder.address} for this Job?
          </h3>
          <Button
            key={"accept"}
            onClick={async () => {
              console.log("accept Bid");
              const provider = new ethers.providers.Web3Provider(
                window.ethereum,
              );
              // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
              const signer = new ethers.VoidSigner(
                window.ethereum.selectedAddress,
                provider,
              );
              const contract = new ethers.Contract(
                contractAddress, // contract factory
                WorkContract.abi,
                signer,
              );
              const result = await acceptBid(contract, bidder.address);
              setOpen(false);
            }}
          >
            Accept
          </Button>
          <Button
            key={"close"}
            onClick={async () => {
              setOpen(false);
            }}
            // TODO: reject bid?
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Card sx={{ background: "gray" }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {bidder.address}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {localBid}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            onClick={() => {
              window.open(
                `https://explorer.pops.one/address/${bidder.address}/`,
              );
            }}
          >
            See Bidder History
          </Button>
          <Button size='small' onClick={() => setOpen(true)}>
            Accept Bid
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function AcceptedBidCard({ bidder, workContractAddress }) {
  const { address: contractAddress } = useParams();
  const [typeOfWork, setTypeOfWork] = useState("");
  const [contractStatus, setContractStatus] = useState(null);
  const [worker, setWorker] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const rootRef = React.useRef(null);

  // TODO: update on poll?
  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
    // const signer = new ethers.VoidSigner(
    //   window.ethereum.selectedAddress,
    //   provider,
    // );
    const contractObj = new ethers.Contract(
      workContractAddress,
      WorkContract.abi,
      provider,
    );
    const tow = await getTypeOfWork(contractObj);
    setTypeOfWork(tow);
    const status = await getStatus(contractObj);
    setContractStatus(status);
    const w = await getWorker(contractObj);
    setWorker(w);
  }, []);

  const localBid = ethers.utils.formatUnits(bidder.bid);

  return (
    <div ref={rootRef}>
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
          <h3>Hire {bidder.address} for this Job?</h3>
          <Button
            key={"accept"}
            onClick={async () => {
              console.log("delist Contract");
              const result = await delistContract(
                workContractAddress,
                bidder.address,
              );
              console.log("assign worker");
              const provider = new ethers.providers.Web3Provider(
                window.ethereum,
              );
              // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
              const signer = new ethers.VoidSigner(
                window.ethereum.selectedAddress,
                provider,
              );
              const contract = new ethers.Contract(
                workContractAddress,
                WorkContract.abi,
                signer,
              );
              const assignResult = await assignWorker(contract, bidder.address);
              // const acceptedBid = await getAcceptedBid(contract);
              setOpen(false);
            }}
          >
            Assign Worker
          </Button>
          <Button
            key={"close"}
            onClick={async () => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Card sx={{ background: "gray" }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {contractStatus}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {bidder.address}
          </Typography>
          <Typography sx={{ fontSize: 12 }} color='text.secondary' gutterBottom>
            {localBid}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            onClick={() => {
              window.open(
                `https://explorer.pops.one/address/${bidder.address}/`,
              );
            }}
          >
            See Bidder History
          </Button>
          {worker ? (
            <Button
              size='small'
              onClick={async () => {
                const provider = new ethers.providers.Web3Provider(
                  window.ethereum,
                );
                // https://docs.ethers.io/v5/api/signer/#VoidSigner - cannot sign
                // const signer = new ethers.VoidSigner(
                //   window.ethereum.selectedAddress,
                //   provider,
                // );
                const signer = provider.getSigner();
                const contractObj = new ethers.Contract(
                  workContractAddress,
                  WorkContract.abi,
                  signer,
                );
                const result = await workStarted(contractObj);
              }}
            >
              Work Started
            </Button>
          ) : (
            <Button size='small' onClick={() => setOpen(true)}>
              Assign Worker
            </Button>
          )}

          {/* TODO: tool tip / note that this will close the contract for bidding */}
        </CardActions>
      </Card>
    </div>
  );
}

export default function ContractBids() {
  const { address } = useParams();
  const [bids, setBids] = useState([]);
  const [acceptedBid, setAcceptedBid] = useState(null);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(async () => {
    const { bids: bs, acceptedBid } = await fetchBids(address);
    setBids(bs);
    setAcceptedBid(acceptedBid);
  }, []);

  useInterval(
    async () => {
      const { bids: bs, acceptedBid } = await fetchBids(address);
      setBids(bs);
      setAcceptedBid(acceptedBid);
    },
    // Delay in milliseconds or null to stop it
    5000,
  );

  return (
    <div>
      <h1>Contract Bids</h1>
      {acceptedBid ? (
        <>
          Accepted Bid
          <AcceptedBidCard bidder={acceptedBid} workContractAddress={address} />
          <hr></hr>
        </>
      ) : null}
      <></>
      Potential Bids
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Object.keys(bids).map((b, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <BidCard bidder={{ address: b, bid: bids[b] }} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
