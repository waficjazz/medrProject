import React, { useContext } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Toolbar, InputBase, IconButton, Badge, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { ShowContext, RegContext } from "../../context";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { show, setShow } = useContext(ShowContext);
  const auth = useContext(RegContext);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <AppBar className="appbar" position="absolute">
          <Toolbar>
            <IconButton className="menuButton" onClick={() => setShow(!show)}>
              <MenuIcon />
            </IconButton>
            <Typography className="id">
              ID:<span>19238372</span>
            </Typography>
            <div className="tools">
              <div className="search">
                <SearchIcon fontSize="small" className="searchIcon" sx={{ marginLeft: "10px" }} />
                <InputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} sx={{ marginLeft: "10px", width: "80%" }} />
              </div>
              <div className="toolsicon">
                <IconButton>
                  <Badge className="badge" badgeContent={1} color="error" overlap="circular" />
                  <NotificationsIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    auth.logout();
                    navigate("/s");
                  }}>
                  <PersonIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </StyledEngineProvider>
    </>
  );
};

export default Navbar;
