import React from "react";
import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { StyledEngineProvider } from "@mui/material/styles";
import "./SideBar.css";
const SideBar = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="drawer">
        <List>
          <ListItemButton divider>
            <ListItemIcon>
              <PersonIcon sx={{ color: "var(--second-blue)" }} />
            </ListItemIcon>
            Personal Info
          </ListItemButton>
          <ListItemButton divider>
            <ListItemIcon>
              <VaccinesIcon sx={{ color: "var(--second-blue)" }} />
            </ListItemIcon>
            Vaccines
          </ListItemButton>
        </List>
      </div>
    </StyledEngineProvider>
  );
};

export default SideBar;
