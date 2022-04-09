import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Identity from "../abis/Identity.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Header from "./Header";
import Home from "./Home";
import "./App.css";
import CreateIdentity from "./CreateIdentity";
import HireAPro from "./HireAPro";
import MyOpenContracts from "./MyOpenContracts";
class App extends Component {
  constructor(props) {
    super(props);
    // TODO: move this to Redux
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      identities: [],
    };
    this.theme = createTheme({
      palette: {
        mode: "dark",
      },
    });
  }

  // with minting we are sending information and we need to specify the account

  // // TODO: Make this functional
  // mint = (addressId, idType, orgType) => {
  //   this.state.contract.methods
  //     .mint(addressId, idType, orgType)
  //     .send({ from: this.state.account })
  //     .once("receipt", receipt => {
  //       this.setState({
  //         identities: [...this.state.identities, Identity],
  //       });
  //     });
  // };

  render() {
    // console.log(this.state?.contract?.methods.balanceOf());
    return (
      <ThemeProvider theme={this.theme}>
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
              <Route
                path='/issueIdentity'
                element={<CreateIdentity mint={this.mint} />}
              />
              <Route path='/hireAPro' element={<HireAPro />} />
              <Route path='/myOpenContracts' element={<MyOpenContracts />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    );

    // return (
    //   <div className='container-filled'>
    //     {console.log(this.state.identities)}
    //     <nav
    //       className='navbar navbar-dark fixed-top
    //             bg-dark flex-md-nowrap p-0 shadow'
    //     >
    //       <div
    //         className='navbar-brand col-sm-3 col-md-3
    //             mr-0'
    //         style={{ color: "white" }}
    //       >
    //         The GuildHall
    //       </div>
    //       <ul className='navbar-nav px-3'>
    //         <li
    //           className='nav-item text-nowrap
    //             d-none d-sm-none d-sm-block
    //             '
    //         >
    //           <small className='text-white'>{this.state.account}</small>
    //         </li>
    //       </ul>
    //       <button
    //         onClick={async () => {
    //           // window.ethereum.request({ method: "eth_requestAccounts" });
    //           const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //           });
    //           const account = accounts[0];
    //           this.setState({ account });
    //         }}
    //       >
    //         Connect
    //       </button>
    //     </nav>

    //     <div className='container-fluid mt-1'>
    //       <CreateIdentity mint={this.mint} />
    //       <hr></hr>
    //       <div className='row textCenter'>
    //         {this.state.identities.map((identity, key) => {
    //           return (
    //             <div>
    //               <div>
    //                 <MDBCard
    //                   className='token img'
    //                   style={{ maxWidth: "22rem" }}
    //                 >
    //                   <MDBCardImage
    //                     src={identity}
    //                     position='top'
    //                     height='250rem'
    //                     style={{ marginRight: "4px" }}
    //                   />
    //                   <MDBCardBody>
    //                     <MDBCardTitle> Identities </MDBCardTitle>
    //                     <MDBCardText> TODO</MDBCardText>
    //                     <MDBBtn href={identity}>Download</MDBBtn>
    //                   </MDBCardBody>
    //                 </MDBCard>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default App;
