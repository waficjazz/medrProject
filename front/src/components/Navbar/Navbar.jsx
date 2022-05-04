import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Toolbar, InputBase, IconButton, Badge } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <AppBar className="appbar" position="absolute">
          <Toolbar>
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
                <IconButton>
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
