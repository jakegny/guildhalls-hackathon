import { ethers } from "ethers";
import WorkContractFactory from "../abis/WorkContractFactory.json";
import WorkContract from "../abis/WorkContract.json";

export async function getContractsForClient(userAddress) {
  const contract = await getContract();
  return contract.getContractsForClient(userAddress);
}

export async function newContract(typeOfWork = 0) {
  const contract = await getContract();
  const unsignedTx = await contract.populateTransaction["newContract"](
    typeOfWork,
  );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const data = await signer.sendTransaction(unsignedTx);

  // TODO: How to get contract address?

  return data;
}

export async function getOpenContracts() {
  const contract = await getContract();
  return contract.getOpenContracts();
}

// TODO:
// export async function assignWorker() {}

let CONTRACT = null;

async function getContract() {
  if (!CONTRACT) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const networkData =
      WorkContractFactory.networks[provider.provider.networkVersion];
    CONTRACT = new ethers.Contract(
      networkData.address,
      WorkContractFactory.abi,
      provider,
    );
  }
  return CONTRACT;
}
