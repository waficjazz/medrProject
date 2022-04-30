import React from "react";
import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BadgeIcon from "@mui/icons-material/Badge";
import { StyledEngineProvider } from "@mui/material/styles";
import "./SideBar.css";
const SideBar = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="drawer">
        <List>
          <ListItemButton>
            <ListItemIcon>
              <BadgeIcon className="icon" />
            </ListItemIcon>
            Personal Info
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <VaccinesIcon className="icon" />
            </ListItemIcon>
            Vaccines
          </ListItemButton>
        </List>
      </div>
    </StyledEngineProvider>
  );
};

export default SideBar;
