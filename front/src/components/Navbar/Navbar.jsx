import React, { useContext, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Toolbar, InputBase, IconButton, Badge, Typography, Collapse } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { ShowContext, RegContext } from "../../context";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
                  // onClick={() => {
                  //   auth.logout();
                  //   navigate("/s");
                  // }}
                  onClick={() => setOpen(!open)}>
                  <PersonIcon />
                </IconButton>
                <Collapse in={open}>
                  <div className="userAction">
                    <IconButton sx={{ fontSize: "15px" }}>
                      <LogoutIcon />
                      Logout
                    </IconButton>
                    <IconButton>
                      <ReplayIcon />
                      Switch Patient
                    </IconButton>
                  </div>
                </Collapse>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </StyledEngineProvider>
    </>
  );
};

export default Navbar;
