import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Header from "./Header";
import Home from "./Home";
import "./App.css";
import { setMetaMaskConnected } from "../state/user/actions";
import { ethers } from "ethers";
import CreateIdentity from "./CreateIdentity";
import HireAPro from "./HireAPro";
import MyOpenContracts from "./MyOpenContracts";
import ViewOpenContracts from "./ViewOpenContracts";
import ContractBids from "./ContractBids";
import JobDetails from "./JobDetails";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const dispatch = useDispatch();

  useEffect(async () => {
    await loadWeb3();
    // await loadBlockchainData();
  }, []);

  // const workContractFactoryMethods = useSelector(
  //   state => state?.contract?.workContractFactory?.methods,
  // );

  // first up is to detect ethereum provider
  async function loadWeb3() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }

    // const provider = await detectEthereumProvider();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // console.log("provider", provider, Object.keys(provider));
    dispatch(setMetaMaskConnected(provider.selectedAddress));
    window.web3 = new Web3(Web3.givenProvider);
  }

  if (!window.ethereum) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // open={isOpen}
        // onClose={() => setIsOpen(false)}
        // message={message}
        autoHideDuration={5000}
        // onClick={() => setIsOpen(false)}
      />
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/issueIdentity' element={<CreateIdentity />} />
            <Route path='/hireAPro' element={<HireAPro />} />
            <Route path='/myOpenContracts' element={<MyOpenContracts />} />
            {/* <Route path='/contractBids' element={<ContractBids />} /> */}
            <Route path='/contractBids' element={<ContractBids />}>
              <Route path='/contractBids/:address' element={<ContractBids />} />
            </Route>
            <Route path='/bidAContract' element={<ViewOpenContracts />} />
            <Route path='/jobDetails' element={<JobDetails />}>
              <Route path='/jobDetails/:address' element={<JobDetails />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
