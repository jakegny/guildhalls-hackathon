export async function getContractsForClient(contractMethods, userAddress) {
  const data = await contractMethods.getContractsForClient(userAddress).call();
  return data;
}

// TODO: enum for Type of Work, get the from the chain

export async function newContract(
  contractMethods,
  userAddress,
  typeOfWork = 0,
) {
  // TODO: promisify this
  const data = await contractMethods
    .newContract(typeOfWork)
    .send({ from: userAddress })
    .on("transactionHash", function (hash) {
      // ...
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      // ...
    })
    .on("receipt", function (receipt) {
      // receipt example
      // console.log(receipt);
    })
    .on("error", function (error, receipt) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log("contract create error", error);
    });

  return data.events.ContractCreated.returnValues.wallet;
}

export async function getOpenContracts(contractMethods) {
  return contractMethods.getOpenContracts().call();
}

export async function assignWorker(contractMethods) {}
