import React from "react";
import { Drawer } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import "./SideBar.css";
const SideBar = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Drawer anchor="right" open="true" variant="persistent" className="drawer"></Drawer>
    </StyledEngineProvider>
  );
};

export default SideBar;
