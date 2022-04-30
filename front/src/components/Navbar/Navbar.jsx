import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Toolbar, InputBase } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

const Navbar = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <AppBar className="appbar" position="absolute">
          <Toolbar>
            <div className="search">
              <SearchIcon fontSize="small" className="searchIcon" sx={{ marginLeft: "10px" }} />
              <InputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} sx={{ marginLeft: "10px", width: "80%" }} />
            </div>
          </Toolbar>
        </AppBar>
      </StyledEngineProvider>
    </>
  );
};

export default Navbar;
