import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { connectMetaMask, setMetaMaskConnected } from "../state/user/actions";
import {
  setWorkContractData,
  setWorkContractFactoryData,
} from "../state/contract/actions";
import MetaMaskLogo from "../assets/metamask.svg";
import Identity from "../abis/Identity.json";
import WorkContract from "../abis/WorkContract.json";
import WorkContractFactory from "../abis/WorkContractFactory.json";

const LOGO = "GuildHall";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMetaMaskConnected = useSelector(
    state => state?.user?.isMetaMaskConnected,
  );

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  }, []);

  // first up is to detect ethereum provider
  async function loadWeb3() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }

    const provider = await detectEthereumProvider();

    // modern browsers
    // if there is a provider then lets
    // lets log that it's working and access the window from the doc
    // to set Web3 to the provider

    if (provider) {
      dispatch(setMetaMaskConnected(provider.selectedAddress));
      window.web3 = new Web3(provider);
    } else {
      // no ethereum provider
      console.log("no ethereum wallet detected");
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    // const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] });

    // create a constant js variable networkId which
    //is set to blockchain network id
    const networkId = await web3.eth.net.getId();
    // const networkData = Identity.networks[networkId];
    const networkData = WorkContractFactory.networks[networkId];
    if (networkData) {
      // const abi = Identity.abi;
      // const address = networkData.address;
      // const contract = new web3.eth.Contract(abi, address);

      const workContractFactoryABI = WorkContractFactory.abi;
      const workContractFactoryAddress = networkData.address; // TODO: ???
      const workContractFactoryContract = new web3.eth.Contract(
        workContractFactoryABI,
        workContractFactoryAddress,
      );
      dispatch(setWorkContractFactoryData(workContractFactoryContract));

      // const abi = Identity.abi;
      // const address = networkData.address;
      // const contract = new web3.eth.Contract(abi, address);

      // TODO: move this to redux?

      // this.setState({ contract });

      // // grab the total supply on the front end and log the results
      // // go to web3 doc and read up on methods and call
      // const totalSupply = await contract.methods.totalSupply().call();
      // this.setState({ totalSupply });
      // // set up an array to keep track of tokens
      // // load identity
      // for (let i = 1; i <= totalSupply; i++) {
      //   const localId = await contract.methods.identities(i - 1).call();
      //   // how should we handle the state on the front end?
      //   this.setState({
      //     identities: [...this.state.identities, localId],
      //   });
      // }
    } else {
      window.alert("Smart contract not deployed");
    }
  }

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl' sx={{ height: "7vh" }}>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            {LOGO}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key={"issueIdentity"}
                onClick={() => {
                  navigate("/issueIdentity");
                }}
              >
                <Typography textAlign='center'>Create Identity</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            {LOGO}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              p: 0,
            }}
          >
            <Button
              key={"issueIdentity"}
              onClick={() => {
                navigate("/issueIdentity");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Identity
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={isMetaMaskConnected ? "Connected" : "Connect MetaMask"}
            >
              <IconButton onClick={() => dispatch(connectMetaMask(navigate))}>
                <img
                  src={MetaMaskLogo}
                  // className='App-logo'
                  alt='logo'
                  style={{
                    padding: 0,
                    paddingRight: isMetaMaskConnected ? 0 : 10,
                    width: 30,
                    height: 30,
                    margin: 0,
                  }}
                />
                {isMetaMaskConnected ? "" : "Connect"}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key={"profile"}
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                key={"logout"}
                onClick={() => {
                  // dispatch(logout()); // TODO
                  navigate("/login");
                }}
              >
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
