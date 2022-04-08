import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Identity from "../abis/Identity.json";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./App.css";
import CreateIdentity from "./CreateIdentity";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // first up is to detect ethereum provider
  async loadWeb3() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }

    const provider = await detectEthereumProvider();
    console.log("provider", provider);

    // modern browsers
    // if there is a provider then lets
    // lets log that it's working and access the window from the doc
    // to set Web3 to the provider

    if (provider) {
      console.log("ethereum wallet is connected");
      window.web3 = new Web3(provider);
    } else {
      // no ethereum provider
      console.log("no ethereum wallet detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // create a constant js variable networkId which
    //is set to blockchain network id
    const networkId = await web3.eth.net.getId();
    const networkData = Identity.networks[networkId];
    if (networkData) {
      const abi = Identity.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });

      // grab the total supply on the front end and log the results
      // go to web3 doc and read up on methods and call
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });
      // set up an array to keep track of tokens
      // load identity
      for (let i = 1; i <= totalSupply; i++) {
        const localId = await contract.methods.identities(i - 1).call();
        // how should we handle the state on the front end?
        this.setState({
          identities: [...this.state.identities, localId],
        });
      }
    } else {
      window.alert("Smart contract not deployed");
    }
  }

  // with minting we are sending information and we need to specify the account

  mint = (addressId, idType, orgType) => {
    this.state.contract.methods
      .mint(addressId, idType, orgType)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({
          identities: [...this.state.identities, Identity],
        });
      });
  };

  constructor(props) {
    super(props);
    // TODO: move this to Redux
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      identities: [],
    };
  }

  render() {
    console.log("this.state", this.state);

    return (
      <div className='container-filled'>
        {console.log(this.state.identities)}
        <nav
          className='navbar navbar-dark fixed-top 
                bg-dark flex-md-nowrap p-0 shadow'
        >
          <div
            className='navbar-brand col-sm-3 col-md-3 
                mr-0'
            style={{ color: "white" }}
          >
            The GuildHall
          </div>
          <ul className='navbar-nav px-3'>
            <li
              className='nav-item text-nowrap
                d-none d-sm-none d-sm-block
                '
            >
              <small className='text-white'>{this.state.account}</small>
            </li>
          </ul>
          <button
            onClick={async () => {
              // window.ethereum.request({ method: "eth_requestAccounts" });
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              const account = accounts[0];
              this.setState({ account });
            }}
          >
            Connect
          </button>
        </nav>

        <div className='container-fluid mt-1'>
          <CreateIdentity mint={this.mint} />
          <hr></hr>
          <div className='row textCenter'>
            {this.state.identities.map((identity, key) => {
              return (
                <div>
                  <div>
                    <MDBCard
                      className='token img'
                      style={{ maxWidth: "22rem" }}
                    >
                      <MDBCardImage
                        src={identity}
                        position='top'
                        height='250rem'
                        style={{ marginRight: "4px" }}
                      />
                      <MDBCardBody>
                        <MDBCardTitle> Identities </MDBCardTitle>
                        <MDBCardText> TODO</MDBCardText>
                        <MDBBtn href={identity}>Download</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
