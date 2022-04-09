import { ethers } from "ethers";
import WorkContractFactory from "../abis/WorkContractFactory.json";
import WorkContract from "../abis/WorkContract.json";

export async function makeInteractableContract(address, makeSigner = false) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, WorkContract.abi, provider);
  return contract;
}

export function getStatementOfWork() {}

export function getStatus() {}

export function getRequestedDrawValue() {}

export function assignWorker() {}

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

export function acceptBid() {}

export function workStarted() {}

export function changeWorkStatus() {}

export function contractComplete() {}

export function disputeContract() {}

export function releaseDispute() {}

export function requestDraw() {}

export function approveDraw() {}

export function withdrawFunds() {}

export function changeRequest() {}

// https://stackoverflow.com/questions/37606839/how-to-return-mapping-list-in-solidity-ethereum-contract
export async function getBids(contract) {
  const biddingAddress = await contract.getBiddingAddress();
  console.log("biddingAddress", biddingAddress);

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
