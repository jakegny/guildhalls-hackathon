export function getStatementOfWork() {}

export function getStatus() {}

export function getRequestedDrawValue() {}

export function assignWorker() {}

export function bidWork() {}

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
  console.log("contract.methods", await contract.bids());
  // return contract.methods.bids.call();
  return null;
}
