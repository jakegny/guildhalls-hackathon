import Web3 from "web3";
import { ethers } from "ethers";
import WorkContractFactory from "../abis/WorkContractFactory.json";
import WorkContract from "../abis/WorkContract.json";

export async function getContractsForClient(userAddress) {
  const contract = await getContract();
  const data = contract.getContractsForClient(userAddress);
  // const data = await contract.methods.getContractsForClient(userAddress).call();
  return data;
}

// TODO: enum for Type of Work, get the from the chain

export async function newContract(typeOfWork = 0) {
  // TODO: promisify this
  const contract = await getContract();
  // const data = await contract.newContract(typeOfWork);
  const unsignedTx = await contract.populateTransaction["newContract"](
    typeOfWork,
  );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const data = await signer.sendTransaction(unsignedTx);

  // console.log("data", data);

  // const data = {
  //   hash: "0x65848373e803a0afacdffb71d3bf5b27f02ba61b33b8d447dd85fc7e49cc4127",
  // };
  // data.hash
  // 0x65848373e803a0afacdffb71d3bf5b27f02ba61b33b8d447dd85fc7e49cc4127

  // const iface = new ethers.utils.Interface(WorkContract.abi);
  // const thing = iface.decodeFunctionData(
  //   "newContract",
  //   "0x81c5dc310000000000000000000000000000000000000000000000000000000000000000",
  // );

  const thing = ethers.utils.defaultAbiCoder.decode(["address"], data.hash);
  console.log("thing", thing);
  // // const thing = ethers.utils.defaultAbiCoder.decode(
  // //   ["address"],
  // //   ethers.utils.hexDataSlice(data.data, 4),
  // // );
  // console.log("thing", thing);

  return data;
}

export async function getOpenContracts() {
  const contract = await getContract();
  return contract.getOpenContracts();
  // return contract.methods.getOpenContracts().call();
}

// TODO:
// export async function assignWorker() {}

let CONTRACT = null;

async function getContract() {
  if (!CONTRACT) {
    // // const web3 = await window.web3;
    // const web3 = new Web3(window.ethereum);

    // const networkId = await web3.eth.net.getId();

    // const networkData = WorkContractFactory.networks[networkId];
    // if (networkData) {
    //   const workContractFactoryABI = WorkContractFactory.abi;
    //   const workContractFactoryAddress = networkData.address; // TODO: ???
    //   CONTRACT = await new web3.eth.Contract(
    //     workContractFactoryABI,
    //     workContractFactoryAddress,
    //   );
    // } else {
    //   window.alert("Smart contract not deployed");
    //   return null;
    // }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const networkData =
      WorkContractFactory.networks[provider.provider.networkVersion];
    CONTRACT = new ethers.Contract(
      networkData.address,
      WorkContractFactory.abi,
      provider,
    );
  }
  console.log("CONTRACT", CONTRACT);
  return CONTRACT;
}
