import React from "react";
import { useSelector } from "react-redux";

export default function CreateIdentity() {
  const contractMethods = useSelector(state => state?.contract?.methods);
  const userAddress = useSelector(state => state?.user?.userAddress);
  // mint = (addressId, idType, orgType) => {
  //   this.state.contract.methods
  //     .mint(addressId, idType, orgType)
  //     .send({ from: this.state.account })
  // .once("receipt", receipt => {
  //   this.setState({
  //     identities: [...this.state.identities, Identity],
  //   });
  // });
  // };

  if (userAddress) {
    // console.log(
    //   contractMethods
    //     .balanceOf(userAddress)
    //     .send({ from: userAddress })
    //     .once("receipt", receipt => {
    //       console.log("receipt", receipt);
    //     }),
    // );
  }

  console.log("???!");
  return <div className='row'>HOME</div>;
}

// Invalid transaction params: params specify an EIP-1559 transaction but the current network does not support EIP-1559"
