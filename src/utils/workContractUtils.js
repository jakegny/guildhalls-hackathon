import { ethers } from "ethers";
import WorkContractFactory from "../abis/WorkContractFactory.json";
import WorkContract from "../abis/WorkContract.json";

export async function makeInteractableContract(address, makeSigner = false) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, WorkContract.abi, provider);
  return contract;
}

export async function getStatementOfWork() {}

export async function getStatus(contract) {
  const mapping = [
    "BIDDING",
    "PENDING",
    "IN_PROGRESS",
    "HALTED",
    "DISPUTED",
    "COMPLETE",
    "INCOMPLETE",
    "CHANGE_REQUEST",
  ];

  // TODO: contract conversion?
  const status = await contract.getStatus();
  console.log("status--", status);
  return mapping[status];
}

export async function getRequestedDrawValue() {}

export async function assignWorker(contract, workerAddress) {
  const unsignedTx = await contract.populateTransaction["assignWorker"](
    workerAddress,
  );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const data = await signer.sendTransaction(unsignedTx);
  return data;
}

// https://stackoverflow.com/questions/68198724/how-would-i-send-an-eth-value-to-specific-smart-contract-function-that-is-payabl
export async function bidWork(contract, bid) {
  // TODO: convert value correctly
  const unsignedTx = await contract.populateTransaction["bidWork"](
    ethers.utils.parseUnits(bid),
  );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const data = await signer.sendTransaction(unsignedTx);
  return data;
}

export async function acceptBid(contract, bidderAddress) {
  const unsignedTx = await contract.populateTransaction["acceptBid"](
    bidderAddress,
  );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const data = await signer.sendTransaction(unsignedTx);
  return data;
}

export async function workStarted(contract) {
  // const bid =
  const acceptedBid = await getAcceptedBid(contract);
  const unsignedTx = await contract.populateTransaction["workStarted"]({
    value: acceptedBid.bid,
  });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const data = await signer.sendTransaction(unsignedTx);
  return data;
}

export async function changeWorkStatus() {}

export async function contractComplete() {}

export async function disputeContract() {}

export async function releaseDispute() {}

export async function requestDraw() {}

export async function approveDraw() {}

export async function withdrawFunds() {}

export async function changeRequest() {}

export async function getWorker(contract) {
  const worker = await contract.getWorker();
  if (worker === "0x0000000000000000000000000000000000000000") return null;
  return worker;
}

// https://stackoverflow.com/questions/37606839/how-to-return-mapping-list-in-solidity-ethereum-contract
export async function getBids(contract) {
  const biddingAddress = await contract.getBiddingAddress();

  let result = {};
  for (let ba of biddingAddress) {
    const bid = await contract.getBidByAddress(ba);
    result[ba] = bid;
  }
  // return contract.methods.bids.call();
  return result;
}

export async function getTypeOfWork(contract) {
  // contract;
  const towInt = await contract.typeOfWork();
  const tow = await contract.getTypeOfWorkStr(towInt);
  console.log(tow);
  return tow;
}

export async function getNumberOfBids(contract) {
  const numOfBids = await contract.getBiddingAddress();
  return numOfBids.length;
}

export async function getAcceptedBid(contract) {
  const acceptedBidder = await contract.getAcceptedBidder();
  // TODO: fix this in the contract
  if (acceptedBidder === "0x0000000000000000000000000000000000000000")
    return null;
  const bid = await contract.getBidByAddress(acceptedBidder);
  // return contract.methods.bids.call();
  return {
    address: acceptedBidder,
    bid,
  };
}
