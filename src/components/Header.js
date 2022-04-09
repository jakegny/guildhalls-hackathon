import React from "react";
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
import { connectMetaMask } from "../state/user/actions";
import MetaMaskLogo from "../assets/metamask.svg";

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
              <MenuItem
                key={"myOpenContracts"}
                onClick={() => {
                  navigate("/myOpenContracts");
                }}
              >
                <Typography textAlign='center'>My Open Contracts</Typography>
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
            <Button
              key={"myOpenContracts"}
              onClick={() => {
                navigate("/myOpenContracts");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              My Open Contracts
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
